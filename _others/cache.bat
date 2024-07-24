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
    set "extension=%%~xf"

    set "new_filename=!filename:%to_remove%.txt=!"
    set "new_filename=!new_filename!!to_add!!extension!"

    if not "!filename!"=="!new_filename!" (
        ren "%%f" "!new_filename!"
    )
)

endlocal
