const CONFIG = require('../config/basic');
var path = require('path');
var url_join = require('url-join');
var dbConnect = require('./dbConnect');

var Thumbnail = require('thumbnail');
var gm = require('gm');


function createStoryThumb(topic_id, story_id){
  var thumbnail = new Thumbnail(path.join(CONFIG.STORY_FILE_LOCAL_PATH, `${topic_id}`),
                                path.join(CONFIG.STORY_FILE_LOCAL_PATH, `${topic_id}`));
  thumbnail.ensureThumbnail(`${story_id}.jpg`,160,220,(err,filename)=>{
    //Store the thumbnail path to the database
    var updateInfo = [
      {story_material_thumbnail:url_join(CONFIG.STORY_FILE_PATH, `${topic_id}`,filename)},
      {story_id:story_id}
    ]
    dbConnect.query('UPDATE stories SET ? WHERE ?', updateInfo, (err, res)=>{
      console.log('already update');
      
    })
  })
}


module.exports = createStoryThumb;
