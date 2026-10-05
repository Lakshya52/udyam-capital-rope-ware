# Final deployment — Hostinger shared hosting

## 0. Before you start
- Site + admin fully tested on XAMPP (see README-LOCAL.md).
- You have: this `backend/` folder and a fresh `npm run build` (`dist/`).

## 1. Database (hPanel → Databases → Management)
1. Create database, e.g. `u123456789_udyam`. Create a DB user, add it to the DB with ALL PRIVILEGES. Note the **host** (usually `localhost`), db name, user, password.
2. Open **phpMyAdmin** → select the DB → Import `backend/database.sql` → Go.
3. Import `backend/seed/seed.sql` → Go (first deploy only — never re-import on a live DB or you'll duplicate content).
4. Import `backend/migrate-002.sql` → Go (only if this DB was created before that file existed).

## 2. Server-side config (do this BEFORE uploading)
Edit these two files locally:
- `backend/config/db.php` → DB_HOST / DB_NAME / DB_USER / DB_PASS from step 1.
- `backend/config/config.php` →
  - `APP_URL` = `https://yourdomain.com` (no trailing slash),
  - `ADMIN_ACCESS_KEY` = a fresh 64-char hex (`php -r "echo bin2hex(random_bytes(32)), PHP_EOL;"`),
  - trim `ALLOWED_ORIGINS` to just your domains.

## 3. Upload (hPanel → File Manager, `public_html/`)
- Contents of `dist/` → `public_html/` (index.html, assets/, images…)
- `backend/api` → `public_html/api`, `backend/config` → `public_html/config`,
  `backend/lib` → `public_html/lib`, `backend/admin` → `public_html/admin`,
  `backend/sitemap.php` → `public_html/sitemap.php`,
  `backend/.htaccess` → `public_html/.htaccess`
- Create `public_html/uploads/` (empty). Copy `backend/uploads/.htaccess` into it.
- File permissions: folders 755, files 644 (File Manager defaults are fine).

## 4. Go-live checks
1. `https://yourdomain.com` loads (HTTP→HTTPS: hPanel → SSL → force HTTPS on).
2. `…/api/content.php?type=settings` returns JSON.
3. `…/sitemap.php` returns XML; Search Console → submit it.
4. `…/admin/` → log in (username `admin`, the password you set locally, the NEW access key) → **Password page → change the password immediately**.
5. Admin → Settings → change one label → reload the site → change appears within seconds (revision-buster working).
6. Submit the contact form → inbox mail arrives + row in Leads.
7. `…/config/db.php` in a browser must show **403 Forbidden** (config protection working).

## 5. Ongoing
- Never re-import `seed.sql` on live (duplicates). Content edits happen in `/admin`.
- Backups: hPanel → Backups (files + DB) before any big content session.
- Admin URL is unlinked everywhere — only people you tell can find `/admin/`.
