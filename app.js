const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signUp.html");
});

app.post("/", function(req,res){
    const fname= req.body.firstname;
    const lname = req.body.lastname;
    const mail = req.body.email;
    const data = {
        members: [
            {
                email_address: mail,
                status: "subscribed",
                merge_fields:
                {
                    FNAME: fname,
                    LNAME: lname

                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us10.api.mailchimp.com/3.0/lists/aef7141a29";
    const options = {
        method: "post",
        auth: "Somyantus:119719a35596ab2970b71b57adedcd4ee-us10"
    }

    const request= https.request(url , options, function(response){
        if(response.statusCode===200)
        {
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/faliure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        });
    });
    request.write(jsonData);
    request.end();
});

app.post("/faliure", function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
    console.log("hello world");
});




