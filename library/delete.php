<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['filename'])) {
	$filename = $_POST['filename'];
	$filepath = 'uploaded_files/' . $filename;
	
	if (file_exists($filepath)) {
		unlink($filepath);
	}
}

exit;