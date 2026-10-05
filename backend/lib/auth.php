<?php
// Session auth for /admin. Every login requires THREE things:
//   1. ADMIN_ACCESS_KEY (deploy-time secret from config.php — checked first)
//   2. username,  3. password (password_hash in admin_users)
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/db.php';

function session_start_secure(): void {
    if (session_status() === PHP_SESSION_ACTIVE) return;
    session_name(SESSION_NAME);
    $https = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off');
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'httponly' => true,
        'samesite' => 'Lax',
        'secure' => $https,
    ]);
    session_start();
}

// Returns [ok(bool), error(string)]. Key is verified BEFORE touching the DB
// so wrong-key attempts never reveal whether a username exists.
function attempt_login(string $username, string $password, string $key): array {
    session_start_secure();
    if (!hash_equals(ADMIN_ACCESS_KEY, $key)) {
        sleep(1); // slow down guessing uniformly
        return [false, 'Invalid credentials.'];
    }
    try {
        $st = db()->prepare("SELECT * FROM admin_users WHERE username = ? LIMIT 1");
        $st->execute([trim($username)]);
        $user = $st->fetch();
    } catch (Throwable $e) {
        return [false, 'Server error.'];
    }
    if (!$user || !password_verify($password, $user['password_hash'])) {
        sleep(1);
        return [false, 'Invalid credentials.'];
    }
    if (password_needs_rehash($user['password_hash'], PASSWORD_DEFAULT)) {
        try {
            db()->prepare("UPDATE admin_users SET password_hash = ? WHERE id = ?")
                ->execute([password_hash($password, PASSWORD_DEFAULT), $user['id']]);
        } catch (Throwable $e) { /* non-fatal */
        }
    }
    session_regenerate_id(true);
    $_SESSION['admin_id'] = (int) $user['id'];
    $_SESSION['admin_user'] = $user['username'];
    $_SESSION['last_activity'] = time();
    if (empty($_SESSION['csrf'])) {
        $_SESSION['csrf'] = bin2hex(random_bytes(32));
    }
    return [true, ''];
}

function is_logged_in(): bool {
    session_start_secure();
    if (empty($_SESSION['admin_id'])) return false;
    if (time() - ($_SESSION['last_activity'] ?? 0) > SESSION_IDLE_TIMEOUT) {
        logout();
        return false;
    }
    $_SESSION['last_activity'] = time();
    return true;
}

function logout(): void {
    session_start_secure();
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $p = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, $p['path'], '', $p['secure'] ?? false, $p['httponly'] ?? true);
    }
    session_destroy();
}

// Page guard for /admin/*.php — redirects browsers to the login page.
function require_login(): void {
    if (!is_logged_in()) {
        $next = urlencode($_SERVER['REQUEST_URI'] ?? '/admin/dashboard.php');
        header('Location: ' . APP_URL . '/admin/?next=' . $next);
        exit;
    }
}

// API guard for api/admin.php — JSON 401 instead of a redirect.
function require_login_api(): void {
    if (!is_logged_in()) {
        json_out(['error' => 'Unauthorized'], 401);
    }
}

function csrf_token(): string {
    session_start_secure();
    if (empty($_SESSION['csrf'])) {
        $_SESSION['csrf'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf'];
}

// All mutating admin calls must carry the token (POST field or header).
function csrf_check(): void {
    session_start_secure();
    $sent = $_POST['csrf'] ?? ($_SERVER['HTTP_X_CSRF_TOKEN'] ?? '');
    if (!hash_equals($_SESSION['csrf'] ?? '', (string) $sent)) {
        json_out(['error' => 'Bad CSRF token'], 403);
    }
}
