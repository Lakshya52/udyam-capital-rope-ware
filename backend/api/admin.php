<?php
// Admin JSON API: /api/admin.php?resource=…&action=…&id=…
// Session-guarded (401 without login); every mutation needs the CSRF token
// (POST field `csrf` or `X-CSRF-Token` header) + an HTTP POST request.
//   resources: services | details | articles | cases | about | settings
//              | leads | upload
//   actions:   list | get | create | update | delete   (upload: create only)
require_once __DIR__ . '/../lib/auth.php';
require_once __DIR__ . '/../lib/helpers.php';

require_login_api();

$resource = $_GET['resource'] ?? '';
$action = $_GET['action'] ?? 'list';
$mutating = in_array($action, ['create', 'update', 'delete'], true);
if ($mutating) {
    if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') json_out(['error' => 'Use POST'], 405);
    csrf_check();
    bump_revision();
}
$in = request_input();
$J = static fn($v) => is_string($v) ? (json_decode($v, true) ?? []) : ($v ?? []);
$JENC = static fn($v) => $v === null || $v === '' ? null : (is_string($v) ? $v : json_encode($v, JSON_UNESCAPED_UNICODE));

try {
    switch ($resource) {
        // ---------------- services ----------------
        case 'services': {
            $cols = ['title', 'description', 'image', 'bg', 'hover_bg', 'title_class', 'desc_class', 'span', 'parent_id', 'is_main', 'sort_order', 'status'];
            if ($action === 'list') {
                $rows = db()->query("SELECT * FROM services ORDER BY is_main DESC, sort_order ASC, id ASC")->fetchAll();
                json_out(['services' => $rows]);
            }
            if ($action === 'get') {
                $st = db()->prepare("SELECT * FROM services WHERE id = ? LIMIT 1");
                $st->execute([$_GET['id'] ?? '']);
                $row = $st->fetch();
                if (!$row) json_out(['error' => 'Not found'], 404);
                json_out(['service' => $row]);
            }
            if ($action === 'create') {
                $d = pick($in, $cols);
                if (empty($in['id']) || empty($d['title'])) json_out(['error' => 'id and title are required'], 422);
                $newId = preg_replace('/[^a-z0-9-]/', '', strtolower($in['id']));
                if (!$newId) json_out(['error' => 'Bad id (use a-z, 0-9, dashes)'], 422);
                $d['is_main'] = !empty($d['is_main']) ? 1 : 0;
                $d['sort_order'] = (int) ($d['sort_order'] ?? 0);
                if (isset($d['status']) && !in_array($d['status'], ['draft', 'published'], true)) json_out(['error' => 'Bad status'], 422);
                if (array_key_exists('parent_id', $d) && $d['parent_id'] === '') $d['parent_id'] = null;
                $keys = array_merge(['id'], array_keys($d));
                $vals = array_merge([$newId], array_values($d));
                try {
                    db()->prepare(
                        "INSERT INTO services (" . implode(',', $keys) . ") VALUES (" . rtrim(str_repeat('?,', count($keys)), ',') . ")"
                    )->execute($vals);
                } catch (PDOException $e) {
                    if (($e->errorInfo[1] ?? 0) === 1062) json_out(['error' => 'That id is already used'], 409);
                    throw $e;
                }
                json_out(['ok' => true, 'id' => $newId]);
            }
            if (in_array($action, ['update', 'delete'], true)) {
                $id = $in['id'] ?? $_GET['id'] ?? '';
                if (!$id) json_out(['error' => 'id required'], 422);
                if ($action === 'delete') {
                    db()->prepare("DELETE FROM services WHERE id = ?")->execute([$id]);
                    json_out(['ok' => true]);
                }
                $d = pick($in, $cols);
                unset($d['id']);
                if (array_key_exists('parent_id', $d) && $d['parent_id'] === '') $d['parent_id'] = null;
                if (array_key_exists('is_main', $d)) $d['is_main'] = !empty($d['is_main']) ? 1 : 0;
                if (array_key_exists('sort_order', $d)) $d['sort_order'] = (int) $d['sort_order'];
                if (array_key_exists('status', $d) && !in_array($d['status'], ['draft', 'published'], true)) json_out(['error' => 'Bad status'], 422);
                if (!$d) json_out(['error' => 'Nothing to update'], 422);
                $set = implode(',', array_map(fn($k) => "`$k` = ?", array_keys($d)));
                $vals = array_values($d);
                $vals[] = $id;
                db()->prepare("UPDATE services SET $set WHERE id = ?")->execute($vals);
                json_out(['ok' => true]);
            }
            break;
        }

        // ---------------- service details (upsert per service) ----------------
        case 'details': {
            $cols = ['audience', 'intro', 'story', 'documents', 'benefits', 'process', 'faqs'];
            $sid = $in['service_id'] ?? $_GET['service_id'] ?? '';
            if (!$sid) json_out(['error' => 'service_id required'], 422);
            if ($action === 'get') {
                $st = db()->prepare("SELECT * FROM service_details WHERE service_id = ? LIMIT 1");
                $st->execute([$sid]);
                $row = $st->fetch() ?: ['service_id' => $sid];
                foreach (['story', 'documents', 'benefits', 'process', 'faqs'] as $k) {
                    if (isset($row[$k])) $row[$k] = $J($row[$k]);
                }
                json_out(['details' => $row]);
            }
            if ($action === 'update' || $action === 'create') {
                $chk = db()->prepare("SELECT id FROM services WHERE id = ? LIMIT 1");
                $chk->execute([$sid]);
                if (!$chk->fetch()) json_out(['error' => 'Unknown service'], 404);
                $d = pick($in, $cols);
                foreach (['story', 'documents', 'benefits', 'process', 'faqs'] as $k) {
                    if (array_key_exists($k, $d)) $d[$k] = $JENC($d[$k]);
                }
                if (!$d) json_out(['error' => 'Nothing to update'], 422);
                $keys = array_merge(['service_id'], array_keys($d));
                $vals = array_merge([$sid], array_values($d));
                $updates = implode(',', array_map(fn($k) => "`$k` = VALUES(`$k`)", array_keys($d)));
                db()->prepare(
                    "INSERT INTO service_details (" . implode(',', $keys) . ") VALUES (" . rtrim(str_repeat('?,', count($keys)), ',') . ") ON DUPLICATE KEY UPDATE $updates"
                )->execute($vals);
                json_out(['ok' => true]);
            }
            break;
        }

        // ---------------- articles ----------------
        case 'articles': {
            $cols = ['slug', 'title', 'excerpt', 'category', 'date', 'read_time', 'image', 'author_name', 'author_role', 'tags', 'sections', 'status'];
            if ($action === 'list') {
                $rows = db()->query("SELECT id, slug, title, category, date, status, views, updated_at FROM articles ORDER BY id ASC")->fetchAll();
                json_out(['articles' => $rows]);
            }
            if ($action === 'get') {
                $st = db()->prepare("SELECT * FROM articles WHERE id = ? LIMIT 1");
                $st->execute([(int) ($_GET['id'] ?? 0)]);
                $row = $st->fetch();
                if (!$row) json_out(['error' => 'Not found'], 404);
                $row['tags'] = $J($row['tags']);
                $row['sections'] = $J($row['sections']);
                json_out(['article' => $row]);
            }
            if ($action === 'create' || $action === 'update') {
                $d = pick($in, $cols);
                $d['slug'] = strtolower(preg_replace('/[^a-z0-9-]/', '', $d['slug'] ?? ''));
                foreach (['tags', 'sections'] as $k) {
                    if (array_key_exists($k, $d)) $d[$k] = $JENC($d[$k]);
                }
                if (array_key_exists('status', $d) && !in_array($d['status'], ['draft', 'published'], true)) json_out(['error' => 'Bad status'], 422);
                try {
                    if ($action === 'create') {
                        if (empty($d['slug']) || empty($d['title'])) json_out(['error' => 'slug and title are required'], 422);
                        $keys = array_keys($d);
                        db()->prepare(
                            "INSERT INTO articles (" . implode(',', $keys) . ") VALUES (" . rtrim(str_repeat('?,', count($keys)), ',') . ")"
                        )->execute(array_values($d));
                        json_out(['ok' => true, 'id' => (int) db()->lastInsertId()]);
                    }
                    $id = (int) ($in['id'] ?? 0);
                    if (!$id || !$d) json_out(['error' => $id ? 'Nothing to update' : 'id required'], 422);
                    $set = implode(',', array_map(fn($k) => "`$k` = ?", array_keys($d)));
                    $vals = array_values($d);
                    $vals[] = $id;
                    db()->prepare("UPDATE articles SET $set WHERE id = ?")->execute($vals);
                    json_out(['ok' => true]);
                } catch (PDOException $e) {
                    if (($e->errorInfo[1] ?? 0) === 1062) json_out(['error' => 'That slug is already used'], 409);
                    throw $e;
                }
            }
            if ($action === 'delete') {
                $id = (int) ($in['id'] ?? $_GET['id'] ?? 0);
                db()->prepare("DELETE FROM articles WHERE id = ?")->execute([$id]);
                json_out(['ok' => true]);
            }
            break;
        }

        // ---------------- case studies ----------------
        case 'cases': {
            $cols = ['client', 'industry', 'service', 'title', 'challenge', 'solution', 'stats', 'sort_order', 'status'];
            if ($action === 'list') {
                $rows = db()->query("SELECT * FROM case_studies ORDER BY sort_order ASC, id ASC")->fetchAll();
                foreach ($rows as &$r) $r['stats'] = $J($r['stats']);
                json_out(['cases' => $rows]);
            }
            if ($action === 'get') {
                $st = db()->prepare("SELECT * FROM case_studies WHERE id = ? LIMIT 1");
                $st->execute([(int) ($_GET['id'] ?? 0)]);
                $row = $st->fetch();
                if (!$row) json_out(['error' => 'Not found'], 404);
                $row['stats'] = $J($row['stats']);
                json_out(['case' => $row]);
            }
            if ($action === 'create' || $action === 'update') {
                $d = pick($in, $cols);
                if (array_key_exists('stats', $d)) $d['stats'] = $JENC($d['stats']);
                if (array_key_exists('sort_order', $d)) $d['sort_order'] = (int) $d['sort_order'];
                if (array_key_exists('status', $d) && !in_array($d['status'], ['draft', 'published'], true)) json_out(['error' => 'Bad status'], 422);
                if ($action === 'create') {
                    if (empty($d['client']) || empty($d['title'])) json_out(['error' => 'client and title are required'], 422);
                    $keys = array_keys($d);
                    db()->prepare(
                        "INSERT INTO case_studies (" . implode(',', $keys) . ") VALUES (" . rtrim(str_repeat('?,', count($keys)), ',') . ")"
                    )->execute(array_values($d));
                    json_out(['ok' => true, 'id' => (int) db()->lastInsertId()]);
                }
                $id = (int) ($in['id'] ?? 0);
                if (!$id || !$d) json_out(['error' => $id ? 'Nothing to update' : 'id required'], 422);
                $set = implode(',', array_map(fn($k) => "`$k` = ?", array_keys($d)));
                $vals = array_values($d);
                $vals[] = $id;
                db()->prepare("UPDATE case_studies SET $set WHERE id = ?")->execute($vals);
                json_out(['ok' => true]);
            }
            if ($action === 'delete') {
                $id = (int) ($in['id'] ?? $_GET['id'] ?? 0);
                db()->prepare("DELETE FROM case_studies WHERE id = ?")->execute([$id]);
                json_out(['ok' => true]);
            }
            break;
        }

        // ---------------- about + settings (key-value bulk) ----------------
        case 'about':
        case 'settings': {
            $table = $resource === 'about' ? 'about_content' : 'site_settings';
            if ($action === 'list') {
                $rows = db()->query("SELECT `key_name`, `value` FROM `$table`")->fetchAll();
                $m = [];
                foreach ($rows as $r) $m[$r['key_name']] = $r['value'];
                json_out([$resource => $m]);
            }
            if ($action === 'update') {
                $values = $in['values'] ?? null;
                if (isset($in['key'])) $values = [$in['key'] => $in['value'] ?? null];
                if (!is_array($values) || !$values) json_out(['error' => 'Nothing to update'], 422);
                $st = db()->prepare(
                    "INSERT INTO `$table` (`key_name`, `value`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `value` = VALUES(`value`)"
                );
                foreach ($values as $k => $v) {
                    if (!preg_match('/^[a-z0-9_]+$/', (string) $k)) json_out(['error' => "Bad key: $k"], 422);
                    $st->execute([$k, is_string($v) ? $v : json_encode($v, JSON_UNESCAPED_UNICODE)]);
                }
                json_out(['ok' => true]);
            }
            break;
        }

        // ---------------- leads inbox ----------------
        case 'leads': {
            if ($action === 'list') {
                $unread = !empty($in['unread'] ?? $_GET['unread'] ?? '');
                $limit = min(200, max(1, (int) ($_GET['limit'] ?? 50)));
                $offset = max(0, (int) ($_GET['offset'] ?? 0));
                $sql = "SELECT * FROM leads" . ($unread ? " WHERE is_read = 0" : "") . " ORDER BY id DESC LIMIT $limit OFFSET $offset";
                json_out(['leads' => db()->query($sql)->fetchAll()]);
            }
            if ($action === 'get') {
                $st = db()->prepare("SELECT * FROM leads WHERE id = ? LIMIT 1");
                $st->execute([(int) ($_GET['id'] ?? 0)]);
                $row = $st->fetch();
                if (!$row) json_out(['error' => 'Not found'], 404);
                json_out(['lead' => $row]);
            }
            if ($action === 'update') {
                $id = (int) ($in['id'] ?? 0);
                if (!$id || !array_key_exists('is_read', $in)) json_out(['error' => 'id and is_read required'], 422);
                db()->prepare("UPDATE leads SET is_read = ? WHERE id = ?")
                    ->execute([!empty($in['is_read']) ? 1 : 0, $id]);
                json_out(['ok' => true]);
            }
            if ($action === 'delete') {
                $id = (int) ($in['id'] ?? $_GET['id'] ?? 0);
                db()->prepare("DELETE FROM leads WHERE id = ?")->execute([$id]);
                json_out(['ok' => true]);
            }
            break;
        }

        // ---------------- image upload ----------------
        case 'upload': {
            if ($action !== 'create') break;
            try {
                if (empty($_FILES['image'])) json_out(['error' => 'No image sent'], 422);
                json_out(['ok' => true, 'url' => store_upload($_FILES['image'])]);
            } catch (RuntimeException $e) {
                json_out(['error' => $e->getMessage()], 422);
            }
            break;
        }

        default:
            json_out(['error' => 'Unknown resource'], 400);
    }
    json_out(['error' => 'Unknown action'], 400);
} catch (PDOException $e) {
    json_out(['error' => 'Database error'], 500);
} catch (Throwable $e) {
    json_out(['error' => 'Server error'], 500);
}
