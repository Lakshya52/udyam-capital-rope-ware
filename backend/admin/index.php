<?php
// Admin login: /admin/  — username + password + deploy-time access key.
require_once __DIR__ . '/partials.php';

session_start_secure();
if (is_logged_in()) redirect('/admin/dashboard.php');

$error = '';
if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'POST') {
    [$ok, $error] = attempt_login(
        $_POST['username'] ?? '',
        $_POST['password'] ?? '',
        $_POST['access_key'] ?? ''
    );
    if ($ok) {
        $next = $_GET['next'] ?? '/admin/dashboard.php';
        if (!str_starts_with($next, '/admin/')) $next = '/admin/dashboard.php';
        redirect($next);
    }
}
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <title>Login · Udyam Admin</title>
  <link rel="stylesheet" href="assets/admin.css">
</head>
<body>
  <div class="login-wrap">
    <div class="card login-card">
      <h1>Udyam <span style="color:var(--primary)">Admin</span></h1>
      <p class="sub">Manage site content. All three fields are required.</p>
      <?php if ($error): ?><div class="flash err"><?= esc($error) ?></div><?php endif; ?>
      <form method="post" autocomplete="off">
        <label for="f-user">Username</label>
        <input id="f-user" type="text" name="username" required autocomplete="username">
        <label for="f-pass">Password</label>
        <input id="f-pass" type="password" name="password" required autocomplete="current-password">
        <label for="f-key">Access key</label>
        <input id="f-key" type="password" name="access_key" required autocomplete="off" placeholder="From the server config file">
        <div class="row">
          <button class="btn" type="submit">Log in</button>
        </div>
      </form>
      <!-- <div class="key-note">
        The access key lives only in <span class="mono">backend/config/config.php</span> on the
        server — it can only be changed by editing that file and redeploying.
      </div> -->
    </div>
  </div>
</body>
</html>
