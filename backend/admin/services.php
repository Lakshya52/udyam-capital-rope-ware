<?php
require_once __DIR__ . '/partials.php';
require_login();

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'POST' && ($_POST['do'] ?? '') === 'delete') {
    if (!hash_equals($_SESSION['csrf'] ?? '', $_POST['csrf'] ?? '')) fail('Bad form token.');
    $id = $_POST['id'] ?? '';
    $kids = db()->prepare("SELECT COUNT(*) FROM services WHERE parent_id = ?");
    $kids->execute([$id]);
    db()->prepare("DELETE FROM services WHERE id = ?")->execute([$id]);
    $n = (int) $kids->fetchColumn();
    done('Service deleted.' . ($n ? " $n sub-service(s) are now unparented — reassign them." : ''), 'services.php');
}

$rows = db()->query("SELECT * FROM services ORDER BY is_main DESC, sort_order ASC, id ASC")->fetchAll();
$titles = [];
foreach ($rows as $r) $titles[$r['id']] = $r['title'];

admin_head('Services', 'services.php');
admin_flash();
?>
<div class="card">
  <h1>Services</h1>
  <p class="sub">4 practices (mains) + sub-services. Detail copy, documents, FAQs live on each service's edit page.</p>
  <div class="row" style="margin-top:0;margin-bottom:14px">
    <a class="btn" href="service-edit.php">+ New practice</a>
    <a class="btn ghost" href="service-edit.php?parent=transaction-advisory">+ New sub-service</a>
  </div>
  <div class="table-wrap"><table>
    <tr><th>Title</th><th>ID</th><th>Type</th><th>Parent</th><th>Status</th><th></th></tr>
    <?php foreach ($rows as $r): ?>
      <tr>
        <td><a href="service-edit.php?id=<?= esc($r['id']) ?>"><strong><?= esc($r['title']) ?></strong></a></td>
        <td class="mono muted"><?= esc($r['id']) ?></td>
        <td><?= (int) $r['is_main'] ? '<span class="pill main">practice</span>' : '<span class="pill draft">sub</span>' ?></td>
        <td class="muted"><?= esc($r['parent_id'] ? ($titles[$r['parent_id']] ?? $r['parent_id']) : '—') ?></td>
        <td><?= $r['status'] === 'published' ? '<span class="pill pub">live</span>' : '<span class="pill draft">draft</span>' ?></td>
        <td style="white-space:nowrap">
          <a class="btn small ghost" href="service-edit.php?id=<?= esc($r['id']) ?>">Edit</a>
          <form method="post" style="display:inline" onsubmit="return confirm('Delete <?= esc($r['title']) ?>? Its detail page goes with it.')">
            <input type="hidden" name="csrf" value="<?= esc(csrf_token()) ?>">
            <input type="hidden" name="do" value="delete">
            <input type="hidden" name="id" value="<?= esc($r['id']) ?>">
            <button class="btn small danger" type="submit">Delete</button>
          </form>
        </td>
      </tr>
    <?php endforeach; ?>
  </table></div>
</div>
<?php admin_foot(); ?>
