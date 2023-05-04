<!DOCTYPE html>
<html>
<head>
    <title>yo</title>
    <title>Virtual Lending Library</title>
    <style type="type/css">
    </style>
</head>
<body>
    <h1>Virtual Lending Library</h1>
    <form action="upload.php" method="post" enctype="multipart/form-data">
        <?php
        $target_dir = "uploaded_files/box1/";
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
    <br>
    <br>
    <h1>New one</h1>
    <div id = "uploadArea">
        <input type="file" id="fileupload" name="attachments[]">
        <h1 id="progress1"></h1>
    </div>

    <script type="text/javascript">
        $(function () {
            $("#fileupload").fileupload({
                url: 'lending_library.php',
                dataType: 'json',
                autoUpload: false
            }).on('fileuploadadd', function(e, data) {
                console.log(data);
            }).on('fileuploaddone', function(e, data) {

            }).on('fileuploadprogressall', function(e, data) {

            });
        });
    </script>

    <script src="https://code.jquery.com/jquery-3.6.4.min.js" integrity="sha256-oP6HI9z1XaZNBrJURtCoUT5SUnxFr8s3BzRl+cbzUq8=" crossorigin="anonymous"></script>
    <script src="../js/vendor/jquery.ui.widget.js" type="text/javascript"></script>
    <script src="../js/vendor/jquery.ui.widget.js" type="text/javascript"></script>
</body>
</html>


