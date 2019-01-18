var express = require('express');
var router = express.Router();
var api = require('./api');
//获得用户列表
router.get('/user/getUserAll', (req, res, next) => {
    api.getUserAll(req, res, next);
  })
router.post('/user/addUser',(req, res, next) =>{
  api.addUser(req,res,next);
})
router.post('/user/queryUser',(req, res, next) =>{
  api.queryUser(req,res,next);
})
router.post('/user/updateUser',(req, res, next) =>{
  api.updateUser(req,res,next);
})
router.post('/user/deleteUser',(req, res, next) =>{
  api.deleteUser(req,res,next);
})

module.exports = router;