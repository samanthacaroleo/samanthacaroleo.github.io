@echo off
setlocal enabledelayedexpansion

set "target_folder=..\assets\"
cd /d "%target_folder%"


set /p numero=<incId.txt
set /a nuovo_numero=%numero%+1
echo %nuovo_numero% > incId.txt
