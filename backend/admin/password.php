<?php
require_once __DIR__ . '/partials.php';
require_login();

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'POST') {
    if (!hash_equals($_SESSION['csrf'] ?? '', $_POST['csrf'] ?? '')) fail('Bad form token. Try again.');
    $cur = $_POST['current'] ?? '';
    $new = $_POST['new'] ?? '';
    $again = $_POST['again'] ?? '';
    $st = db()->prepare("SELECT * FROM admin_users WHERE id = ? LIMIT 1");
    $st->execute([$_SESSION['admin_id']]);
    $user = $st->fetch();
    if (!$user || !password_verify($cur, $user['password_hash'])) {
        fail('Current password is wrong.');
    } elseif (strlen($new) < 10) {
        fail('New password must be at least 10 characters.');
    } elseif ($new !== $again) {
        fail('New passwords do not match.');
    } else {
        db()->prepare("UPDATE admin_users SET password_hash = ? WHERE id = ?")
            ->execute([password_hash($new, PASSWORD_DEFAULT), $user['id']]);
        done('Password changed.', 'dashboard.php');
    }
}

admin_head('Change password');
admin_flash();
?>
<div class="card" style="max-width:520px">
  <h1>Change password</h1>
  <p class="sub">The access key itself can only be changed in the server config file + redeploy.</p>
  <form method="post">
    <input type="hidden" name="csrf" value="<?= esc(csrf_token()) ?>">
    <label>Current password</label>
    <input type="password" name="current" required autocomplete="current-password">
    <label>New password (min 10 characters)</label>
    <input type="password" name="new" required autocomplete="new-password">
    <label>Repeat new password</label>
    <input type="password" name="again" required autocomplete="new-password">
    <div class="row"><button class="btn" type="submit">Save</button></div>
  </form>
</div>
<?php admin_foot(); ?>
