<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['file'])) {
	$filename = $_FILES['file']['name'];
	$filepath = 'uploaded_files/' . $filename;
	
	if (move_uploaded_file($_FILES['file']['tmp_name'], $filepath)) {
		echo $filename;
		exit;
	}
}

http_response_code(500);
exit;