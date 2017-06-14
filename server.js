//include all the module we need
var express = require('express');
var fs = require('fs');
var path = require('path');
var body_parser = require('body-parser');
var url = require('url')

var dbConnect = require('./scripts/dbConnect');
var createThumb = require('./scripts/thumbnail')
const CONFIG = require('./config/basic');

//for(var i=1;i<3;i++){
  // for(var j=1;j<43;j++){
  //   createThumb(1,j);
  // }
//}


//create the express SERVER
var app = express();

//Add the body parser as the middleware for parsing the body.json data
app.use(body_parser.urlencoded({extended:false}))
app.use(body_parser.json())

//serve static content
app.use('/static', express.static(path.join(__dirname, 'static')))

app.get('/', (req, res, next)=>{
  console.log('visit here');
  res.sendFile(path.resolve(CONFIG.STATIC_PATH, 'index.html'))
})

//routes for different APIs
app.use('/user', require('./routes/user'));
app.use('/topic', require('./routes/topic'));
app.use('/story', require('./routes/story'));
app.use('/upload', require('./routes/upload'));
app.use('/comments', require('./routes/comment'))

//app listening on port 3000
app.listen(3000, ()=>{
  console.log('Server is listening on port3000');
})
