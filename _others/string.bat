setlocal enabledelayedexpansion

set "target_folder=..\assets\project"
cd /d "%target_folder%"

set "filename=ciao___testo"

set "word=___ciao"
call set filename=%%filename:___testo=%word%%%
echo %filename%

pause
