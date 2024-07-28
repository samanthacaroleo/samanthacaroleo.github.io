setlocal enabledelayedexpansion

cd ..\assets\
set /p old_id=<incId.txt
set /a new_id=%old_id%+1
set "to_remove=___%old_id%"
set "to_add=___%new_id%"

cd ..
cmd /c _others\jreplace "\bmain%to_remove%.js\b" "main%to_add%.js" /f index.html /o -
cmd /c _others\jreplace "\bproject%to_remove%.js\b" "project%to_add%.js" /f project.html /o -
cmd /c _others\jreplace "\bmain%to_remove%.js\b" "main%to_add%.js" /f project.html /o -
cmd /c _others\jreplace "\bindex%to_remove%.js\b" "index%to_add%.js" /f index.html /o -


cd assets\js

for /r %%f in (*) do (
    set "filename=%%~nxf"

    set "new_filename=!filename:%to_remove%=%to_add%!"

    if not "!filename!"=="!new_filename!" (
        ren "%%f" "!new_filename!"
    )
)


endlocal
