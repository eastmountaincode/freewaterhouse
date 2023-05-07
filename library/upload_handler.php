<?php

    if (isset($_FILES['attachments'])) {
        $msg = "";

        $upload_directory = '/var/www/html/freewaterhouse/library/uploaded_files/box_1/';
        $filename = basename($_FILES['attachments']['name'][0]);
        $targetFile = $upload_directory . $filename;

        if (file_exists($targetFile))
            $msg = array("status" => 0, "msg" => "File already exists!");
        else if (move_uploaded_file($_FILES['attachments']['tmp_name'][0], $targetFile))
            $msg = array("status" => 1, "msg" => "File Has Been Uploaded", "path" => $targetFile);
        else
            $msg = array("status" => -2, "msg" => "File upload failed", "error" => error_get_last());
        
        echo json_encode($msg);
        
    } else {
        // Default JSON response when no file is uploaded
        $msg = array("status" => -1, "msg" => "No file received.");
        echo json_encode($msg);
        
    }
?>