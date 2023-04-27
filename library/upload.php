<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['file'])) {
	$filename = $_FILES['file']['name'];
	$location = 'uploaded_files/'.$filename;

	if (move_uploaded_file($_FILES['file']['tmp_name'], $location)) {
		http_response_code(200);
		exit;
	}
}

http_response_code(500);
exit;