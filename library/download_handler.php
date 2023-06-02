<?php
    if (isset($_GET['filename']) && isset($_GET['boxNumber'])) {
        $filename = basename($_GET['filename']);  // sanitize filename
        $boxNumber = intval($_GET['boxNumber']);  // sanitize boxNumber to ensure it is an integer
        $filepath = '/var/www/html/freewaterhouse/library/uploaded_files/box' . $boxNumber . '/' . $filename;

        if (file_exists($filepath)) {
            header('Content-Description: File Transfer');
            header('Content-Type: application/octet-stream');
            header('Content-Disposition: attachment; filename="' . basename($filepath) . '"');
            header('Expires: 0');
            header('Cache-Control: must-revalidate');
            header('Pragma: public');
            header('Content-Length: ' . filesize($filepath));

            readfile($filepath);
            exit();
        }
    }
?>
