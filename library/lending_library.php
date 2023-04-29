<!DOCTYPE html>
<html>
<head>
    <title>Virtual Lending Library</title>
</head>
<body>
    <h1>Virtual Lending Library</h1>
    <form action="upload.php" method="post" enctype="multipart/form-data">
        <?php
        $target_dir = "uploaded_files/";
        $files = array_diff(scandir($target_dir), array('.', '..', '.gitkeep'));
        
        if (!empty($files)) {
            $filename = array_pop($files); // Get the last file in the array (you can change this logic if needed)
            echo "<p>Current file in the box:</p>";
            echo "<p><a href=\"" . $target_dir . htmlspecialchars($filename) . "\">" . htmlspecialchars($filename) . "</a></p>";
        } else {
            echo "<p>Box is empty.</p>";
            echo "<input type=\"file\" name=\"fileToUpload\" id=\"fileToUpload\">";
            echo "<input type=\"submit\" value=\"Upload File\" name=\"submit\">";
        }
        ?>
    </form>
</body>
</html>


