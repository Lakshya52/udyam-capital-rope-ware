<?php
// Database connection (PDO). One place to change credentials when you move
// from XAMPP (below) to Hostinger (hPanel → Databases → details).
// XAMPP defaults: host=localhost, user=root, password="", db=udyam

define('DB_HOST', 'localhost');
define('DB_NAME', 'udyam');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_CHARSET', 'utf8mb4');

function db(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=' . DB_CHARSET;
        $pdo = new PDO($dsn, DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
    }
    return $pdo;
}

function cors_headers(): void {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    $allowed = defined('ALLOWED_ORIGINS') ? ALLOWED_ORIGINS : [];
    if ($origin !== '' && in_array($origin, $allowed, true)) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Vary: Origin');
    }
}

function json_out($data, int $code = 200): void {
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    cors_headers();
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

// Bumps the content revision so visitors' caches invalidate after edits.
function bump_revision(): void {
    try {
        db()->prepare(
            "INSERT INTO site_settings (`key_name`, `value`) VALUES ('content_revision', '1') " .
            "ON DUPLICATE KEY UPDATE `value` = CAST(`value` AS UNSIGNED) + 1"
        )->execute();
    } catch (Throwable $e) { /* non-fatal */
    }
}
