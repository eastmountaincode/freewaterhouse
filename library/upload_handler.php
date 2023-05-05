<?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    header('Content-Type: application/json');

    if (isset($_FILES['attachments'])) {
        $msg = "";
        $targetFile = "uploaded_files/box_1/" . basename($_FILES['attachments']['name'][0]);
        if (file_exists($targetFile))
            $msg = array("status" => 0, "msg" => "File already exists!");
        else if (move_uploaded_file($_FILES['attachments']['tmp_name'][0], $targetFile))
            $msg = array("status" => 1, "msg" => "File Has Been Uploaded", "path" => $targetFile);
        echo json_encode($msg);
        
    } else {
        // Default JSON response when no file is uploaded
        $msg = array("status" => -1, "msg" => "No file received.");
        echo json_encode($msg);
        
    }
?>