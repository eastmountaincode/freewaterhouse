<!DOCTYPE html>
<html>
<head>
    <title>Virtual Lending Library</title>
    <script>
        function uploadFile(event) {
            event.preventDefault();
            
            var formData = new FormData(event.target);
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "upload.php", true);
            xhr.onreadystatechange = function() {
                console.log("Ready state: " + xhr.readyState);
                console.log("Status: " + xhr.status);
                if (xhr.readyState === 4 && xhr.status === 200) {
                    location.reload(); // Reload the page to update the file list
                }
            };
            xhr.send(formData);
        }
    </script>
</head>
<body>
    <h1>Virtual Lending Library</h1>
    <form onsubmit="uploadFile(event)" method="post" enctype="multipart/form-data">
        <?php
        $target_dir = "uploaded_files/";
        $files = array_diff(scandir($target_dir), array('.', '..', '.gitkeep'));
        
        if (!empty($files)) {
            $filename = array_pop($files);
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


