setlocal enabledelayedexpansion

set "target_folder=..\assets\project"
cd /d "%target_folder%"

set /p old_id=<incremental_id.txt
set /a new_id=%numero%+1
echo %new_id% > incremental_id.txt

for /r %%f in (*) do (
    set "fullpath=%%f"
    set "dirname=%%~dpf"
    set "filename=%%~nf"
    set "extension=%%~xf"

    set "word=___%new_id%"
    call set filename=%%_filename:___%old_id%=%word%%%
    
    call set filename=%%filename:___testo=%word%%%
    echo %filename%

    ren %fullpath% %filename%%extension%
)

endlocal

pause