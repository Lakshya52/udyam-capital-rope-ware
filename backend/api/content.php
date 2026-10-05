<?php
// Public read API. Single endpoint, ?type=… — shapes below intentionally
// mirror src/data/*.js so the React swap is a drop-in.
//   services → { services, subServices, serviceDetails }
//   articles → { articles }            (published only)
//   article&slug=… → { article }       (bumps views, like trackView)
//   cases    → { cases }
//   about    → { overview[], vision, mission, team[], capabilities[] }
//   settings → { landline, landline_href, mobile, mobile_href, email1,
//                email2, address, map_query, map_embed }
require_once __DIR__ . '/../config/db.php';

$type = $_GET['type'] ?? '';
$J = static fn($v) => is_string($v) ? (json_decode($v, true) ?? []) : ($v ?? []);

try {
    $pdo = db();

    switch ($type) {
        case 'services': {
            $rows = $pdo->query(
                "SELECT * FROM services WHERE status='published' ORDER BY is_main DESC, sort_order ASC"
            )->fetchAll();
            $det = $pdo->query("SELECT * FROM service_details")->fetchAll();
            $byId = [];
            foreach ($det as $d) {
                $byId[$d['service_id']] = [
                    'audience'  => $d['audience'],
                    'intro'     => $d['intro'],
                    'story'     => $J($d['story']),
                    'documents' => $J($d['documents']),
                    'benefits'  => $J($d['benefits']),
                    'process'   => $J($d['process']),
                    'faqs'      => $J($d['faqs']),
                ];
            }
            $services = [];
            $subs = [];
            foreach ($rows as $r) {
                $item = [
                    'id' => $r['id'], 'title' => $r['title'],
                    'desc' => $r['description'], 'image' => $r['image'],
                    'bg' => $r['bg'], 'hoverBg' => $r['hover_bg'],
                    'titleClass' => $r['title_class'],
                    'descClass' => $r['desc_class'], 'span' => $r['span'],
                ];
                if ((int) $r['is_main'] === 1) {
                    $item['children'] = array_values(array_map(
                        fn($c) => $c['id'],
                        array_filter($rows, fn($c) => $c['parent_id'] === $r['id'])
                    ));
                    $services[] = $item;
                } else {
                    $item['parent'] = $r['parent_id'];
                    $subs[] = $item;
                }
            }
            // Keep admin's main order; subs follow their parent's children order.
            json_out(['services' => $services, 'subServices' => $subs, 'serviceDetails' => $byId]);
        }

        case 'articles': {
            $rows = $pdo->query(
                "SELECT * FROM articles WHERE status='published' ORDER BY id ASC"
            )->fetchAll();
            json_out(['articles' => array_map(fn($a) => article_shape($a, $J), $rows)]);
        }

        case 'article': {
            $slug = $_GET['slug'] ?? '';
            $st = $pdo->prepare(
                "SELECT * FROM articles WHERE slug = ? AND status='published' LIMIT 1"
            );
            $st->execute([$slug]);
            $a = $st->fetch();
            if (!$a) json_out(['error' => 'Not found'], 404);
            $pdo->prepare("UPDATE articles SET views = views + 1 WHERE id = ?")
                ->execute([$a['id']]);
            $a['views']++;
            json_out(['article' => article_shape($a, $J)]);
        }

        case 'cases': {
            $rows = $pdo->query(
                "SELECT * FROM case_studies WHERE status='published' ORDER BY sort_order ASC, id ASC"
            )->fetchAll();
            json_out(['cases' => array_map(fn($c) => [
                'client' => $c['client'], 'industry' => $c['industry'],
                'service' => $c['service'], 'title' => $c['title'],
                'challenge' => $c['challenge'], 'solution' => $c['solution'],
                'stats' => $J($c['stats']),
            ], $rows)]);
        }

        case 'about': {
            $rows = $pdo->query("SELECT `key_name`, `value` FROM about_content")->fetchAll();
            $m = [];
            foreach ($rows as $r) $m[$r['key_name']] = $r['value'];
            json_out([
                'overview' => $J($m['overview_paras'] ?? '[]'),
                'vision' => $m['vision'] ?? '',
                'mission' => $m['mission'] ?? '',
                'team' => $J($m['team'] ?? '[]'),
                'capabilities' => $J($m['capabilities'] ?? '[]'),
            ]);
        }

        case 'settings': {
            $rows = db()->query("SELECT `key_name`, `value` FROM site_settings")->fetchAll();
            $m = [];
            foreach ($rows as $r) $m[$r['key_name']] = $r['value'];
            json_out($m);
        }

        // Cache-buster for the frontend: bumped on every admin content edit.
        case 'version': {
            try {
                $v = db()->query("SELECT `value` FROM site_settings WHERE `key_name` = 'content_revision' LIMIT 1")->fetchColumn();
            } catch (Throwable $e) {
                $v = null;
            }
            json_out(['version' => $v !== false ? $v : null]);
        }

        default:
            json_out(['error' => 'Unknown type. Use services|articles|article|cases|about|settings|version'], 400);
    }
} catch (Throwable $e) {
    json_out(['error' => 'Server error'], 500);
}

function article_shape(array $a, callable $J): array {
    return [
        'slug' => $a['slug'], 'title' => $a['title'],
        'excerpt' => $a['excerpt'], 'category' => $a['category'],
        'date' => $a['date'], 'readTime' => $a['read_time'],
        'image' => $a['image'],
        'author' => ['name' => $a['author_name'], 'role' => $a['author_role']],
        'tags' => $J($a['tags']), 'sections' => $J($a['sections']),
        'views' => (int) $a['views'],
    ];
}
