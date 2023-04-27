<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['file'])) {
	$filename = $_FILES['file']['name'];
	$fileExt = pathinfo($filename, PATHINFO_EXTENSION);
	$newFilename = uniqid().'.'.$fileExt;
	$location = 'uploaded_files/'.$newFilename;

	if (move_uploaded_file($_FILES['file']['tmp_name'], $location)) {
		http_response_code(200);
		header('X-Filename: '.$newFilename);
		exit;
	}
}

http_response_code(500);
exit;
