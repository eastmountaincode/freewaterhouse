<?php
$test_file = '/var/www/html/freewaterhouse/library/uploaded_files/box_1/test.txt';

$file_handle = fopen($test_file, 'w');
if ($file_handle === false) {
    echo "Unable to create the test file.";
} else {
    fwrite($file_handle, 'Hello, World!');
    fclose($file_handle);
    echo "Test file created successfully.";
}
?>
