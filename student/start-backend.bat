@echo off
echo Starting Student Dashboard Backend (Development Mode)...

:: Find the exact JDK directory dynamically
for /d %%I in ("%~dp0jdk21\*") do set "JAVA_HOME=%%I"

if not defined JAVA_HOME (
    echo [ERROR] Could not find JDK 21 inside %~dp0jdk21.
    pause
    exit /b 1
)

echo Using JAVA_HOME=%JAVA_HOME%
set "PATH=%JAVA_HOME%\bin;%~dp0maven\apache-maven-3.9.6\bin;%PATH%"

call mvn spring-boot:run -Dspring-boot.run.jvmArguments="-Djdk.net.hosts.file=custom_hosts.txt"
pause
