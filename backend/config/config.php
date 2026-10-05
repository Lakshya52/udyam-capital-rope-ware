<?php
// Central application config. DEPLOY-TIME ONLY: values here can only be
// changed by editing this file and redeploying (never from the dashboard).
// In particular ADMIN_ACCESS_KEY is required on EVERY admin login, in
// addition to username + password. Guard this file (see .htaccess next to it).

// Base URL of the site, no trailing slash. Used for redirects and links.
// XAMPP local example: 'http://localhost/udyam'   |   Hostinger: 'https://udyamcapital.com'
define('APP_URL', 'http://localhost/udyam');

// Extra login secret. The admin login form asks for it every time and it is
// verified with hash_equals() BEFORE the username/password are even looked at.
// To rotate it, replace the value below and redeploy this file.
define('ADMIN_ACCESS_KEY', 'd2878d197b6eaf4e5614ab96c7bba1e13c53f98348fe20ed085bca6cbf15fc66');

// CORS allowlist for API calls from another origin (Vite dev server).
// Same-origin requests (the deployed site) always work. On Hostinger,
// keep only your domains here.
define('ALLOWED_ORIGINS', [
  'http://localhost:5173',
  'http://localhost',
  'https://udyamcapital.com',
  'https://www.udyamcapital.com',
]);
// Session hardening.
define('SESSION_NAME', 'udyam_admin');
define('SESSION_IDLE_TIMEOUT', 3600); // seconds of inactivity before logout

// Uploads (dashboard image uploads).
define('UPLOAD_DIR', dirname(__DIR__) . '/uploads');
define('UPLOAD_URL_PATH', '/uploads');
define('MAX_UPLOAD_MB', 5);
define('ALLOWED_IMAGE_MIMES', ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']);