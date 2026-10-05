<?php
require_once __DIR__ . '/partials.php';
require_login();

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'POST') {
    if (!hash_equals($_SESSION['csrf'] ?? '', $_POST['csrf'] ?? '')) fail('Bad form token.');
    $team = [];
    foreach (($_POST['team'] ?? []) as $m) {
        $name = trim($m['name'] ?? '');
        if ($name === '' || !empty($m['drop'])) continue;
        $team[] = [
            'name' => $name,
            'role' => trim($m['role'] ?? ''),
            'photo' => trim($m['photo'] ?? ''),
            'linkedin' => trim($m['linkedin'] ?? ''),
            'bio' => trim($m['bio'] ?? ''),
        ];
    }
    $caps = [];
    foreach (preg_split('/\r?\n/', (string) ($_POST['capabilities'] ?? '')) as $line) {
        $line = trim($line);
        if ($line === '') continue;
        $p = explode('|', $line, 2);
        $caps[] = ['label' => trim($p[0]), 'to' => trim($p[1] ?? '')];
    }
    $values = [
        'overview_paras' => json_encode(array_values(array_filter([trim($_POST['p1'] ?? ''), trim($_POST['p2'] ?? ''), trim($_POST['p3'] ?? '')])), JSON_UNESCAPED_UNICODE),
        'vision' => trim($_POST['vision'] ?? ''),
        'mission' => trim($_POST['mission'] ?? ''),
        'team' => json_encode($team, JSON_UNESCAPED_UNICODE),
        'capabilities' => json_encode($caps, JSON_UNESCAPED_UNICODE),
    ];
    $st = db()->prepare("INSERT INTO about_content (`key_name`, `value`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `value` = VALUES(`value`)");
    foreach ($values as $k => $v) $st->execute([$k, $v]);
    done('About page saved.', 'about.php');
}

$rows = db()->query("SELECT `key_name`, `value` FROM about_content")->fetchAll();
$m = [];
foreach ($rows as $r) $m[$r['key_name']] = $r['value'];
$paras = json_decode($m['overview_paras'] ?? '[]', true) ?? [];
$team = json_decode($m['team'] ?? '[]', true) ?? [];
$caps = json_decode($m['capabilities'] ?? '[]', true) ?? [];
$capLines = implode("\n", array_map(fn($c) => ($c['label'] ?? '') . ' | ' . ($c['to'] ?? ''), $caps));

admin_head('About page', 'about.php');
admin_flash();
?>
<div class="card">
  <h1>About page</h1>
  <p class="sub">Overview paragraphs, vision/mission, team and the practice chips at the bottom.</p>
  <form method="post">
    <input type="hidden" name="csrf" value="<?= esc(csrf_token()) ?>">
    <label>Overview — paragraph 1</label>
    <textarea name="p1" class="tall"><?= esc($paras[0] ?? '') ?></textarea>
    <label>Overview — paragraph 2</label>
    <textarea name="p2" class="tall"><?= esc($paras[1] ?? '') ?></textarea>
    <label>Overview — paragraph 3</label>
    <textarea name="p3" class="tall"><?= esc($paras[2] ?? '') ?></textarea>
    <div class="grid2">
      <div>
        <label>Vision</label>
        <textarea name="vision"><?= esc($m['vision'] ?? '') ?></textarea>
      </div>
      <div>
        <label>Mission</label>
        <textarea name="mission"><?= esc($m['mission'] ?? '') ?></textarea>
      </div>
    </div>
    <label>Practice chips (one per line: Label | /link)</label>
    <textarea name="capabilities"><?= esc($capLines) ?></textarea>

    <h2>Team</h2>
    <?php foreach ($team as $i => $t): ?>
      <div class="card" style="background:#f8fafc">
        <div class="grid2">
          <div>
            <label>Name</label>
            <input type="text" name="team[<?= $i ?>][name]" value="<?= esc($t['name'] ?? '') ?>">
            <label>Role</label>
            <input type="text" name="team[<?= $i ?>][role]" value="<?= esc($t['role'] ?? '') ?>">
            <label>Photo URL (blank = initials avatar)</label>
            <input type="text" name="team[<?= $i ?>][photo]" value="<?= esc($t['photo'] ?? '') ?>">
          </div>
          <div>
            <label>LinkedIn URL (blank = hide icon)</label>
            <input type="text" name="team[<?= $i ?>][linkedin]" value="<?= esc($t['linkedin'] ?? '') ?>">
            <label>Bio (one line)</label>
            <textarea name="team[<?= $i ?>][bio]"><?= esc($t['bio'] ?? '') ?></textarea>
            <label><input type="checkbox" name="team[<?= $i ?>][drop]" value="1" style="width:auto"> Remove this member</label>
          </div>
        </div>
      </div>
    <?php endforeach; ?>
    <div class="card" style="background:#f8fafc">
      <h2 style="margin-top:0">Add member</h2>
      <div class="grid2">
        <div>
          <label>Name</label><input type="text" name="team[new][name]" value="">
          <label>Role</label><input type="text" name="team[new][role]" value="">
          <label>Photo URL</label><input type="text" name="team[new][photo]" value="">
        </div>
        <div>
          <label>LinkedIn URL</label><input type="text" name="team[new][linkedin]" value="">
          <label>Bio</label><textarea name="team[new][bio]"></textarea>
        </div>
      </div>
    </div>
    <div class="row"><button class="btn" type="submit">Save about page</button></div>
  </form>
</div>
<?php admin_foot(); ?>
