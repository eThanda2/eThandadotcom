Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile((Get-Item "logo.png").FullName)
$bmp = new-object System.Drawing.Bitmap($img)
$img.Dispose()

$fillColor = [System.Drawing.Color]::FromArgb(255, 0, 20, 48)

for ($x = 0; $x -lt 1024; $x++) {
    for ($y = 753; $y -lt 915; $y++) {
        $dx = $x - 512
        $dy = $y - 512
        $r2 = $dx * $dx + $dy * $dy
        if ($r2 -lt (396 * 396)) {
            $bmp.SetPixel($x, $y, $fillColor)
        }
    }
}
$bmp.Save("logo_new3.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
