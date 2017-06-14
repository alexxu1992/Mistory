var express = require('express');
var path = require('path');
var CONFIG = require('../config/basic')
var dbConnect = require('../scripts/dbConnect');

var router = express.Router();

//routing to the user page
router.get('/:userId',(req,res)=>{
  res.sendFile(path.resolve(CONFIG.STATIC_PATH, 'index.html'));
})

//dealing with the request about user
router.post('/signin',(req,res)=>{
  var signinInfo = [
    {user_name:req.body.account_value},
    {user_pass:req.body.password_value}
  ]

  dbConnect.query('SELECT * FROM users WHERE ? AND ?',signinInfo,(err,user)=>{
    if(err) console.log(err);
    if(user.length == 0 ){
      console.log('account wrong');
      res.json({err:'Account or Password wrong'})
    }else{
      res.json(user)
    }
  })
})

router.post('/signup',(req,res)=>{
  console.log(req.body);
  var signup_info = req.body;
  if(!signup_info.user_name || !signup_info.user_pass || !signup_info.user_email){
    return res.json({"err":"INSUFFICIENT_USER_DATA"})
  }else{
    dbConnect.query('INSERT INTO users SET ?', signup_info, (err, res)=>{
      if(err) console.log(err);
      else{
        console.log('Signup Success, the user Id is: ',res.InsertId);
      }
    })
  }
})

//Get comments user
router.post('/comment_users',(req,res)=>{
  //select multiple entities in a table
  var fetchInfo = req.body
  //console.log(fetchInfo);
  dbConnect.query('SELECT user_id,user_name,user_selfie FROM users WHERE user_id IN (?)',[fetchInfo],(err, users)=>{
    if(err) throw err;
    res.json(users)
  })
})

router.get('/getUser', (req, res) => {
  console.log(req.path);
})

module.exports = router;
