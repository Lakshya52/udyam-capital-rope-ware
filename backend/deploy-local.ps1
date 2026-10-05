# One-command local deploy: builds the React site and assembles everything
# XAMPP needs under C:\xampp\htdocs\udyam  ->  http://localhost/udyam
# Run from the project root:  powershell -ExecutionPolicy Bypass -File backend\deploy-local.ps1
$ErrorActionPreference = "Stop"
$root = Split-Path $PSScriptRoot -Parent
$dest = "C:\xampp\htdocs\udyam"

Write-Host "1/3 Building frontend..." -ForegroundColor Cyan
npm run build --prefix $root | Out-Null

Write-Host "2/3 Assembling $dest ..." -ForegroundColor Cyan
New-Item -ItemType Directory -Force -Path $dest | Out-Null
Copy-Item -Recurse -Force (Join-Path $root "dist\*") $dest
# NOTE: trailing \* copies CONTENTS (without it, Copy-Item nests api/api on redeploy)
New-Item -ItemType Directory -Force -Path (Join-Path $dest "api"), (Join-Path $dest "config"), (Join-Path $dest "lib") | Out-Null
Copy-Item -Recurse -Force (Join-Path $root "backend\api\*") (Join-Path $dest "api")
Copy-Item -Recurse -Force (Join-Path $root "backend\config\*") (Join-Path $dest "config")
Copy-Item -Recurse -Force (Join-Path $root "backend\lib\*") (Join-Path $dest "lib")
Copy-Item -Recurse -Force (Join-Path $root "backend\.htaccess") (Join-Path $dest ".htaccess")
# uploads: create once, never wipe user-uploaded images on redeploy —
# but always refresh its protective .htaccess
New-Item -ItemType Directory -Force -Path (Join-Path $dest "uploads") | Out-Null
Copy-Item -Force (Join-Path $root "backend\uploads\.htaccess") (Join-Path $dest "uploads\.htaccess")
Copy-Item -Force (Join-Path $root "backend\sitemap.php") (Join-Path $dest "sitemap.php")
# admin (phase 2) deploys when it exists
$admin = Join-Path $root "backend\admin"
if (Test-Path -LiteralPath $admin) {
  New-Item -ItemType Directory -Force -Path (Join-Path $dest "admin") | Out-Null
  Copy-Item -Recurse -Force (Join-Path $admin "*") (Join-Path $dest "admin")
}

Write-Host "3/3 Done. Open http://localhost/udyam  (Apache + MySQL running)" -ForegroundColor Green
Write-Host "    API check: http://localhost/udyam/api/content.php?type=settings" -ForegroundColor Green
