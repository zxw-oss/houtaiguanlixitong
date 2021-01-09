//引入express框架模块
const express = require('express');

//创建路由表
const router = express.Router();

//引入sql下的user数据库
const user = require('../sql/user');

//设置路由表
router.get('/', function(req, res, next) { //渲染login页面
    console.log('进到login页面来了');
    res.render('login') //渲染login页面

})


router.post('/in', function(req, res, next) {
    //获取数据库的数据
    let Obj = req.body;

    //查询数据
    user.findOne(Obj, (err, data) => {
        if (err) {
            console.log(err);

        }
        if (data) {

            res.cookie('isLogin', 'ok') //往用户身上藏一个cookie


            // req.session.isLogin = 'ok' //当用户登录成功时在用户身上种一个session


            console.log('登录成功.....');
            res.redirect('/pro')

        } else {
            res.redirect('/login')
        }

    })
})


//导出
module.exports = router