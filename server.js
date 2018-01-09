var express = require('express');
var nodemailer = require('nodemailer');
var app = express();

var smtpTransport = nodemailer.createTransport({
    service: "hotmail",
    host: "smtp.hotmail.com",
    auth: {

        // HERE GOES YOUR ID AND PASSWORD FROM HOST SENDING EMAIL
        user: "",
        pass: ""
    }
});

app.get('/', function (req,res) {
    res.sendfile('index.html')
});

app.get('/send', function (req,res) {

    var mailOptions={
        // PERSON TO BR SEND
        to : req.query.to,

        // DATA TO SEND
        subject : req.query.subject,
        text : req.query.text
    };
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            res.end("error");
        }else{
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
        smtpTransport.close();
    });

});


app.listen(3000, function () {
    console.log('Server start on PORT 3000');
});
