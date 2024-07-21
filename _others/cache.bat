setlocal enabledelayedexpansion

set "target_folder=..\assets\project"
cd /d "%target_folder%"

set /p old_id=<incremental_id.txt
set /a new_id=%numero%+1
echo %new_id% > incremental_id.txt

%@Try%
    for /r %%f in (*) do (
        set "fullpath=%%f"
        set "dirname=%%~dpf"
        set "filename=%%~nf"
        set "extension=%%~xf"



        for /f "tokens=1* delims=___" %%a in ("%filename%") do (
            set "result=%%a"
        )

        ren "!fullpath!" "!result!___!new_id!!extension!"
    )
%@EndTry%

:@Catch
  echo errore
  pause
:@EndCatch

endlocal