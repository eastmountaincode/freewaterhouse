<?php
// Get the file name from the query parameter
$fileName = $_GET['filename'];

// Set the headers to force a download
header('Content-Type: application/octet-stream');
header('Content-Disposition: attachment; filename="'.$fileName.'"');

// Output the file contents
readfile('../uploaded_files/'.$fileName);

// Delete the file from the server
unlink('../uploaded_files/'.$fileName);
?>