//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var ld = require('lodash');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/BlogWebsiteDB', {useNewUrlParser: true, useUnifiedTopology: true});



const BlogSchema = new mongoose.Schema({
  post: String,
  title: String
});


const Post = mongoose.model('post', BlogSchema);

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));


var array=[];

app.get("/",function(req,res){

  Post.find(function(err,results){

    res.render("home" , {Homecontent:homeStartingContent,arraydata:results });
  });
  
})

app.get('/posts/:userId', function (req, res) {

  Post.find(function(err,results){
  results.forEach(element => {
    if (ld.lowerCase(req.params.userId)===ld.lowerCase(element.title)) {
      res.render("post",{PostTitle:element.title,PostContent:element.post})
    };

  });
  });
});  

  



app.get("/home",function(req,res){

  res.render("home" , {Homecontent:homeStartingContent });

  
  })

app.get("/contact",function(req,res){

  res.render("contact",{Contactcontent:contactContent});

})

app.get("/about",function(req,res){

  res.render("about",{aboutcontent:aboutContent});

})

app.get("/compose",function(req,res){



  res.render("compose",{aboutcontent:aboutContent});

})



app.post("/compose",function(req,res){



const post={title:req.body.Title,
  post:req.body.Postbody
}

const Newpost = new Post({ post:req.body.Postbody,
  title:req.body.Title});

  Newpost.save();

//array.push(post);

res.redirect("/");

})



app.listen(3000, function() {
  console.log("Server started on port 3000");
});


