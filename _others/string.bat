setlocal enabledelayedexpansion

set "filename=ciao___testo"

set "word=___ciao"
call set filename=%%filename:___testo=%word%%%
echo %filename%

pause
