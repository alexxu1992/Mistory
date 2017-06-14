var express =require('express')
var path =require('path');
var CONFIG = require('../config/basic');
var dbConnect = require('../scripts/dbConnect');

var router = express.Router();


router.get('/:storyId', function(req,res){
  res.sendFile(path.resolve(CONFIG.STATIC_PATH, 'index.html'));
})

router.get('/fetchStoryList/:topic_id',function(req,res){
  var topic_id = parseInt(req.params.topic_id);
  //Fetch the story list here
  var fetchInfo = {
    story_in:topic_id
  }
  dbConnect.query('SELECT story_id,story_title,story_material_thumbnail,story_happen_date,story_in FROM stories WHERE ?',
                  fetchInfo, (err,stories)=>{
                    res.json(stories);
                  })
})

router.get('/fetchStory/:story_id',function(req,res){
  var story_id = req.params.story_id
  var fetchInfo = {
    story_id:story_id
  }
  dbConnect.query('SELECT * FROM stories WHERE ?', fetchInfo, (err, story)=>{
    if(err) {
      console.log('its here');
      throw err;
    }
    res.json(story)
  })

})

module.exports = router;
