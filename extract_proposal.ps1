$path = 'c:/Users/TechCharities/OneDrive/Web Frontend development 1/wdd231/finalproject/Website Project Proposal-PAVI Projects.docx'
Add-Type -AssemblyName System.IO.Compression.FileSystem
$archive = [System.IO.Compression.ZipFile]::OpenRead($path)
$entry = $archive.GetEntry('word/document.xml')
$reader = New-Object System.IO.StreamReader($entry.Open())
$xml = $reader.ReadToEnd()
$reader.Dispose()
$archive.Dispose()
$xml = [regex]::Replace($xml, '<[^>]+>', ' ')
$xml = [regex]::Replace($xml, '\s+', ' ')
$xml = $xml.Trim()
Write-Output $xml.Substring(0, [Math]::Min(40000, $xml.Length))
