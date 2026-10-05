<?php
require_once __DIR__ . '/partials.php';
require_login();

$pdo = db();
$counts = [
    'Services' => (int) $pdo->query("SELECT COUNT(*) FROM services")->fetchColumn(),
    'Articles' => (int) $pdo->query("SELECT COUNT(*) FROM articles WHERE status='published'")->fetchColumn(),
    'Case studies' => (int) $pdo->query("SELECT COUNT(*) FROM case_studies WHERE status='published'")->fetchColumn(),
    'Unread leads' => (int) $pdo->query("SELECT COUNT(*) FROM leads WHERE is_read = 0")->fetchColumn(),
];
$recent = $pdo->query("SELECT id, name, service, created_at FROM leads ORDER BY id DESC LIMIT 5")->fetchAll();

admin_head('Dashboard', 'dashboard.php');
admin_flash();
?>
<div class="card">
  <h1>Dashboard</h1>
  <p class="sub">Everything editable on the website, in one place.</p>
  <div class="grid3">
    <?php foreach ($counts as $label => $n): ?>
      <div class="stat"><b><?= (int) $n ?></b><span><?= esc($label) ?></span></div>
    <?php endforeach; ?>
  </div>
</div>
<div class="card">
  <h2 style="margin-top:0">Latest enquiries</h2>
  <?php if (!$recent): ?>
    <p class="muted">No enquiries yet.</p>
  <?php else: ?>
    <div class="table-wrap"><table>
      <tr><th>Name</th><th>Service</th><th>Received</th><th></th></tr>
      <?php foreach ($recent as $l): ?>
        <tr>
          <td><?= esc($l['name']) ?></td>
          <td><?= esc($l['service'] ?: '—') ?></td>
          <td class="muted"><?= esc($l['created_at']) ?></td>
          <td><a class="btn small ghost" href="leads.php?id=<?= (int) $l['id'] ?>">Open</a></td>
        </tr>
      <?php endforeach; ?>
    </table></div>
  <?php endif; ?>
  <div class="row"><a class="btn ghost" href="leads.php">All leads</a></div>
</div>
<?php admin_foot(); ?>
