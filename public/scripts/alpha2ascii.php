<?php

// alpha2ascii
// -----------
// convert pixel art in 1-bit PNG format to a flat ASCII representation
// magic bitwise constants via http://php.net/manual/en/function.imagecolorat.php

$filename = "f1.png";

$im = imagecreatefrompng($filename);
$w = imagesx($im);
$h = imagesy($im);
$r = $g = $b = $a = 0;  // red, green, blue, alpha
$data = "";

for($y = 0; $y < $h; $y++) {
	for($x = 0; $x < $w; $x++) {

		$rgb = imagecolorat($im, $x, $y);
		$r = ($rgb >> 16) & 0xFF;
		$g = ($rgb >> 8) & 0xFF;
		$b = $rgb & 0xFF;
		$a = ($rgb & 0x7F000000) >> 24;

		$data .= ($a > 0) ? " " : "#";

	}
	$data .= "\n";
}

file_put_contents($filename . ".txt", $data);

echo $data;
