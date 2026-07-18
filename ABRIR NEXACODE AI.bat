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

echo.
echo Iniciando o NexaCode AI...
echo O aplicativo abrira no navegador em alguns segundos.
if /i not "%NEXACODE_SKIP_BROWSER%"=="1" (
  start "" /min powershell.exe -NoProfile -WindowStyle Hidden -Command "Start-Sleep -Seconds 4; Start-Process 'http://localhost:3147'"
)
call npm.cmd run dev
endlocal
