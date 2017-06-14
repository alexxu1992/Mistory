var express =require('express')
var path =require('path');
var fs = require('fs');
var CONFIG = require('../config/basic');
var dbConnect = require('../scripts/dbConnect');
var Busboy = require('busboy');
var inspect = require('util').inspect;
var createThumb = require('../scripts/thumbnail')

var router = express.Router();

router.get('/:topic_id', function(req,res){
  console.log(req.params);
  res.sendFile(path.resolve(CONFIG.STATIC_PATH, 'index.html'));
})

router.post('/comment',(req,res)=>{
  console.log(req.body);
  var comment_info = req.body.info
  var comment_content = req.body.content
  var newComment = {
    comment_content:comment_content,
    comment_date:comment_info.comment_date,
    comment_in:comment_info.comment_in,
    comment_to:comment_info.comment_to,
    comment_by:comment_info.comment_by
  }
  dbConnect.query('INSERT INTO comments SET ?', newComment,(err,dbRes)=>{
    if(err) {
      res.json({status:'err', err:14})
      //throw err
    };
    res.json({status:'success'})
  })
})

router.post('/story', (req,response)=>{
  var busboy = new Busboy({ headers: req.headers });
  var story_info = {};
  var old_path = '';
  var new_path = '';
  busboy.on('file', function(fieldname, file, filename, encoding, mimetype){
    console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
    old_path = CONFIG.STORY_FILE_LOCAL_PATH + filename
    file.pipe(fs.createWriteStream(old_path))
  })

  busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
     if(fieldname=='meta_info'){
       story_info = JSON.parse(val)
       //console.log('Field [' + fieldname + '], value: ' + inspect(story_info));
     }
  });

  busboy.on('finish', function() {  //Insert the story_info into database and move the file
    var story_id = null;
    var topic_id = story_info.story_in
    dbConnect.query('INSERT INTO stories SET ?', story_info, (err,res)=>{
      story_id = res.insertId
      new_path = CONFIG.STORY_FILE_LOCAL_PATH + story_info.story_in + `/${story_id}.jpg` // for rename
      story_material = CONFIG.STORY_FILE_PATH + story_info.story_in + `/${story_id}.jpg` // for database
      fs.rename(old_path,new_path,(err)=>{
        if (err) throw err;
        var updateInfo = [
          {story_material:story_material},
          {story_id:story_id}
        ]
        dbConnect.query('UPDATE stories SET ? WHERE ?', updateInfo,(err,res)=>{
          console.log('finish update story_material');
        })
        createThumb(topic_id, story_id)
        response.json({status:'success'})
      })
      modifyTopicTimeline(story_info.story_in, story_info.story_happen_date)
     })
    });

  req.pipe(busboy)
})

module.exports = router;

function modifyTopicTimeline(story_in, story_happen_date){
  var selectInfo = {topic_id:story_in};
  dbConnect.query('SELECT latest_date,oldest_date FROM topics WHERE ?', selectInfo, (err,res)=>{
    var current_latest_date = res[0].latest_date
    var current_oldest_date = res[0].oldest_date
    if(new Date(story_happen_date) <= new Date(current_oldest_date)){
      var updateInfo = [
        {oldest_date:story_happen_date},
        {topic_id:story_in}
      ]
      dbConnect.query('UPDATE topics SET ? WHERE ?', updateInfo, (err,res)=>{
        if(err) throw err;
        console.log('change the oldest date');
      })
    }
    else if(new Date(story_happen_date) >= new Date(current_latest_date)){
      var updateInfo = [
        {latest_date:story_happen_date},
        {topic_id:story_in}
      ]
      dbConnect.query('UPDATE topics SET ? WHERE ?', updateInfo, (err,res)=>{
        if(err) throw err;
        console.log('change the latest date');
      })
    }
  })
}
