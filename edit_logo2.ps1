Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile((Get-Item "logo.png").FullName)
$bmp = new-object System.Drawing.Bitmap($img)
$img.Dispose()

for ($x = 0; $x -lt 1024; $x++) {
    $refColor = $bmp.GetPixel($x, 750)
    for ($y = 751; $y -lt 916; $y++) {
        $dx = $x - 512
        $dy = $y - 512
        $r2 = $dx * $dx + $dy * $dy
        if ($r2 -lt (398 * 398)) {
            $bmp.SetPixel($x, $y, $refColor)
        }
    }
}
$bmp.Save("logo_new2.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
