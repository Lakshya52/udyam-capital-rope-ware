<?php
// Dynamic XML sitemap — crawlers always see current services + articles.
// Point robots.txt / Search Console at /sitemap.php
require_once __DIR__ . '/config/config.php';
require_once __DIR__ . '/config/db.php';

$base = rtrim(APP_URL, '/');
$urls = [
    ['loc' => "$base/", 'pr' => '1.0'],
    ['loc' => "$base/about", 'pr' => '0.9'],
    ['loc' => "$base/contact", 'pr' => '0.9'],
    ['loc' => "$base/case-studies", 'pr' => '0.8'],
    ['loc' => "$base/articles", 'pr' => '0.8'],
];
try {
    $pdo = db();
    foreach ($pdo->query("SELECT id FROM services WHERE status='published' ORDER BY is_main DESC, sort_order ASC")->fetchAll() as $r) {
        $urls[] = ['loc' => "$base/services/" . rawurlencode($r['id']), 'pr' => '0.8'];
    }
    foreach ($pdo->query("SELECT slug FROM articles WHERE status='published' ORDER BY id ASC")->fetchAll() as $r) {
        $urls[] = ['loc' => "$base/articles/" . rawurlencode($r['slug']), 'pr' => '0.7'];
    }
} catch (Throwable $e) { /* serve the static routes regardless */
}

header('Content-Type: application/xml; charset=utf-8');
echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
foreach ($urls as $u) {
    echo '  <url><loc>' . htmlspecialchars($u['loc'], ENT_XML1, 'UTF-8') . '</loc><priority>' . $u['pr'] . '</priority></url>' . "\n";
}
echo '</urlset>';
