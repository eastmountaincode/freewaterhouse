<?php
// Get the file name and URL from the POST request
$fileName = $_POST['filename'];
$fileUrl = $_POST['fileurl'];

// Create a file handle for the new file
$fh = fopen('../uploaded_files/'.$fileName, 'wb');

// Download the file from the URL and save it to the new file
$ch = curl_init($fileUrl);
curl_setopt($ch, CURLOPT_FILE, $fh);
curl_exec($ch);
curl_close($ch);
fclose($fh);

// Return a success message
echo 'File saved successfully.';
?>