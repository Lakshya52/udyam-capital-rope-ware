<?php
// Public contact form endpoint. POST only: name, email, phone, service,
// message + honeypot field `company` (must stay empty).
// Stores into `leads` AND emails the site inbox. Returns { ok, mailed }.
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../lib/helpers.php';

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
    cors_headers();
    header('Access-Control-Allow-Headers: Content-Type');
    exit;
}
if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    json_out(['error' => 'Use POST'], 405);
}

$in = request_input();
if (!empty($in['company'])) json_out(['ok' => true, 'mailed' => false]); // bots

$name = trim($in['name'] ?? '');
$email = trim($in['email'] ?? '');
$phone = trim($in['phone'] ?? '');
$service = trim($in['service'] ?? '');
$message = trim($in['message'] ?? '');

if ($name === '' || $phone === '' || $message === '') {
    json_out(['error' => 'Name, phone and message are required'], 422);
}
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_out(['error' => 'That email does not look valid'], 422);
}

try {
    $pdo = db();
    $pdo->prepare(
        "INSERT INTO leads (name, email, phone, service, message) VALUES (?,?,?,?,?)"
    )->execute([$name, $email, $phone, $service, $message]);

    $to = $pdo->query("SELECT `value` FROM site_settings WHERE `key_name` = 'email1' LIMIT 1")->fetchColumn() ?: 'we.care@udyamcapital.com';
    $subject = 'Consultation request — ' . $name . ($service !== '' ? " ($service)" : '');
    $body = "Name: $name\nEmail: $email\nPhone: $phone\nService: " . ($service !== '' ? $service : '—') . "\n\nMessage:\n$message";
    $mailed = @mail($to, $subject, $body, 'From: website@' . ($_SERVER['HTTP_HOST'] ?? 'localhost'));
    json_out(['ok' => true, 'mailed' => (bool) $mailed]);
} catch (Throwable $e) {
    json_out(['error' => 'Could not save your request. Please call us instead.'], 500);
}
