<?php
// Article editor. Body uses a simple block format (no JSON hand-editing):
//   ## Section heading
//   paragraph line (each non-empty line = one paragraph)
require_once __DIR__ . '/partials.php';
require_login();

$id = (int) ($_GET['id'] ?? 0);
$isNew = $id === 0;

$toBlocks = static function ($sections): string {
    $out = [];
    foreach ($sections ?? [] as $s) {
        $out[] = '## ' . ($s['heading'] ?? '');
        foreach ($s['paras'] ?? [] as $p) $out[] = $p;
        $out[] = '';
    }
    return trim(implode("\n", $out));
};
$fromBlocks = static function ($text): array {
    $sections = [];
    $cur = null;
    foreach (preg_split('/\r?\n/', (string) $text) as $line) {
        $line = trim($line);
        if (str_starts_with($line, '##')) {
            if ($cur) $sections[] = $cur;
            $cur = ['heading' => trim(substr($line, 2)), 'paras' => []];
        } elseif ($line !== '' && $cur) {
            $cur['paras'][] = $line;
        }
    }
    if ($cur) $sections[] = $cur;
    return $sections;
};

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'POST') {
    if (!hash_equals($_SESSION['csrf'] ?? '', $_POST['csrf'] ?? '')) fail('Bad form token.');
    $row = [
        'slug' => strtolower(preg_replace('/[^a-z0-9-]/', '', ($_POST['slug'] ?? ''))),
        'title' => trim($_POST['title'] ?? ''),
        'excerpt' => trim($_POST['excerpt'] ?? ''),
        'category' => trim($_POST['category'] ?? ''),
        'date' => trim($_POST['date'] ?? ''),
        'read_time' => trim($_POST['read_time'] ?? ''),
        'image' => trim($_POST['image'] ?? ''),
        'author_name' => trim($_POST['author_name'] ?? ''),
        'author_role' => trim($_POST['author_role'] ?? ''),
        'tags' => json_encode(array_values(array_filter(array_map('trim', preg_split('/\r?\n/', (string) ($_POST['tags'] ?? ''))), fn($l) => $l !== '')), JSON_UNESCAPED_UNICODE),
        'sections' => json_encode($fromBlocks($_POST['sections'] ?? ''), JSON_UNESCAPED_UNICODE),
        'status' => in_array($_POST['status'] ?? '', ['draft', 'published'], true) ? $_POST['status'] : 'published',
    ];
    if ($row['slug'] === '' || $row['title'] === '') fail('Slug and title are required.');
    try {
        if ($isNew) {
            $keys = array_keys($row);
            db()->prepare("INSERT INTO articles (" . implode(',', $keys) . ") VALUES (" . rtrim(str_repeat('?,', count($keys)), ',') . ")")->execute(array_values($row));
            done('Article created.', 'article-edit.php?id=' . (int) db()->lastInsertId());
        }
        $set = implode(',', array_map(fn($k) => "`$k` = ?", array_keys($row)));
        $vals = array_values($row);
        $vals[] = $id;
        db()->prepare("UPDATE articles SET $set WHERE id = ?")->execute($vals);
        done('Saved.', 'article-edit.php?id=' . $id);
    } catch (PDOException $e) {
        fail(($e->errorInfo[1] ?? 0) === 1062 ? 'That slug is already used.' : 'Database error while saving.');
    }
}

$a = ['slug' => '', 'title' => '', 'excerpt' => '', 'category' => 'Guides', 'date' => '', 'read_time' => '', 'image' => '', 'author_name' => 'Team Udyam Capital', 'author_role' => 'Research Desk', 'tags' => [], 'sections' => [], 'views' => 0];
if (!$isNew) {
    $st = db()->prepare("SELECT * FROM articles WHERE id = ? LIMIT 1");
    $st->execute([$id]);
    $a = $st->fetch() ?: $a;
    $a['tags'] = json_decode($a['tags'] ?? '[]', true) ?? [];
    $a['sections'] = json_decode($a['sections'] ?? '[]', true) ?? [];
}

admin_head($isNew ? 'New article' : $a['title'], 'articles.php');
admin_flash();
?>
<div class="card">
  <h1><?= $isNew ? 'New article' : esc($a['title']) ?></h1>
  <p class="sub"><?= $isNew ? 'URL will be /articles/your-slug.' : 'URL: /articles/' . esc($a['slug']) . ' · ' . number_format((int) ($a['views'] ?? 0)) . ' views' ?></p>
  <form method="post">
    <input type="hidden" name="csrf" value="<?= esc(csrf_token()) ?>">
    <div class="grid2">
      <div>
        <label>Title</label>
        <input type="text" name="title" required value="<?= esc($a['title']) ?>">
        <label>Slug (url, lowercase + dashes)</label>
        <input type="text" name="slug" required pattern="[a-z0-9-]+" value="<?= esc($a['slug']) ?>">
        <label>Excerpt</label>
        <textarea name="excerpt"><?= esc($a['excerpt']) ?></textarea>
        <label>Cover image URL (blank = site fallback)</label>
        <input type="text" id="f-image" name="image" value="<?= esc($a['image']) ?>">
        <div class="hint">or upload: <input type="file" data-upload-for="f-image" accept="image/*"></div>
      </div>
      <div>
        <label>Category</label>
        <input type="text" name="category" value="<?= esc($a['category']) ?>" placeholder="Guides">
        <label>Date shown (e.g. Mar 03, 2026)</label>
        <input type="text" name="date" value="<?= esc($a['date']) ?>">
        <label>Read time (e.g. 6 min read)</label>
        <input type="text" name="read_time" value="<?= esc($a['read_time']) ?>">
        <label>Author name</label>
        <input type="text" name="author_name" value="<?= esc($a['author_name']) ?>">
        <label>Author role</label>
        <input type="text" name="author_role" value="<?= esc($a['author_role']) ?>">
        <label>Status</label>
        <select name="status">
          <option value="published" <?= ($a['status'] ?? '') === 'published' ? 'selected' : '' ?>>Published (live)</option>
          <option value="draft" <?= ($a['status'] ?? '') === 'draft' ? 'selected' : '' ?>>Draft (hidden)</option>
        </select>
        <label>Tags (one per line)</label>
        <textarea name="tags"><?= esc(implode("\n", $a['tags'])) ?></textarea>
      </div>
    </div>
    <label>Body — start each section with ## Heading, then one paragraph per line</label>
    <textarea name="sections" class="tall" style="min-height:340px"><?= esc($toBlocks($a['sections'])) ?></textarea>
    <div class="row">
      <button class="btn" type="submit">Save article</button>
      <a class="btn ghost" href="articles.php">Back to list</a>
      <?php if (!$isNew): ?>
        <a class="btn ghost" href="<?= esc(APP_URL . '/articles/' . $a['slug']) ?>" target="_blank" rel="noreferrer">View live</a>
      <?php endif; ?>
    </div>
  </form>
</div>
<?php admin_api_js(); admin_foot(); ?>
