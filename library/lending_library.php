<html>
<head>
    <title>Virtual Lending Library</title>
    <style type="text/css">
    </style>
</head>
<body>
    <h1>Virtual Lending Library</h1>
    <br>
    <h1>New one</h1>
    <div id = "uploadArea">
        <input type="file" id="fileupload" name="attachments[]">
        <h1 id="progress1"></h1>
        <h1 id="error"></h1>
        <h1 id="files"></h1>
        <button id="uploadButton" disabled>Upload</button>
    </div>

    <script type="text/javascript">
        document.getElementById("fileupload").addEventListener("change", function(e) {
            var file = e.target.files[0];
            if (!file) {
                console.log("No file chosen");
                return;
            }

            // Check file size
            if (file.size > 209715200) { // 200MB in bytes
                document.getElementById("error").innerText = 'Your file is too big.'
                return;
            } else {
                document.getElementById("error").innerText = '';
            }

            // Create new formData instance
            var formData = new FormData();
            formData.append("attachments[]", file);

            // Fetch API to send the file
            fetch('upload_handler.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                var status = data.status;
                var msg = data.msg;

                if (status == 1) {
                    document.getElementById("files").innerText = 'got one';
                } else {
                    document.getElementById("error").innerText = 'error message down below!!';
                }
            })
            .catch(error => {
                console.log('File upload failed');
                console.log(error);
            });
        });
    </script>
</body>
</html>



