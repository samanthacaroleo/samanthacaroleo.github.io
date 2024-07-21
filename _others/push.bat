@echo off

CMD /C git fetch
CMD /C git pull
CMD /C git add -A
CMD /C git commit -a -m "sam"
CMD /C git push