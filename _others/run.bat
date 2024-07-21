@echo off

CMD /C git fetch
CMD /C git pull

cd ..
start http://localhost:8000/
cmd /C python -m http.server