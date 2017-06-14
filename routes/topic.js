var express = require('express');
var path = require('path');
var CONFIG = require('../config/basic')
var dbConnect = require('../scripts/dbConnect');

var router = express.Router();

router.get('/fetchTopics/:current_topics_length', function(req,res){
  var current_topics_length = parseInt(req.params.current_topics_length);
  //Fetch the relative topics from database
  var fetchInfo = [4, current_topics_length]
  dbConnect.query('SELECT * FROM topics ORDER BY topic_id LIMIT ? OFFSET ?', fetchInfo, (err,topics)=>{
    if(err) throw err;
    res.json(topics)
  })
})

router.get('/fetchCurrentTopic/:topic_id',function(req,res){
  // console.log(req.params);
  dbConnect.query('SELECT * FROM topics WHERE ?',{topic_id:req.params.topic_id},(err,topic)=>{
    if(err) throw err;
    res.json(topic)
  })
})

router.get('/:topicId', function(req,res){
  res.sendFile(path.resolve(CONFIG.STATIC_PATH, 'index.html'));
})


module.exports = router;
