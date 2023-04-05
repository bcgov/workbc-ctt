$appCmd = "C:\Windows\system32\inetsrv\appcmd.exe"
$appcmd_args = "start", "appPool", $args[0]
& $appCmd $appcmd_args
$appcmd_args = "start", "appPool", $args[1]
& $appCmd $appcmd_args