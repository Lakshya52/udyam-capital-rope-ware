<?php
// One page edits a service AND its detail copy. Nested lists use a
// line format so no JSON hand-editing is needed:
//   documents → one per line
//   benefits / process → "Title | Description" per line
//   faqs → "Question | Answer" per line
//   story paras → blank line between paragraphs
require_once __DIR__ . '/partials.php';
require_login();

$id = $_GET['id'] ?? '';
$isNew = $id === '';
$presetParent = $_GET['parent'] ?? '';

$lines = static fn($t) => array_values(array_filter(array_map('trim', preg_split('/\r?\n/', (string) ($t ?? ''))), fn($l) => $l !== ''));
$pairs = static function ($t) use ($lines) {
    $out = [];
    foreach ($lines($t) as $l) {
        $p = explode('|', $l, 2);
        $out[] = ['title' => trim($p[0]), 'desc' => trim($p[1] ?? '')];
    }
    return $out;
};
$faqLines = static function ($t) use ($lines) {
    $out = [];
    foreach ($lines($t) as $l) {
        $p = explode('|', $l, 2);
        $out[] = ['q' => trim($p[0]), 'a' => trim($p[1] ?? '')];
    }
    return $out;
};
$toLines = static fn($arr, $f) => implode("\n", array_map($f, $arr ?? []));

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'POST') {
    if (!hash_equals($_SESSION['csrf'] ?? '', $_POST['csrf'] ?? '')) fail('Bad form token.');
    $sid = $isNew
        ? strtolower(preg_replace('/[^a-z0-9-]/', '', ($_POST['new_id'] ?? '')))
        : $id;
    if ($isNew && (!$sid || empty($_POST['title']))) fail('ID and title are required for a new service.');
    try {
        $pdo = db();
        $parent = $_POST['parent_id'] ?? '';
        $row = [
            'title' => trim($_POST['title'] ?? ''),
            'description' => trim($_POST['description'] ?? ''),
            'image' => trim($_POST['image'] ?? ''),
            'bg' => trim($_POST['bg'] ?? ''),
            'hover_bg' => trim($_POST['hover_bg'] ?? ''),
            'title_class' => trim($_POST['title_class'] ?? ''),
            'desc_class' => trim($_POST['desc_class'] ?? ''),
            'span' => trim($_POST['span'] ?? ''),
            'parent_id' => $parent !== '' ? $parent : null,
            'is_main' => !empty($_POST['is_main']) ? 1 : 0,
            'sort_order' => (int) ($_POST['sort_order'] ?? 0),
            'status' => in_array($_POST['status'] ?? '', ['draft', 'published'], true) ? $_POST['status'] : 'published',
        ];
        if ($isNew) {
            $keys = array_merge(['id'], array_keys($row));
            $vals = array_merge([$sid], array_values($row));
            $pdo->prepare("INSERT INTO services (" . implode(',', $keys) . ") VALUES (" . rtrim(str_repeat('?,', count($keys)), ',') . ")")->execute($vals);
            $pdo->prepare("INSERT INTO service_details (service_id) VALUES (?)")->execute([$sid]);
        } else {
            $set = implode(',', array_map(fn($k) => "`$k` = ?", array_keys($row)));
            $vals = array_values($row);
            $vals[] = $id;
            $pdo->prepare("UPDATE services SET $set WHERE id = ?")->execute($vals);
            $sid = $id;
        }
        $storyParas = array_values(array_filter(array_map('trim', preg_split('/\r?\n\r?\n/', (string) ($_POST['story_paras'] ?? ''))), fn($l) => $l !== ''));
        $det = [
            'audience' => trim($_POST['audience'] ?? ''),
            'intro' => trim($_POST['intro'] ?? ''),
            'story' => json_encode(['heading' => trim($_POST['story_heading'] ?? ''), 'paras' => $storyParas], JSON_UNESCAPED_UNICODE),
            'documents' => json_encode($lines($_POST['documents'] ?? ''), JSON_UNESCAPED_UNICODE),
            'benefits' => json_encode($pairs($_POST['benefits'] ?? ''), JSON_UNESCAPED_UNICODE),
            'process' => json_encode($pairs($_POST['process'] ?? ''), JSON_UNESCAPED_UNICODE),
            'faqs' => json_encode($faqLines($_POST['faqs'] ?? ''), JSON_UNESCAPED_UNICODE),
        ];
        $keys = array_merge(['service_id'], array_keys($det));
        $vals = array_merge([$sid], array_values($det));
        $updates = implode(',', array_map(fn($k) => "`$k` = VALUES(`$k`)", array_keys($det)));
        $pdo->prepare("INSERT INTO service_details (" . implode(',', $keys) . ") VALUES (" . rtrim(str_repeat('?,', count($keys)), ',') . ") ON DUPLICATE KEY UPDATE $updates")->execute($vals);
        done('Saved.', 'service-edit.php?id=' . urlencode($sid));
    } catch (PDOException $e) {
        fail(($e->errorInfo[1] ?? 0) === 1062 ? 'That ID is already used.' : 'Database error while saving.');
    }
}

$mains = db()->query("SELECT id, title FROM services WHERE is_main = 1 ORDER BY sort_order ASC")->fetchAll();
$svc = ['title' => '', 'description' => '', 'image' => '', 'bg' => 'bg-[#9cc7ff]', 'hover_bg' => '', 'title_class' => '', 'desc_class' => '', 'span' => 'lg:col-span-3', 'parent_id' => $presetParent, 'is_main' => $presetParent ? 0 : 1, 'sort_order' => 0, 'status' => 'published'];
$det = ['audience' => '', 'intro' => '', 'story' => ['heading' => '', 'paras' => []], 'documents' => [], 'benefits' => [], 'process' => [], 'faqs' => []];
if (!$isNew) {
    $st = db()->prepare("SELECT * FROM services WHERE id = ? LIMIT 1");
    $st->execute([$id]);
    $svc = $st->fetch() ?: $svc;
    $st = db()->prepare("SELECT * FROM service_details WHERE service_id = ? LIMIT 1");
    $st->execute([$id]);
    if ($row = $st->fetch()) {
        foreach (['story', 'documents', 'benefits', 'process', 'faqs'] as $k) {
            $det[$k] = json_decode($row[$k] ?? '[]', true) ?? [];
        }
        $det['audience'] = $row['audience'] ?? '';
        $det['intro'] = $row['intro'] ?? '';
    }
}
$J = static fn($v) => is_string($v) ? (json_decode($v, true) ?? []) : ($v ?? []);
$det['story'] = is_array($det['story']) ? $det['story'] : [];

admin_head($isNew ? 'New service' : $svc['title'], 'services.php');
admin_flash();
?>
<div class="card">
  <h1><?= $isNew ? 'New service' : esc($svc['title']) ?></h1>
  <p class="sub"><?= $isNew ? 'ID becomes the page URL: /services/your-id (lowercase, dashes).' : 'Page URL: /services/' . esc($id) ?></p>
  <form method="post">
    <input type="hidden" name="csrf" value="<?= esc(csrf_token()) ?>">
    <div class="grid2">
      <div>
        <?php if ($isNew): ?>
          <label>ID (url slug)</label>
          <input type="text" name="new_id" required pattern="[a-z0-9-]+" placeholder="e.g. equipment-finance">
        <?php endif; ?>
        <label>Title</label>
        <input type="text" name="title" required value="<?= esc($svc['title']) ?>">
        <label>Description (card + listings)</label>
        <textarea name="description"><?= esc($svc['description']) ?></textarea>
        <label>Image URL</label>
        <input type="text" id="f-image" name="image" value="<?= esc($svc['image']) ?>" placeholder="/services/….jpg or uploaded URL">
        <div class="hint">or upload: <input type="file" data-upload-for="f-image" accept="image/*"></div>
        <label>Parent practice (empty = top-level practice)</label>
        <select name="parent_id">
          <option value="">— top-level practice —</option>
          <?php foreach ($mains as $m): ?>
            <?php if (!$isNew && $m['id'] === $id) continue; ?>
            <option value="<?= esc($m['id']) ?>" <?= ($svc['parent_id'] ?? '') === $m['id'] ? 'selected' : '' ?>><?= esc($m['title']) ?></option>
          <?php endforeach; ?>
        </select>
      </div>
      <div>
        <label><input type="checkbox" name="is_main" value="1" <?= !empty($svc['is_main']) ? 'checked' : '' ?> style="width:auto"> Top-level practice (shows in grid + menus)</label>
        <label>Status</label>
        <select name="status">
          <option value="published" <?= ($svc['status'] ?? '') === 'published' ? 'selected' : '' ?>>Published (live)</option>
          <option value="draft" <?= ($svc['status'] ?? '') === 'draft' ? 'selected' : '' ?>>Draft (hidden)</option>
        </select>
        <label>Sort order (mains only)</label>
        <input type="number" name="sort_order" value="<?= (int) ($svc['sort_order'] ?? 0) ?>">
        <label>Card background class</label>
        <input type="text" name="bg" value="<?= esc($svc['bg']) ?>">
        <label>Hover gradient class</label>
        <input type="text" name="hover_bg" value="<?= esc($svc['hover_bg']) ?>">
        <label>Grid span class</label>
        <input type="text" name="span" value="<?= esc($svc['span']) ?>">
      </div>
    </div>

    <h2>Detail page copy</h2>
    <label>Audience (one line: who it's for)</label>
    <input type="text" name="audience" value="<?= esc($det['audience']) ?>">
    <label>Intro (shown under the title)</label>
    <textarea name="intro" class="tall"><?= esc($det['intro']) ?></textarea>
    <div class="grid2">
      <div>
        <label>Story heading</label>
        <input type="text" name="story_heading" value="<?= esc($det['story']['heading'] ?? '') ?>">
      </div>
    </div>
    <label>Story paragraphs (blank line between paragraphs)</label>
    <textarea name="story_paras" class="tall"><?= esc(implode("\n\n", $det['story']['paras'] ?? [])) ?></textarea>
    <label>Documents checklist (one per line)</label>
    <textarea name="documents"><?= esc(implode("\n", $J($det['documents']))) ?></textarea>
    <label>Benefits (one per line: Title | Description)</label>
    <textarea name="benefits" class="tall"><?= esc($toLines($J($det['benefits']), fn($b) => ($b['title'] ?? '') . ' | ' . ($b['desc'] ?? ''))) ?></textarea>
    <label>Process steps (one per line: Title | Description)</label>
    <textarea name="process" class="tall"><?= esc($toLines($J($det['process']), fn($b) => ($b['title'] ?? '') . ' | ' . ($b['desc'] ?? ''))) ?></textarea>
    <label>FAQs (one per line: Question | Answer)</label>
    <textarea name="faqs" class="tall"><?= esc($toLines($J($det['faqs']), fn($b) => ($b['q'] ?? '') . ' | ' . ($b['a'] ?? ''))) ?></textarea>

    <div class="row">
      <button class="btn" type="submit">Save service</button>
      <a class="btn ghost" href="services.php">Back to list</a>
      <?php if (!$isNew): ?>
        <a class="btn ghost" href="<?= esc(APP_URL . '/services/' . $id) ?>" target="_blank" rel="noreferrer">View live page</a>
      <?php endif; ?>
    </div>
  </form>
</div>
<?php admin_api_js(); admin_foot(); ?>
