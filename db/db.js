const mongoose = require('mongoose');
require("dotenv").config();

const uri = process.env.URI;



mongoose.connect(uri,{
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>{
  console.log('Connection Successful 🐀🐀');
}).catch((e)=>{
  console.log(e,'Connecting to the databases faild 👣👣');
})