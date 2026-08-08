param(
    [string]$SourceDir = "."
)

Set-Location $PSScriptRoot
$targetDir = Resolve-Path $SourceDir

$extensions = @("*.jpg", "*.jpeg", "*.webp", "*.bmp", "*.tif", "*.tiff", "*.gif", "*.avif")
$files = foreach ($ext in $extensions) {
    Get-ChildItem -Path $targetDir -Filter $ext -File -ErrorAction SilentlyContinue
}

if (-not $files) {
    Write-Host "No convertible image files found in $targetDir"
    exit 0
}

$magick = Get-Command magick -ErrorAction SilentlyContinue
if (-not $magick) {
    Write-Error "ImageMagick (magick) is not installed. Install from https://imagemagick.org then rerun this script."
    exit 1
}

foreach ($file in $files) {
    $outFile = [System.IO.Path]::ChangeExtension($file.FullName, ".png")
    & magick "$($file.FullName)" -strip -quality 90 "$outFile"
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Converted: $($file.Name) -> $([System.IO.Path]::GetFileName($outFile))"
    } else {
        Write-Warning "Failed: $($file.Name)"
    }
}
