var express = require('express');
var usersDB=require('../models/usersDB');
var router= express.Router();
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/mydb');


router.get('/users',function(req,res){
  console.log('Get request for all users');
  usersDB.find({})
  .exec(function(err, users){
    if(err){
      console.log('Error while retrieving users');
    }else{
      res.json(users);
    }
  });
});

router.get('/user',function(req,res){
  console.log('Get request for a single user');
  usersDB.findOne({eMail:req.params.eMail,password:req.params.password})
  .exec(function(err, user){
    if(err){
      console.log('Error while retrieving users');
    }else{
      res.json(user);
    }
  });
});

router.get('/user/:id',function(req,res){
  console.log('Get request for a single user');
  usersDB.findById(req.params.id)
  .exec(function(err, user){
    if(err){
      console.log('Error while retrieving users');
    }else{
      res.json(user);
    }
  });
});


router.post('/user',function(req,res){
  console.log('Post an user');
  var newUser = new usersDB();
  newUser.userName = req.body.userName;
  newUser.eMail = req.body.eMail;
  newUser.password = req.body.password;
  newUser.userType = req.body.userType;
  newUser.save(function(err, user){
    if(err){
      console.log('Error while saving user');
    }else{
      res.json(user);
    }
  });
});

router.put('/user/:id', function(req,res){
  console.log('Update an user');
  usersDB.findByIdAndUpdate(req.params.id,
    {
      $set:{userName: req.body.userName, eMail: req.body.eMail, password: req.body.password, userType: req.body.userType}
    },
    {
      new: true
    },
    function(err, user){
      if(err){
        console.log('Error while updating user');
      }else{
        console.log(user);
        res.json(user);
      }
    }
  )
});

router.delete('/user/:id',function(req,res){
  console.log('Deleting an user');
  usersDB.findByIdAndRemove(req.params.id,function(err,user){
    if(err){
      console.log('Error while deleting user');
    }else{
      res.json(user);
    }
  });
});

router.post('/authenticate',function(req,res){
  console.log("authenticate user");
  usersDB.findOne({eMail:req.body.eMail, password:req.body.password})
  .exec(function(err, user){
    if(err){
      console.log('Error while retrieving users');
    }else{
      console.log(user);
      if(user != null){
        res.json({ status: 200, token: 'jwt-token', userName: user.userName });
      }else {
        res.json({ status: 200 });
      }
    }
  });
});

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

module.exports = router;
