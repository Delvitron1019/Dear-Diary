

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Load the full build.
const _ = require('lodash');

// to connect with mongoDB
const mongoose= require("mongoose");

// connect with database
mongoose.connect("mongodb://localhost:27017/blogDB");

// creating the blog Schema
const blogSchema = new mongoose.Schema({

  title: String,
  content: String

})
// creating the blog model/document
const Blog = mongoose.model("Blog", blogSchema);

app.get("/", (req, res)=>{

  // fetching all the blogs from database
  Blog.find({}, (err, posts) =>{

    if(err){

      console.log(err);
    }else{

      res.render("home", {homeStartingContent, posts});
    }
  })

})

app.get("/about", (req, res)=>{
  
  res.render("about", {aboutContent});
  
})

app.get("/contact", (req, res)=>{
  
  res.render("contact", {contactContent});
  
})

app.get("/compose", (req, res)=>{
  
  res.render("compose");
  
})
app.post("/compose", (req, res)=>{

  const post = {

    title: req.body.blogTitle,
    content: req.body.blogContent

  }

  Blog.insertMany(post, (err) => {

    if(err){

      console.log(err);
    }else{

      console.log("successfully added document to database");
    }
  })

  res.redirect("/");

})

// blog details
app.get("/blogs/:blogId", (req, res)=>{

  let blogId = req.params.blogId;

  let blogTitle = "";
  let blogContent = "";

  Blog.findOne({_id:blogId}, (err, blog) => {

    if(err){

      console.log(err);
    }else{

      blogContent = blog.content;
      blogTitle = blog.title;

      res.render("post", {blogTitle, blogContent});

    }

  })

})

app.listen(8080, ()=>{
  console.log("listening on port 8080");
})

