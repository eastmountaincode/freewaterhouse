<html>
<head>
    <title>Virtual Free Little Library</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="stylesheet.css">
</head>
<body>
    <br>
    <h3>
        <pre>
█░█ █ █▀█ ▀█▀ █░█ ▄▀█ █░░
▀▄▀ █ █▀▄ ░█░ █▄█ █▀█ █▄▄

█░░ █ ▀█▀ ▀█▀ █░░ █▀▀
█▄▄ █ ░█░ ░█░ █▄▄ ██▄

█▀▀ █▀█ █▀▀ █▀▀  
█▀░ █▀▄ ██▄ ██▄  

█░░ █ █▄▄ █▀█ ▄▀█ █▀█ █▄█
█▄▄ █ █▄█ █▀▄ █▀█ █▀▄ ░█░
        </pre>
    </h3>


    
    <!-- <img class="book_shelf" src="../images/book_shelf.png" alt="some books"> -->
    <br>
    <div class="library_wrapper">
        <div class="library">
            <div class="roof"></div>
            <table>
                <tr>
                    <td>
                        <div id = "uploadArea1">
                            <h3>
                            <pre>                     
█▄▄ █▀█ ▀▄▀   █▀█ █▄░█ █▀▀
█▄█ █▄█ █░█   █▄█ █░▀█ ██▄
                            </pre>
                            </h3>
                            <div id="fileInfo1"></div>
                            <br>
                            <div class="buttonDiv">
                                <input type="file" id="fileSelect1" name="attachments[]">
                                <button id="uploadButton1" disabled>Upload</button>
                                <button id="downloadButton1" disabled>Download</button>
                            </div>
                            <div id="uploadProgressBar1" style="width: 0%; height: 20px; background: green;"></div>
                            <p id="progressPercent1"></p>
                            <p id="uploadSuccessMessage1"></p>
                            <p id="error1"></p>
                        </div>
                    </td>
                    <td>
                        <div id = "uploadArea2">
                            <h3>
                            <pre>
█▄▄ █▀█ ▀▄▀   ▀█▀ █░█░█ █▀█
█▄█ █▄█ █░█   ░█░ ▀▄▀▄▀ █▄█
                            </pre>
                            </h3>
                            <div id="fileInfo2"></div>
                            <br>
                            <div class="buttonDiv">
                                <input type="file" id="fileSelect2" name="attachments[]">
                                <button id="uploadButton2" disabled>Upload</button>
                                <button id="downloadButton2" disabled>Download</button>
                            </div>
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
                            <h3>
                            <pre>
█▄▄ █▀█ ▀▄▀   ▀█▀ █░█ █▀█ █▀▀ █▀▀
█▄█ █▄█ █░█   ░█░ █▀█ █▀▄ ██▄ ██▄
                            </pre>
                            </h3>
                            <div id="fileInfo3"></div>
                            <br>
                            <div class="buttonDiv">
                                <input type="file" id="fileSelect3" name="attachments[]">
                                <button id="uploadButton3" disabled>Upload</button>
                                <button id="downloadButton3" disabled>Download</button>
                            </div>
                            <div id="uploadProgressBar3" style="width: 0%; height: 20px; background: green;"></div>
                            <p id="progressPercent3"></p>
                            <p id="uploadSuccessMessage3"></p>
                            <p id="error3"></p>
                        </div>
                    </td>
                    <td>
                        <div id = "uploadArea4">
                            <h3>
                            <pre>
█▄▄ █▀█ ▀▄▀   █▀▀ █▀█ █░█ █▀█
█▄█ █▄█ █░█   █▀░ █▄█ █▄█ █▀▄
                            </pre>
                            </h3>
                            <div id="fileInfo4"></div>
                            <br>
                            <div class="buttonDiv">
                                <input type="file" id="fileSelect4" name="attachments[]">
                                <button id="uploadButton4" disabled>Upload</button>
                                <button id="downloadButton4" disabled>Download</button>
                            </div>
                            <div id="uploadProgressBar4" style="width: 0%; height: 20px; background: green;"></div>
                            <p id="progressPercent4"></p>
                            <p id="uploadSuccessMessage4"></p>
                            <p id="error4"></p>
                        </div>
                    </td>

                </tr>
            </table>
            <div class="trunk"></div>
        </div>
    </div>
    <br>
    <br>
    <a href="#" id="toggleButton">About↓↓↓</a>
    <div id="more">
        Like a <a href="https://littlefreelibrary.org/">Little Free Library</a>, but on the internet! 
        Leave a song, poem, pdf, movie, zip file, whatever! Check out what other people have left, 
        but remember, if you download the file it will be removed from the box, just like in real life.
    </div>
    <br>
    <br>

    <script src="main.js"></script>

</body>
</html>



