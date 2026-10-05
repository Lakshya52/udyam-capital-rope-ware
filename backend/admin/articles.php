<?php
require_once __DIR__ . '/partials.php';
require_login();

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'POST' && ($_POST['do'] ?? '') === 'delete') {
    if (!hash_equals($_SESSION['csrf'] ?? '', $_POST['csrf'] ?? '')) fail('Bad form token.');
    db()->prepare("DELETE FROM articles WHERE id = ?")->execute([(int) ($_POST['id'] ?? 0)]);
    done('Article deleted.', 'articles.php');
}

$rows = db()->query("SELECT id, slug, title, category, date, status, views FROM articles ORDER BY id ASC")->fetchAll();

admin_head('Articles', 'articles.php');
admin_flash();
?>
<div class="card">
  <h1>Articles</h1>
  <p class="sub">Guides and explainers. Drafts stay hidden on the site.</p>
  <div class="row" style="margin-top:0;margin-bottom:14px">
    <a class="btn" href="article-edit.php">+ New article</a>
  </div>
  <div class="table-wrap"><table>
    <tr><th>Title</th><th>Category</th><th>Date</th><th>Views</th><th>Status</th><th></th></tr>
    <?php foreach ($rows as $r): ?>
      <tr>
        <td><a href="article-edit.php?id=<?= (int) $r['id'] ?>"><strong><?= esc($r['title']) ?></strong></a><br><span class="mono muted">/<?= esc($r['slug']) ?></span></td>
        <td class="muted"><?= esc($r['category'] ?: '—') ?></td>
        <td class="muted"><?= esc($r['date'] ?: '—') ?></td>
        <td><?= number_format((int) $r['views']) ?></td>
        <td><?= $r['status'] === 'published' ? '<span class="pill pub">live</span>' : '<span class="pill draft">draft</span>' ?></td>
        <td style="white-space:nowrap">
          <a class="btn small ghost" href="article-edit.php?id=<?= (int) $r['id'] ?>">Edit</a>
          <form method="post" style="display:inline" onsubmit="return confirm('Delete this article?')">
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
