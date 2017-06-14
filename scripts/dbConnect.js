var mysql = require('mysql');
var express = require('express');
const CONFIG = require('../config/basic.js');
var datetime = require('node-datetime');


var dbConnect = mysql.createConnection({
  host:CONFIG.HOST,
  user:CONFIG.DB_USER,
  password:CONFIG.DB_PASS,
  database:CONFIG.DB_NAME
})

dbConnect.connect(function(err){
  if(err){
    console.log(err);
  }else{
    console.log(`We connect to ${CONFIG.DB_NAME}`);
  }
})




module.exports = dbConnect;

/////////////////INSERT a new topics into topic table
// var topic1 = {
//   topic_name:'Your personal memory of ITP',
//   topic_subtitle:'There are so many special moments you have experienced in this little space, tears or smile, day or night, maybe you can document them here',
//   topic_cover_url:CONFIG.TOPIC_FILE_PATH + 'id.jpg',
//   topic_by:1}
//
// dbConnect.query('INSERT INTO topics SET ?', topic1, function(err, res){
//   if(err) throw err;
//   console.log('last log insert Id', res.insertId);
// })

/////////////////UPDATE a column of a row in a table
// var update1=[
//   {topic_cover_url:CONFIG.TOPIC_FILE_PATH + '1.jpg'},
//   {topic_id:1}
// ]
// dbConnect.query('UPDATE topics SET ? WHERE ?', update1, function(err,res){
//   if(err) throw err;
//   console.log('now we update the database');
// })

///////////////////INSERT a new story into a story table
// var past = '2015-05-25 00:00:00';
// var current = new Date();
//
// var story2 = {
//   story_in:1,
//   story_by:1,
//   story_title:'Second story in ITP',
//   story_front_cover: CONFIG.STORY_FILE_PATH + '1/' + '2.jpg',
//   story_content:'So complicated this project!',
//   story_happen_date:past,
//   story_post_date:current
// }
//
// dbConnect.query('INSERT INTO stories SET ?', story2, function(err,res){
//   if(err) throw err
//   console.log(res.insertId);
// })

/////////////////////Select the topic list out of topics table
// var fetchInfo = [3, 0]
// dbConnect.query(
//   'SELECT * FROM topics ORDER BY topic_id LIMIT ? OFFSET ?',fetchInfo,function(err,res){
//    if(err) throw err;
//    console.log(res);
// })

////////////////////Extract the lastest date and oldest date
// var selectInfo = [
//   {story_in:1},
//   'story_happen_date'
// ]
// dbConnect.query('SELECT * FROM stories WHERE ? ORDER BY ? DESC', selectInfo,(err, stories)=>{
//   if(err) throw err;
//   var latestDate = stories[0].story_happen_date
//   var oldestDate = stories[stories.length-1].story_happen_date
//   console.log(oldestDate);
//   console.log(latestDate);
//   var updateInfo = [
//     {latest_date:latestDate, oldest_date:oldestDate},
//     {topic_id:1}
//   ]
//   dbConnect.query('UPDATE topics SET ? WHERE ?', updateInfo, (err,res)=>{
//     if(err) throw error;
//     console.log(res);
//   })
// })
