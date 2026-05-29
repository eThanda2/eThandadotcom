Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile((Get-Item "logo.png").FullName)
$bmp = new-object System.Drawing.Bitmap($img)
$img.Dispose()

for ($x = 0; $x -lt 1024; $x++) {
    $refColor = $bmp.GetPixel($x, 680)
    for ($y = 681; $y -lt 915; $y++) {
        $dx = $x - 512
        $dy = $y - 512
        $r2 = $dx * $dx + $dy * $dy
        if ($r2 -lt (396 * 396)) {
            $bmp.SetPixel($x, $y, $refColor)
        }
    }
}
$bmp.Save("logo_final.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
