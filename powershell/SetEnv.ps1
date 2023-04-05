$appPath = $args[0]
$dbStr = $arg[1]
$filePath = $arg[2]
$siteUrl = $arg[3]
$pathToJson = $appPath + "\API\appsettings.json"


$a = Get-Content $pathToJson | ConvertFrom-Json
$a.ConnectionStrings.Database = $dbStr
$a | ConvertTo-Json -depth 32| set-content $pathToJson


$a = Get-Content $pathToJson | ConvertFrom-Json
$a.ImageCarouselNOCConfigLocalPath = $filePath + "\BusinessConfiguration\ImageCarouselNOCs.txt"
$a.SharedImagesProfilesLocalPath= $filePath + "\ProfileImages"
$a.SharedImagesBackgroundsLocalPath= $filePath + "\BackgroundImages"
$a.SharedImagesProfilesBaseURL= $siteUrl + "/careertransitiontool/profileimages/"
$a.SharedImagesBackgroundsBaseURL= $siteUrl + "/careertransitiontool/backgroundimages/"
$a | ConvertTo-Json -depth 32| set-content $pathToJson