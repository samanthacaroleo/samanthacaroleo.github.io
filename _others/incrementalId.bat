@echo off
setlocal enabledelayedexpansion

set "target_folder=..\assets\project"
cd /d "%target_folder%"


set /p numero=<incremental_id.txt
set /a nuovo_numero=%numero%+1
echo %nuovo_numero% > incremental_id.txt
