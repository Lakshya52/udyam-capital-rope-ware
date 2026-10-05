<?php
require_once __DIR__ . '/partials.php';
require_login();

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'POST') {
    if (!hash_equals($_SESSION['csrf'] ?? '', $_POST['csrf'] ?? '')) fail('Bad form token.');
    $id = (int) ($_POST['id'] ?? 0);
    if (($_POST['do'] ?? '') === 'delete') {
        db()->prepare("DELETE FROM leads WHERE id = ?")->execute([$id]);
        done('Enquiry deleted.', 'leads.php');
    }
    db()->prepare("UPDATE leads SET is_read = ? WHERE id = ?")
        ->execute([!empty($_POST['is_read']) ? 1 : 0, $id]);
    done('Updated.', 'leads.php?id=' . $id);
}

$view = isset($_GET['id']) ? (int) $_GET['id'] : 0;
if ($view) {
    $st = db()->prepare("SELECT * FROM leads WHERE id = ? LIMIT 1");
    $st->execute([$view]);
    $lead = $st->fetch();
    if (!$lead) done('Not found.', 'leads.php');
    if (!(int) $lead['is_read']) {
        db()->prepare("UPDATE leads SET is_read = 1 WHERE id = ?")->execute([$view]);
        $lead['is_read'] = 1;
    }
    admin_head('Enquiry', 'leads.php');
    admin_flash();
    ?>
    <div class="card" style="max-width:720px">
      <h1><?= esc($lead['name'] ?: 'Unnamed') ?></h1>
      <p class="sub"><?= esc($lead['created_at']) ?> · <?= $lead['is_read'] ? 'read' : 'unread' ?></p>
      <p><strong>Service:</strong> <?= esc($lead['service'] ?: '—') ?></p>
      <p><strong>Email:</strong> <a href="mailto:<?= esc($lead['email']) ?>"><?= esc($lead['email'] ?: '—') ?></a></p>
      <p><strong>Phone:</strong> <a href="tel:<?= esc(preg_replace('/[^+\d]/', '', $lead['phone'] ?? '')) ?>"><?= esc($lead['phone'] ?: '—') ?></a></p>
      <h2>Message</h2>
      <div class="lead-body"><?= esc($lead['message']) ?></div>
      <div class="row">
        <form method="post" style="display:inline">
          <input type="hidden" name="csrf" value="<?= esc(csrf_token()) ?>">
          <input type="hidden" name="id" value="<?= (int) $lead['id'] ?>">
          <input type="hidden" name="is_read" value="<?= $lead['is_read'] ? '0' : '1' ?>">
          <button class="btn ghost" type="submit"><?= $lead['is_read'] ? 'Mark unread' : 'Mark read' ?></button>
        </form>
        <form method="post" style="display:inline" onsubmit="return confirm('Delete this enquiry?')">
          <input type="hidden" name="csrf" value="<?= esc(csrf_token()) ?>">
          <input type="hidden" name="do" value="delete">
          <input type="hidden" name="id" value="<?= (int) $lead['id'] ?>">
          <button class="btn danger" type="submit">Delete</button>
        </form>
        <a class="btn ghost" href="leads.php">All leads</a>
      </div>
    </div>
    <?php
    admin_foot();
    exit;
}

$unreadOnly = !empty($_GET['unread']);
$rows = db()->query(
    "SELECT * FROM leads" . ($unreadOnly ? " WHERE is_read = 0" : "") . " ORDER BY id DESC LIMIT 200"
)->fetchAll();

admin_head('Leads', 'leads.php');
admin_flash();
?>
<div class="card">
  <h1>Enquiries</h1>
  <p class="sub">
    <a href="leads.php">All</a> · <a href="leads.php?unread=1">Unread only</a>
  </p>
  <?php if (!$rows): ?>
    <p class="muted">Nothing here yet.</p>
  <?php else: ?>
    <div class="table-wrap"><table>
      <tr><th></th><th>Name</th><th>Service</th><th>Received</th><th></th></tr>
      <?php foreach ($rows as $l): ?>
        <tr <?= (int) $l['is_read'] ? '' : 'style="font-weight:700"' ?>>
          <td><?= (int) $l['is_read'] ? '' : '●' ?></td>
          <td><?= esc($l['name'] ?: 'Unnamed') ?></td>
          <td class="muted"><?= esc($l['service'] ?: '—') ?></td>
          <td class="muted"><?= esc($l['created_at']) ?></td>
          <td><a class="btn small ghost" href="leads.php?id=<?= (int) $l['id'] ?>">Open</a></td>
        </tr>
      <?php endforeach; ?>
    </table></div>
  <?php endif; ?>
</div>
<?php admin_foot(); ?>
