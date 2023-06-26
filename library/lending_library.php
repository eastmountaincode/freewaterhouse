<?php
session_start();
if(isset($_GET['logout'])){    
    
    //Simple exit message 
    $logout_message = "<div class='msgln'><span class='left-info'>User <b class='user-name-left'>". $_SESSION['name'] ."</b> has left the chat session.</span><br></div>";
    file_put_contents("log.html", $logout_message, FILE_APPEND | LOCK_EX);
    
    session_destroy();
    header("Location: index.php"); //Redirect the user 
}
if(isset($_POST['enter'])){
    if($_POST['name'] != ""){
        $_SESSION['name'] = stripslashes(htmlspecialchars($_POST['name']));
    }
    else{
        echo '<span class="error">Please type in a name</span>';
    }
}
function loginForm(){
    echo 
    '<div id="loginform"> 
<p>Please enter your name to continue!</p> 
<form action="index.php" method="post"> 
<label for="name">Name &mdash;</label> 
<input type="text" name="name" id="name" /> 
<input type="submit" name="enter" id="enter" value="Enter" /> 
</form> 
</div>';
}
?>

<!DOCTYPE html>
<html lang="en">
    <title>Virtual Little Free Library</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="stylesheet.css">
</head>
<body>
<?php
if(!isset($_SESSION['name'])){
    loginForm();
} else {
    ?>
    <div id="wrapper">
        <div id="menu">
            <p class="welcome">Welcome, <b><?php echo $_SESSION['name']; ?></b></p>
            <p class="logout"><a id="exit" href="#">Exit Chat</a></p>
        </div>
        <div id="chatbox">
        <?php
        if(file_exists("log.html") && filesize("log.html") > 0){
            $contents = file_get_contents("log.html");          
            echo $contents;
        }
        ?>
        </div>
        <form name="message" action="">
            <input name="usermsg" type="text" id="usermsg" />
            <input name="submitmsg" type="submit" id="submitmsg" value="Send" />
        </form>
    </div>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script type="text/javascript">
        // jQuery Document 
        $(document).ready(function () {
            $("#submitmsg").click(function () {
                var clientmsg = $("#usermsg").val();
                $.post("post.php", { text: clientmsg });
                $("#usermsg").val("");
                return false;
            });
            function loadLog() {
                var oldscrollHeight = $("#chatbox")[0].scrollHeight - 20; //Scroll height before the request 
                $.ajax({
                    url: "log.html",
                    cache: false,
                    success: function (html) {
                        $("#chatbox").html(html); //Insert chat log into the #chatbox div 
                        //Auto-scroll 
                        var newscrollHeight = $("#chatbox")[0].scrollHeight - 20; //Scroll height after the request 
                        if(newscrollHeight > oldscrollHeight){
                            $("#chatbox").animate({ scrollTop: newscrollHeight }, 'normal'); //Autoscroll to bottom of div 
                        }	
                    }
                });
            }
            setInterval (loadLog, 2500);
            $("#exit").click(function () {
                var exit = confirm("Are you sure you want to end the session?");
                if (exit == true) {
                window.location = "index.php?logout=true";
                }
            });
        });
    </script>
</body>
</html>
<?php
}
?>

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
    <a href="#" id="toggleButton">About⬇</a>
    <div id="more">
        Like a <a href="https://littlefreelibrary.org/">Little Free Library</a>, but on the internet! 
        Leave a song, poem, pdf, movie, zip file, whatever! Check out what other people have left, 
        but remember, if you download the file it will be removed from the box, just like in real life.
    </div>
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


    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="main.js"></script>
    <script type="text/javascript">
        // jQuery Document 
        $(document).ready(function () {
            $("#submitmsg").click(function () {
                var clientmsg = $("#usermsg").val();
                $.post("post.php", { text: clientmsg });
                $("#usermsg").val("");
                return false;
            });
            function loadLog() {
                var oldscrollHeight = $("#chatbox")[0].scrollHeight - 20; //Scroll height before the request 
                $.ajax({
                    url: "log.html",
                    cache: false,
                    success: function (html) {
                        $("#chatbox").html(html); //Insert chat log into the #chatbox div 
                        //Auto-scroll 
                        var newscrollHeight = $("#chatbox")[0].scrollHeight - 20; //Scroll height after the request 
                        if(newscrollHeight > oldscrollHeight){
                            $("#chatbox").animate({ scrollTop: newscrollHeight }, 'normal'); //Autoscroll to bottom of div 
                        }	
                    }
                });
            }
            setInterval (loadLog, 2500);
            $("#exit").click(function () {
                var exit = confirm("Are you sure you want to end the session?");
                if (exit == true) {
                window.location = "index.php?logout=true";
                }
            });
        });
    </script>

</body>
</html>



