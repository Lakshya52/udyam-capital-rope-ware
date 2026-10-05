<?php
// Small shared helpers: redirects, escaping, JSON bodies, image uploads.
require_once __DIR__ . '/../config/config.php';

function redirect(string $path): void {
    header('Location: ' . APP_URL . $path);
    exit;
}

function esc($v): string {
    return htmlspecialchars((string) ($v ?? ''), ENT_QUOTES, 'UTF-8');
}

// Merges JSON request bodies into a single input array (forms or fetch).
function request_input(): array {
    $data = $_POST;
    $raw = file_get_contents('php://input');
    if ($raw) {
        $json = json_decode($raw, true);
        if (is_array($json)) $data = array_merge($data, $json);
    }
    return $data;
}

// Keep only whitelisted keys (missing keys stay missing so updates are partial).
function pick(array $in, array $allowed): array {
    $out = [];
    foreach ($allowed as $k) {
        if (array_key_exists($k, $in)) $out[$k] = $in[$k];
    }
    return $out;
}

// Validates + stores one dashboard image upload. Returns the public URL path.
function store_upload(array $file): string {
    if (($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
        throw new RuntimeException('Upload failed.');
    }
    if ($file['size'] > MAX_UPLOAD_MB * 1024 * 1024) {
        throw new RuntimeException('Image must be under ' . MAX_UPLOAD_MB . ' MB.');
    }
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $mime = $finfo->file($file['tmp_name']);
    if (!in_array($mime, ALLOWED_IMAGE_MIMES, true)) {
        throw new RuntimeException('Only JPG, PNG, WebP or SVG images are allowed.');
    }
    $ext = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp', 'image/svg+xml' => 'svg'][$mime];
    if (!is_dir(UPLOAD_DIR) && !mkdir(UPLOAD_DIR, 0755, true)) {
        throw new RuntimeException('Upload folder is not writable.');
    }
    $name = date('Ymd-His') . '-' . bin2hex(random_bytes(6)) . '.' . $ext;
    if (!move_uploaded_file($file['tmp_name'], UPLOAD_DIR . '/' . $name)) {
        throw new RuntimeException('Could not store the upload.');
    }
    return rtrim(UPLOAD_URL_PATH, '/') . '/' . $name;
}
