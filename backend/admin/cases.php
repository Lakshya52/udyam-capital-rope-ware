<?php
require_once __DIR__ . '/partials.php';
require_login();

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'POST' && ($_POST['do'] ?? '') === 'delete') {
    if (!hash_equals($_SESSION['csrf'] ?? '', $_POST['csrf'] ?? '')) fail('Bad form token.');
    db()->prepare("DELETE FROM case_studies WHERE id = ?")->execute([(int) ($_POST['id'] ?? 0)]);
    done('Case study deleted.', 'cases.php');
}

$rows = db()->query("SELECT id, client, industry, title, status FROM case_studies ORDER BY sort_order ASC, id ASC")->fetchAll();

admin_head('Case studies', 'cases.php');
admin_flash();
?>
<div class="card">
  <h1>Case studies</h1>
  <p class="sub">Client stories with challenge → solution → proof stats.</p>
  <div class="row" style="margin-top:0;margin-bottom:14px">
    <a class="btn" href="case-edit.php">+ New case study</a>
  </div>
  <div class="table-wrap"><table>
    <tr><th>Title</th><th>Client</th><th>Industry</th><th>Status</th><th></th></tr>
    <?php foreach ($rows as $r): ?>
      <tr>
        <td><a href="case-edit.php?id=<?= (int) $r['id'] ?>"><strong><?= esc($r['title']) ?></strong></a></td>
        <td class="muted"><?= esc($r['client']) ?></td>
        <td class="muted"><?= esc($r['industry'] ?: '—') ?></td>
        <td><?= $r['status'] === 'published' ? '<span class="pill pub">live</span>' : '<span class="pill draft">draft</span>' ?></td>
        <td style="white-space:nowrap">
          <a class="btn small ghost" href="case-edit.php?id=<?= (int) $r['id'] ?>">Edit</a>
          <form method="post" style="display:inline" onsubmit="return confirm('Delete this case study?')">
            <input type="hidden" name="csrf" value="<?= esc(csrf_token()) ?>">
            <input type="hidden" name="do" value="delete">
            <input type="hidden" name="id" value="<?= (int) $r['id'] ?>">
            <button class="btn small danger" type="submit">Delete</button>
          </form>
        </td>
      </tr>
    <?php endforeach; ?>
  </table></div>
</div>
<?php admin_foot(); ?>
