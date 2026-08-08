#!/usr/bin/env pwsh
# Applica le variabili da railway.env.local su Railway (richiede Railway CLI + login).
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$envFile = Join-Path $root 'railway.env.local'

if (-not (Test-Path $envFile)) {
  node (Join-Path $root 'scripts/generate-railway-secrets.js')
}

if (-not (Get-Command railway -ErrorAction SilentlyContinue)) {
  Write-Host 'Railway CLI non installata. Installa: npm i -g @railway/cli'
  Write-Host "Poi esegui: railway login && railway link"
  Write-Host "Copia manualmente le variabili da: $envFile"
  exit 1
}

Get-Content $envFile | ForEach-Object {
  if ($_ -match '^\s*#' -or $_ -match '^\s*$') { return }
  if ($_ -match '^([^=]+)=(.*)$') {
    $name = $Matches[1].Trim()
    $value = $Matches[2].Trim()
    Write-Host "Setting $name ..."
    railway variables set "${name}=${value}"
  }
}

Write-Host 'Fatto. Verifica in Railway → Variables.'
