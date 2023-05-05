<html>
<head>
    <title>yo</title>
    <title>Virtual Lending Library</title>
    <style type="type/css">
    </style>

    <script src="https://code.jquery.com/jquery-3.6.4.min.js" integrity="sha256-oP6HI9z1XaZNBrJURtCoUT5SUnxFr8s3BzRl+cbzUq8=" crossorigin="anonymous"></script>
    <script src="../js/jquery.ui.widget.js" type="text/javascript"></script>
    <script src="../js/jquery.iframe-transport.js" type="text/javascript"></script>
    <script src="../js/jquery.fileupload.js" type="text/javascript"></script>
</head>
<body>
    <h1>Virtual Lending Library</h1>
    <!-- <form action="upload.php" method="post" enctype="multipart/form-data">
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
    </form> -->
    <br>
    <br>
    <h1>New one</h1>
    <div id = "uploadArea">
        <input type="file" id="fileupload" name="attachments[]">
        <h1 id="progress1"></h1>
        <h1 id="error"></h1>
    </div>

    <script type="text/javascript">
        $(function () {
            $("#fileupload").fileupload({
                url: 'upload_handler.php',
                dataType: 'json',
                autoUpload: false
            }).on('fileuploadadd', function(e, data) {
                console.log(data)
                var fileSize = data.originalFiles[0]['size'];
                if (fileSize > 209715200) // 200MB in bytes
                    $("#error").html('Your file is too big.')
                else {
                    $("#error").html('');
                    data.submit();
                }
            }).on('fileuploaddone', function(e, data) {
                console.log(data);

            }).on('fileuploadprogressall', function(e, data) {
                var progress = parseInt((data.loaded / data.total) * 100);
                $("#progress1").html("Completed " + progress + "%")

            });
        });
    </script>
</body>
</html>


