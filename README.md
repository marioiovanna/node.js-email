# How to send Email from Node.js


Create package.json file and keep it in any folder. Put the below code in it.

```
package.json
{
  "name": "email-node",
  "version": "1.0.0",
  "dependencies": {
    "nodemailer": "latest",
    "express": "latest"
  }
}
```

Once done. Switch to that folder using Command prompt or Terminal and type npm install. It will download and install the dependencies our project need. After completion you will able to see node_modules folder in your project directory.



## Implementing Server.js:
Let’s begin with creation of our Server file. Paste code shown below in file named as “Server.js”.

```
var express=require('express');
var nodemailer = require("nodemailer");
var app=express();
app.listen(3000,function(){
console.log("Express Started on Port 3000");
});
```

This is basic block of our app. If you run it in Terminal you will see console message. Now let’s add some routing logic to tell our app what is supposed to do when Request comes from browser. Add these code just above the app.listen line.

```
app.get('/',function(req,res){
res.sendfile('index.html');
});
```

Now when you try to open your app from browser, it will return the index.html as response. Let me show you basic snippet of HTML code.
```
<div id="container">
<div></div>
Node.JS Email application
<div>
<h1>Mailer In Node.JS</h1>
<input id="to" type="text" placeholder="Enter E-mail ID where you want to send" />
<input id="subject" type="text" placeholder="Write Subject" />
<textarea id="content" cols="40" rows="5" placeholder="Write what you want to send"></textarea>
<button id="send_email">Send Email</button>
<span id="message"></span>
</div>
```

Now next thing to do is to call our Server from HTML page when user hit on ‘Send Email’ Button. To do so at client end i am using jQuery. Here is code snippet of jQuery inside HTML page only.
```
<script>
$(document).ready(function(){
    var from,to,subject,text;
    $("#send_email").click(function(){      
        to=$("#to").val();
        subject=$("#subject").val();
        text=$("#content").val();
        $("#message").text("Sending E-mail...Please wait");
        $.get("http://localhost:3000/send",{to:to,subject:subject,text:text},function(data){
        if(data=="sent")
        {
            $("#message").empty().html("

Email is been sent at "+to+" . Please check inbox!

");
        }

});
    });
});
</script>
```


Notice : At $.get we are calling our app with ‘/send’ as handler so now we have to add router in our Server.js file in order to deal with this request. So let’s add some code to handle this route request. Add these code just below of app.get(‘/’) line. File name : Server.js
```
app.get('/send',function(req,res){
//code to send e-mail.
//Will be shown soon.
});
```

### Adding NodeMailer code:
Okay we are almost there, now we have to handle the Mail system. First of all we have to Define Mail transport System (SMTP) so that from that E-mail box our e-mail will be sent. For ease, you can add your Gmail account and password. Add this code just in Server.js just below the ‘var app=express()’ line.
```
var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "",
        pass: ""
    }
});
```


We will use this Object to send e-mail. Our app design is when user click on ‘Send email’ Button then only e-mail should be sent, and we have did that part in “app.get(‘/send’)” router. So in that block only paste the code shown below.
```
var mailOptions={
   to : req.query.to,
   subject : req.query.subject,
   text : req.query.text
}
console.log(mailOptions);
smtpTransport.sendMail(mailOptions, function(error, response){
if(error){
console.log(error);
res.end("error");
}else{
console.log("Message sent: " + response.message);
res.end("sent");
}
});
```


In above code we have read GET variables send from HTML page and we have call “sendMail()” function using Transport object we have created above. In case there is any confusion here is a complete Server.js file.
```
var express=require('express');
var nodemailer = require("nodemailer");
var app=express();
/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/
var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "",
        pass: ""
    }
});
/*------------------SMTP Over-----------------------------*/

/*------------------Routing Started ------------------------*/

app.get('/',function(req,res){
    res.sendfile('index.html');
});
app.get('/send',function(req,res){
    var mailOptions={
        to : req.query.to,
        subject : req.query.subject,
        text : req.query.text
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.end("error");
     }else{
            console.log("Message sent: " + response.message);
        res.end("sent");
         }
});
});

/*--------------------Routing Over----------------------------*/

app.listen(3000,function(){
    console.log("Express Started on Port 3000");
});
```

And this is how HTML page looks like with all styles and JS.
```
<html>
<head>
<title>Node.JS Email application</title>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script><script>// <![CDATA[
$(document).ready(function(){
    var from,to,subject,text;
    $("#send_email").click(function(){      
        to=$("#to").val();
        subject=$("#subject").val();
        text=$("#content").val();
        $("#message").text("Sending E-mail...Please wait");
        $.get("http://localhost:3000/send",{to:to,subject:subject,text:text},function(data){
        if(data=="sent")
        {
            $("#message").empty().html("

Email is been sent at "+to+" . Please check inbox!

");
        }

});
    });
});
</script>
</head>
<body>
<div id="container">
<h1>Mailer In Node.JS</h1>
<input id="to" type="text" placeholder="Enter E-mail ID where you want to send" />
<input id="subject" type="text" placeholder="Write Subject" />
<textarea id="content" cols="40" rows="5" placeholder="Write what you want to send"></textarea>
<button id="send_email">Send Email</button>
<span id="message"></span>
</div>
</div>
```
