# Local development with XAMPP (Phase 1: read API + seeded DB)

## 1. XAMPP setup (one time)
1. Install XAMPP (PHP 8.1+). Open XAMPP Control Panel → Start **Apache** and **MySQL**.
2. Open phpMyAdmin → http://localhost/phpmyadmin
3. **Import** tab → choose `backend/database.sql` → Go (creates the `udyam` DB + tables).
4. **Import** tab again → choose `backend/seed/seed.sql` → Go (18 services, 18 detail rows, 16 articles, 13 cases, about content, settings, 1 admin user).
   - Admin login for Phase 2: username `admin`, password `UdyamAdmin#2026` (change it after first login).

## 2. Deploy the site locally (every time you change frontend code)
Existing databases created before `migrate-002.sql` existed: import that file once in phpMyAdmin.
From the project root, run:
```powershell
powershell -ExecutionPolicy Bypass -File backend\deploy-local.ps1
```
This builds React (`dist/`) and assembles `C:\xampp\htdocs\udyam`:
`index.html + assets/` (site) · `api/` (PHP) · `.htaccess` (SPA routes) · `uploads/`

## 3. Verify
- Site: http://localhost/udyam
- API: http://localhost/udyam/api/content.php?type=settings
  - Try `services`, `articles`, `cases`, `about` too. Each shape mirrors
    `src/data/*.js` so the React swap (Phase 2) is a drop-in.

## Notes
- `backend/config/db.php` holds the DB credentials (XAMPP defaults work as-is).
- Re-running `seed.sql` on a filled DB will duplicate rows — use a fresh DB
  (drop + re-import `database.sql`) when re-seeding.
- CORS is wide-open (`*`) for localhost dev only — it gets locked to your
  domain before Hostinger deployment.
