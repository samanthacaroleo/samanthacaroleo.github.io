@echo off
setlocal enabledelayedexpansion

cd ..\assets\
set /p old_id=<incId.txt
set /a new_id=%old_id%+1
> incId.txt (
    echo|set /p=!new_id!
)

set "to_remove=___%old_id%"
set "to_add=___%new_id%"


set "filename=style___%old_id%.css"
set "new_filename=!filename:%to_remove%=%to_add%!"
if not "%filename%"=="%new_filename%" (
    ren "%filename%" "%new_filename%"
)


cd project\
for /r %%f in (*) do (
    set "filename=%%~nxf"
    set "new_filename=!filename:%to_remove%=%to_add%!"
    if not "!filename!"=="!new_filename!" (
        ren "%%f" "!new_filename!"
    )
)


cd ..\..
cmd /c _others\jreplace "\bmain%to_remove%.js\b" "main%to_add%.js" /f index.html /o -
cmd /c _others\jreplace "\bindex%to_remove%.js\b" "index%to_add%.js" /f index.html /o -
cmd /c _others\jreplace "\bstyle%to_remove%.css\b" "style%to_add%.css" /f index.html /o -

cmd /c _others\jreplace "\bmain%to_remove%.js\b" "main%to_add%.js" /f project.html /o -
cmd /c _others\jreplace "\bproject%to_remove%.js\b" "project%to_add%.js" /f project.html /o -
cmd /c _others\jreplace "\bstyle%to_remove%.css\b" "style%to_add%.css" /f project.html /o -

cd assets\js
for /r %%f in (*) do (
    set "filename=%%~nxf"
    set "new_filename=!filename:%to_remove%=%to_add%!"
    if not "!filename!"=="!new_filename!" (
        ren "%%f" "!new_filename!"
    )
)

cd ../..
set to_delete="docs"
del /Q %to_delete%\*
for /D %%p in (%to_delete%\*) do rmdir /S /Q "%%p"

copy "404.html" "docs\404.html"
copy "index.html" "docs\index.html"
copy "project.html" "docs\project.html"
xcopy "assets" "docs/assets" /E /H /C /I

CMD /C git fetch
CMD /C git pull
CMD /C git add -A
CMD /C git commit -a -m "S-deploy"
CMD /C git push

endlocal