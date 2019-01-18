const mysql = require('mysql');
const mysqlConf = require('./db');
const sqlMap = require('./sqlMap');
const fs = require('fs');
const formidable = require('formidable');
const uuid = require('uuid');
const path = require('path');
const marked = require('marked');
const LIMIT = 10;
const pool = mysql.createPool({
  host: mysqlConf.mysql.host,
  user: mysqlConf.mysql.user,
  password: mysqlConf.mysql.password,
  database: mysqlConf.mysql.database,
  port: mysqlConf.mysql.port,
  multipleStatements: true // 多语句查询
});
marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});
// 数据处理
var mergeData = function (data, flag) {
  let obj = {},
    arr = [],
    arrDel = [],
    tmp;
  for (let i = 0, len = data.length; i < len; i++) {
    tmp = data[i];
    let tagString = tmp.tag_string,
      tagArr;
    obj[tmp.id] = {};
    obj[tmp.id].id = tmp.id;
    obj[tmp.id].user_id = tmp.user_id;
    obj[tmp.id].title = tmp.title.trim();
    obj[tmp.id].type = tmp.type;
    obj[tmp.id].loadURL = tmp.loadURL;
    obj[tmp.id].summary = tmp.summary;
    obj[tmp.id].post_time = tmp.post_time;
    obj[tmp.id].upd_time = tmp.upd_time ? tmp.upd_time : '';
    obj[tmp.id].view = tmp.view;
    obj[tmp.id].start = tmp.start;
    obj[tmp.id].state = tmp.state;
    obj[tmp.id].cover = tmp.cover;
    obj[tmp.id].tags = [];
    if (tagString) {
      tagArr = tagString.split(',');
      for (let j = 0, l = tagArr.length; j < l; j++) {
        obj[tmp.id].tags.push({
          id: tagArr[j].split('_')[0],
          name: tagArr[j].split('_')[1]
        })
      }
    }
  }
  for (let i in obj) {
    obj[i].state !== 0 ? (flag ? obj[i].state === 1 ? arr.push(obj[i]) : false : arr.push(obj[i])) : arrDel.push(obj[i]);
  }
  return flag ? arr : {
    'articles': arr,
    'articlesDel': arrDel
  };
}
module.exports = {
  // 用户列表
  getUserAll(req, res, next) {
    pool.getConnection((err, connection) => {
      connection.query(sqlMap.user.queryAll, (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },
  //添加用户
  addUser(req, res, next) {
    pool.getConnection((err, connection) => {
      let params = req.body;
      let id = 0;
      connection.query(sqlMap.user.queryAll, (err, result) => {
        for (let i = 0; i < result.length; i++) {
          if (id < result[i].id) {
            id = result[i].id;
          }
          id++;
        }
        connection.query(sqlMap.user.add, [params.username, params.password, id], (err, result) => {
          res.json({
            status: true,
            msg: '添加成功'
          });
          connection.release();
        })
      })

    })
  },
  //用户查询
  queryUser(req, res, next) {
    pool.getConnection((err, connection) => {
      let params = req.body;
      connection.query(sqlMap.user.queryByUsername, [params.username], (err, result) => {
        result.length === 0 ? res.json(false) : res.json(result);
        connection.release();
      })
    })
  },
  //修改用户
  updateUser(req, res, next) {
    pool.getConnection((err, connection) => {
      let params = req.body;
      let id = params.id;
      connection.query(sqlMap.user.upUserByUsername, [params.username, params.password, id], (err, result) => {
        if (err) {
          throw err;
        }
        res.json(true);
        connection.release();
      })
    })
  },
  //删除用户
  deleteUser(req, res, next) {
    pool.getConnection((err, connection) => {
      let params = req.body;
      let id = params.id;
      connection.query(sqlMap.user.deleteUser,[id],(err, result) => {
        if (err) {
          throw err;
        }
        res.json({
          status: true,
          msg: '删除成功'
        });
        connection.release();
      })
    })
  },
}