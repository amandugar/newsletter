const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const request = require("request");


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function(req,res) {
  res.sendFile(__dirname+"/signup.html");
})

app.post("/", function(req,res){
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;
  var phoneNumber =req.body.phone;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields:{
          FNAME: firstName,
          LNAME: lastName,
          PHONE: phoneNumber,
        }
      }
    ]
  };
  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us4.api.mailchimp.com/3.0/lists/35cfaea4fd",
    method: "POST",
    headers:{
      "Authorization": "amandugar2506 629f3af6e0073b70a05132a54c566dca-us4"
    },
    body: jsonData
};

  request(options, function(error,response,body) {
    if(error){
        res.sendFile(__dirname+"/failure.html");
    }else {
      if(response.statusCode === 200){
        res.sendFile(__dirname+"/sucess.html");
      }
      else{
          res.sendFile(__dirname+"/failure.html");
      }
    }
  });
});

app.post("/failure",function(req,res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000,function() {
  console.log("Server started on port 3000");
});
