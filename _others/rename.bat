setlocal enabledelayedexpansion

set "target_folder=test"
cd /d "%target_folder%"

for /r %%f in (*) do (
    set "fullpath=%%f"
    set "dirname=%%~dpf"
    set "filename=%%~nf"
    set "extension=%%~xf"
    ren "!fullpath!" "!filename!___1!extension!"
    pause
)

endlocal