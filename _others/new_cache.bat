setlocal enabledelayedexpansion


set "target_folder=..\assets\"
cd ..\assets\

set /p old_id=<incId.txt
set /a new_id=%old_id%+1
echo %new_id% > incId.txt

set "target_folder=..\_others\test\"
cd "%target_folder%"

for /r %%f in (*) do (
    set "fullpath=%%f"
    set "dirname=%%~dpf"
    set "filename=%%~nf"
    set "extension=%%~xf"

    set newPath=%*
    set "oldPath=___%old_id%"
    set "newfilename=!filename:%oldPath% =!"

    ren "!fullpath!" "!newfilename!___%new_id%"
    pause
)

endlocal

