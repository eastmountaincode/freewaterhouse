<html>
<head>
    <title>Virtual Lending Library</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style type="text/css">
        table {
            border-collapse: collapse;
            width: 100%;
        }

        th, td {
            border: 1px solid black;
            padding: 15px;
            text-align: left;
        }

        #uploadArea1, #uploadArea2, #uploadArea3, #uploadArea4 {
            padding: 10px;
        }

        h1 {
            text-align: center;
        }
        .library {
            position: relative;
            width: 100%;
        }

        .library::before {
            content: '';
            position: absolute;
            top: 0;
            width: 100%;
            height: 0;
            border-bottom: 50px solid #f00; /* Adjust color to match your design */
            border-left: 50px solid transparent;
            border-right: 50px solid transparent;
        }


        /* Style changes when the viewport is 600px or less */
        @media screen and (max-width: 600px) {
            table, thead, tbody, th, td, tr { 
                display: block; 
            }
            /* Hide table headers (but not display: none;, for accessibility) */
            thead tr { 
                position: absolute;
                top: -9999px;
                left: -9999px;
            }
            tr { 
                /* border: 1px solid #ccc; */
            }
            
            td { 
                /* Behave like a "row" */
                border: 1px solid black;
                text-align: left;
                padding: 15px;
                /* border-bottom: 1px solid #eee; */
                position: relative;
                /* padding-left: 50%; */
            }
        }
    </style>
</head>
<body>
    <h1>(Virtual) Little Free Library</h1>
    <br>
    <div class="library">
        <table>
            <tr>
                <td>
                    <div id = "uploadArea1">
                        <h1>Box 1</h1>
                        <div id="fileInfo1"></div>
                        <input type="file" id="fileSelect1" name="attachments[]">
                        <button id="uploadButton1" disabled>Upload</button>
                        <button id="downloadButton1" disabled>Download</button>
                        <div id="uploadProgressBar1" style="width: 0%; height: 20px; background: green;"></div>
                        <p id="progressPercent1"></p>
                        <p id="uploadSuccessMessage1"></p>
                        <p id="error1"></p>
                    </div>
                </td>
                <td>
                    <div id = "uploadArea2">
                        <h1>Box 2</h1>
                        <div id="fileInfo2"></div>
                        <input type="file" id="fileSelect2" name="attachments[]">
                        <button id="uploadButton2" disabled>Upload</button>
                        <button id="downloadButton2" disabled>Download</button>
                        <div id="uploadProgressBar2" style="width: 0%; height: 20px; background: green;"></div>
                        <p id="progressPercent2"></p>
                        <p id="uploadSuccessMessage2"></p>
                        <p id="error2"></p>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div id = "uploadArea3">
                        <h1>Box 3</h1>
                        <div id="fileInfo3"></div>
                        <input type="file" id="fileSelect3" name="attachments[]">
                        <button id="uploadButton3" disabled>Upload</button>
                        <button id="downloadButton3" disabled>Download</button>
                        <div id="uploadProgressBar3" style="width: 0%; height: 20px; background: green;"></div>
                        <p id="progressPercent3"></p>
                        <p id="uploadSuccessMessage3"></p>
                        <p id="error3"></p>
                    </div>
                </td>
                <td>
                    <div id = "uploadArea4">
                        <h1>Box 4</h1>
                        <div id="fileInfo4"></div>
                        <input type="file" id="fileSelect4" name="attachments[]">
                        <button id="uploadButton4" disabled>Upload</button>
                        <button id="downloadButton4" disabled>Download</button>
                        <div id="uploadProgressBar4" style="width: 0%; height: 20px; background: green;"></div>
                        <p id="progressPercent4"></p>
                        <p id="uploadSuccessMessage4"></p>
                        <p id="error4"></p>
                    </div>
                </td>

            </tr>
        </table>
    </div>

    <script src="main.js"></script>

</body>
</html>



