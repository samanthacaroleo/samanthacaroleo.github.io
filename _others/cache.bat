@echo off
setlocal enabledelayedexpansion

cd ..\assets\
set /p old_id=<incId.txt
set /a new_id=%old_id%+1
> incId.txt (
    echo|set /p=!new_id!
)

cd project\
set "to_remove=___%old_id%"
set "to_add=___%new_id%"

for /r %%f in (*) do (
    set "filename=%%~nxf"

    set "new_filename=!filename:%to_remove%=%to_add%!"

    if not "!filename!"=="!new_filename!" (
        ren "%%f" "!new_filename!"
    )
)

endlocal
