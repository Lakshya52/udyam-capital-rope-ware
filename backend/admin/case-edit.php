<?php
require_once __DIR__ . '/partials.php';
require_login();

$id = (int) ($_GET['id'] ?? 0);
$isNew = $id === 0;

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'POST') {
    if (!hash_equals($_SESSION['csrf'] ?? '', $_POST['csrf'] ?? '')) fail('Bad form token.');
    $stats = [];
    foreach (preg_split('/\r?\n/', (string) ($_POST['stats'] ?? '')) as $line) {
        $line = trim($line);
        if ($line === '') continue;
        $p = explode('|', $line, 2);
        $stats[] = ['value' => trim($p[0]), 'label' => trim($p[1] ?? '')];
    }
    $row = [
        'client' => trim($_POST['client'] ?? ''),
        'industry' => trim($_POST['industry'] ?? ''),
        'service' => trim($_POST['service'] ?? ''),
        'title' => trim($_POST['title'] ?? ''),
        'challenge' => trim($_POST['challenge'] ?? ''),
        'solution' => trim($_POST['solution'] ?? ''),
        'stats' => json_encode($stats, JSON_UNESCAPED_UNICODE),
        'sort_order' => (int) ($_POST['sort_order'] ?? 0),
        'status' => in_array($_POST['status'] ?? '', ['draft', 'published'], true) ? $_POST['status'] : 'published',
    ];
    if ($row['client'] === '' || $row['title'] === '') fail('Client and title are required.');
    if ($isNew) {
        $keys = array_keys($row);
        db()->prepare("INSERT INTO case_studies (" . implode(',', $keys) . ") VALUES (" . rtrim(str_repeat('?,', count($keys)), ',') . ")")->execute(array_values($row));
        done('Case study created.', 'case-edit.php?id=' . (int) db()->lastInsertId());
    }
    $set = implode(',', array_map(fn($k) => "`$k` = ?", array_keys($row)));
    $vals = array_values($row);
    $vals[] = $id;
    db()->prepare("UPDATE case_studies SET $set WHERE id = ?")->execute($vals);
    done('Saved.', 'case-edit.php?id=' . $id);
}

$c = ['client' => '', 'industry' => '', 'service' => '', 'title' => '', 'challenge' => '', 'solution' => '', 'stats' => [], 'sort_order' => 0, 'status' => 'published'];
if (!$isNew) {
    $st = db()->prepare("SELECT * FROM case_studies WHERE id = ? LIMIT 1");
    $st->execute([$id]);
    $c = $st->fetch() ?: $c;
    $c['stats'] = json_decode($c['stats'] ?? '[]', true) ?? [];
}
$statLines = implode("\n", array_map(fn($s) => ($s['value'] ?? '') . ' | ' . ($s['label'] ?? ''), $c['stats']));

admin_head($isNew ? 'New case study' : $c['title'], 'cases.php');
admin_flash();
?>
<div class="card">
  <h1><?= $isNew ? 'New case study' : esc($c['title']) ?></h1>
  <p class="sub">Keep client names generic (e.g. “Textile Exporter”) unless you have written permission.</p>
  <form method="post">
    <input type="hidden" name="csrf" value="<?= esc(csrf_token()) ?>">
    <div class="grid2">
      <div>
        <label>Client (display name)</label>
        <input type="text" name="client" required value="<?= esc($c['client']) ?>">
        <label>Industry</label>
        <input type="text" name="industry" value="<?= esc($c['industry']) ?>" placeholder="Manufacturing">
        <label>Related service (must match a service title)</label>
        <input type="text" name="service" value="<?= esc($c['service']) ?>" placeholder="Working Capital">
        <label>Sort order</label>
        <input type="number" name="sort_order" value="<?= (int) ($c['sort_order'] ?? 0) ?>">
        <label>Status</label>
        <select name="status">
          <option value="published" <?= ($c['status'] ?? '') === 'published' ? 'selected' : '' ?>>Published (live)</option>
          <option value="draft" <?= ($c['status'] ?? '') === 'draft' ? 'selected' : '' ?>>Draft (hidden)</option>
        </select>
      </div>
      <div>
        <label>Title</label>
        <input type="text" name="title" required value="<?= esc($c['title']) ?>">
        <label>Challenge</label>
        <textarea name="challenge"><?= esc($c['challenge']) ?></textarea>
        <label>Solution</label>
        <textarea name="solution"><?= esc($c['solution']) ?></textarea>
        <label>Proof stats (one per line: Value | Label)</label>
        <textarea name="stats"><?= esc($statLines) ?></textarea>
      </div>
    </div>
    <div class="row">
      <button class="btn" type="submit">Save case study</button>
      <a class="btn ghost" href="cases.php">Back to list</a>
    </div>
  </form>
</div>
<?php admin_foot(); ?>
