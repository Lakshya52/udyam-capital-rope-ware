<?php
// Site-wide contact details — one edit here updates the contact page,
// footer and navbar together (via the frontend fetch layer).
require_once __DIR__ . '/partials.php';
require_login();

$fields = [
    'landline_label' => 'Landline text (e.g. Landline : 0120 444 5816)',
    'landline_href' => 'Landline link (e.g. tel:01204445816)',
    'mobile_label' => 'Mobile text (e.g. Mobile : +91 82875 98661)',
    'mobile_href' => 'Mobile link (e.g. tel:+918287598661)',
    'navbar_phone_href' => 'Navbar phone icon link',
    'email1' => 'Primary email (also receives form enquiries)',
    'email2' => 'Secondary email',
    'address' => 'Office address',
    'map_query' => 'Map search text',
    'map_embed' => 'Google Maps embed URL (iframe src)',
];

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'POST') {
    if (!hash_equals($_SESSION['csrf'] ?? '', $_POST['csrf'] ?? '')) fail('Bad form token.');
    $st = db()->prepare("INSERT INTO site_settings (`key_name`, `value`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `value` = VALUES(`value`)");
    foreach ($fields as $k => $label) {
        $st->execute([$k, trim($_POST[$k] ?? '')]);
    }
    done('Settings saved. The site picks them up immediately.', 'settings.php');
}

$rows = db()->query("SELECT `key_name`, `value` FROM site_settings")->fetchAll();
$m = [];
foreach ($rows as $r) $m[$r['key_name']] = $r['value'];

admin_head('Site settings', 'settings.php');
admin_flash();
?>
<div class="card" style="max-width:720px">
  <h1>Contact details</h1>
  <p class="sub">Single source of truth — contact page, footer and navbar all read from here.</p>
  <form method="post">
    <input type="hidden" name="csrf" value="<?= esc(csrf_token()) ?>">
    <?php foreach ($fields as $k => $label): ?>
      <label><?= esc($label) ?></label>
      <?php if (in_array($k, ['address', 'map_embed'], true)): ?>
        <textarea name="<?= esc($k) ?>"><?= esc($m[$k] ?? '') ?></textarea>
      <?php else: ?>
        <input type="text" name="<?= esc($k) ?>" value="<?= esc($m[$k] ?? '') ?>">
      <?php endif; ?>
    <?php endforeach; ?>
    <div class="row"><button class="btn" type="submit">Save settings</button></div>
  </form>
</div>
<?php admin_foot(); ?>
