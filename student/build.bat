@echo off
for /d %%I in ("%~dp0jdk21\*") do set "JAVA_HOME=%%I"
set "PATH=%JAVA_HOME%\bin;%~dp0maven\apache-maven-3.9.6\bin;%PATH%"
mvn clean compile
