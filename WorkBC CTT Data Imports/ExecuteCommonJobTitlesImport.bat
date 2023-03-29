for /f "tokens=1-4 delims=/ " %%i in ("%date%") do set datestring=%%i-%%j-%%k
"C:\Program Files (x86)\Microsoft SQL Server\150\DTS\Binn\dtexec" /F "%~dp0.\CommonJobTitles_ImportJob.dtsx" /De c0NNect5 /Conf "CommonJobTitlesImport.dtsConfig" >> "JobTitlesResult_%datestring%.log"
:pause