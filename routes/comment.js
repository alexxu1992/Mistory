var express =require('express')
var path =require('path');
var CONFIG = require('../config/basic');
var dbConnect = require('../scripts/dbConnect');

var router = express.Router();

//here receive the request for fetching the comments
router.get('/:story_id',(req,res)=>{
  fetchInfo = {
    comment_in:req.params.story_id
  }
  dbConnect.query('SELECT * FROM comments WHERE ?',fetchInfo,(err, comments)=>{
    if(err) {
      throw err;
    }
    res.json(comments)
  })
})



module.exports = router;
