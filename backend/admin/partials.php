<?php
// Shared admin shell: head + topbar + flash messages + footer.
require_once __DIR__ . '/../lib/auth.php';
require_once __DIR__ . '/../lib/helpers.php';

function admin_nav(): array {
    return [
        'dashboard.php' => 'Dashboard',
        'services.php' => 'Services',
        'articles.php' => 'Articles',
        'cases.php' => 'Cases',
        'about.php' => 'About',
        'settings.php' => 'Settings',
        'leads.php' => 'Leads',
    ];
}

function admin_head(string $title, string $active = ''): void {
    $user = $_SESSION['admin_user'] ?? '';
    ?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <title><?= esc($title) ?> · Udyam Admin</title>
  <link rel="stylesheet" href="assets/admin.css">
</head>
<body>
  <header class="topbar">
    <a class="brand" href="dashboard.php">Udyam <span>Admin</span></a>
    <nav>
      <?php foreach (admin_nav() as $href => $label): ?>
        <a href="<?= esc($href) ?>" class="<?= $active === $href ? 'active' : '' ?>"><?= esc($label) ?></a>
      <?php endforeach; ?>
    </nav>
    <span class="who">
      <?= esc($user) ?>
      <a href="password.php">Password</a>
      <a href="logout.php">Logout</a>
    </span>
  </header>
  <div class="wrap">
    <?php
}

function admin_flash(): void {
    if (!empty($_SESSION['flash_ok'])) {
        echo '<div class="flash ok">' . esc($_SESSION['flash_ok']) . '</div>';
        unset($_SESSION['flash_ok']);
    }
    if (!empty($_SESSION['flash_err'])) {
        echo '<div class="flash err">' . esc($_SESSION['flash_err']) . '</div>';
        unset($_SESSION['flash_err']);
    }
}

function admin_foot(): void {
    ?>
  </div>
</body>
</html>
    <?php
}

// POST-redirect helper carrying a one-time message.
function done(string $msg, string $to): void {
    $_SESSION['flash_ok'] = $msg;
    redirect('/admin/' . ltrim($to, '/'));
}

function fail(string $msg): void {
    $_SESSION['flash_err'] = $msg;
}

// Tiny fetch wrapper (same origin → session cookie + CSRF travel automatically).
function admin_api_js(): void {
    ?>
<script>
window.api = async (resource, action, data = {}, opts = {}) => {
  const q = new URLSearchParams({ resource, action, ...(opts.query || {}) });
  const mutating = ["create", "update", "delete"].includes(action);
  const res = await fetch(`../api/admin.php?${q}`, {
    method: mutating ? "POST" : "GET",
    headers: { "Content-Type": "application/json", "X-CSRF-Token": document.querySelector('input[name="csrf"]')?.value || "" },
    body: mutating ? JSON.stringify(data) : undefined,
  });
  const json = await res.json().catch(() => ({ error: "Bad response" }));
  if (json.error) throw new Error(json.error);
  return json;
};
// Image field helper: <input type=file data-upload-for="fieldId"> uploads and fills the text field.
document.addEventListener("change", async (e) => {
  const input = e.target.closest("[data-upload-for]");
  if (!input || !input.files.length) return;
  const fd = new FormData();
  fd.append("image", input.files[0]);
  fd.append("csrf", document.querySelector('input[name="csrf"]')?.value || "");
  const res = await fetch("../api/admin.php?resource=upload&action=create", { method: "POST", body: fd });
  const json = await res.json().catch(() => ({}));
  if (json.url) document.getElementById(input.dataset.uploadFor).value = json.url;
  else alert(json.error || "Upload failed");
});
</script>
    <?php
}
