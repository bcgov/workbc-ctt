$pathPrefix = $args[0]
$pathSuffix = "\WorkBC Career Transition Tool WEB/careerTransitionTool\.env.production"
$filepath = Join-Path $pathPrefix $pathSuffix
Write-Output $filepath
$publicUrl = "GATSBY_PUBLIC_URL=./"
$apiUrl = "GATSBY_API_URL=./api"
$carouselNoc = "CAROUSEL_IMAGES=21111,21233"
Add-Content $filepath $publicUrl
Add-Content $filepath $apiUrl
Add-Content $filepath $carouselNoc