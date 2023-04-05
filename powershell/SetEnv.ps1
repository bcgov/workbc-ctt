$appPath = $args[0]
#$dbStr = $args[1]
$filePath = $args[1]
$siteUrl = $args[2]
$dbServer = $args[3]
$database = $args[4]
$dbUser = $args[5]
$dbPwd = $args[6]
$pathToJson = $appPath + "\API\appsettings.json"


$content = Get-Content $pathToJson | ConvertFrom-Json
#$content.ConnectionStrings.Database = $dbStr
$content.ConnectionStrings.Database = "Server=$dbServer;Database=$database;User Id=$dbUser;Password=$dbPwd"
#$content | ConvertTo-Json -depth 32| set-content $pathToJson


#$content = Get-Content $pathToJson | ConvertFrom-Json
$content.ImageCarouselNOCConfigLocalPath = $filePath + "\BusinessConfiguration\ImageCarouselNOCs.txt"
$content.SharedImagesProfilesLocalPath= $filePath + "\ProfileImages"
$content.SharedImagesBackgroundsLocalPath= $filePath + "\BackgroundImages"
$content.SharedImagesProfilesBaseURL= $siteUrl + "/careertransitiontool/profileimages/"
$content.SharedImagesBackgroundsBaseURL= $siteUrl + "/careertransitiontool/backgroundimages/"
$content | ConvertTo-Json -depth 32| set-content $pathToJson
