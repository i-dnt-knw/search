require('dotenv').config();
require('./db/db');
const express = require('express');
const path = require('path');
const Blog = require('./db/blog');
const {engine} = require('express-handlebars');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './src')));


app.engine('hbs',engine({extname:'hbs'}));
app.set('view engine','hbs');

app.get('/',(req,res)=>{
  res.render('home',{
    nav_home: 'active'
  });
})
app.get('/blogs',(req,res)=>{
  res.render('blogs',{
    nav_blogs: 'active'
  });
})
app.get('/blog',(req,res)=>{
  res.render('blog',{
    nav_blog: 'active'
  });
})
app.get('/search',async(req,res)=>{
  let results = req.query.name;
  let SData = await Blog.find({
    "$or":[
      {"sanitizeHtml":{$regex:results,$options:"$i"}}
      ]
  }).lean();
  res.render('search',{ blogs: SData });
})
app.get("/blog/:slug",async(req,res)=>{
  const blogs = await Blog.findOne({ slug:  req.params.slug }).lean();
  if(blogs==null) res.redirect('/');
  res.render('blog',{ blogs: blogs });
});

app.listen(port,()=>{
  console.log(`Server Listen in the port of http://localhost:${port}`)
});