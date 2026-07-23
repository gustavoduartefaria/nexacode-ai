@echo off
setlocal
title NexaCode AI
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo Node.js nao foi encontrado.
  echo Instale o Node.js pelo site https://nodejs.org e tente novamente.
  echo.
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo.
  echo Preparando o NexaCode AI pela primeira vez...
  call npm.cmd install
  if errorlevel 1 (
    echo.
    echo Nao foi possivel instalar os componentes.
    pause
    exit /b 1
  )
)

if not exist ".env.local" (
  copy /y ".env.example" ".env.local" >nul
  echo.
  echo O arquivo .env.local foi criado.
  echo Configure as duas URLs do Supabase para ativar cadastro e sincronizacao.
)

findstr /B /C:"SUPABASE_DIRECT_URL=postgres" ".env.local" >nul 2>nul
if not errorlevel 1 (
  echo.
  echo Aplicando migracoes no Supabase...
  call npm.cmd run db:migrate
  if errorlevel 1 (
    echo.
    echo A migracao falhou. Confira a URL direta do Supabase no .env.local.
    pause
    exit /b 1
  )
) else (
  echo.
  echo Supabase ainda nao configurado. O site publico abrira normalmente,
  echo mas cadastro, login e sincronizacao aguardam as URLs no .env.local.
)

echo.
echo Iniciando o NexaCode AI...
echo O aplicativo abrira no navegador em alguns segundos.
if /i not "%NEXACODE_SKIP_BROWSER%"=="1" (
  start "" /min powershell.exe -NoProfile -WindowStyle Hidden -Command "Start-Sleep -Seconds 4; Start-Process 'http://localhost:3147'"
)
call npm.cmd run dev
endlocal
