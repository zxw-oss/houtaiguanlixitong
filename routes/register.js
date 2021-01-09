//引入express模块
const express = require('express')


//创建路由表
const router = express.Router()

//连接sql下的user    连接数据库
const user = require('../sql/user')


//配置路由
router.get('/', function(req, res, next) {
    console.log('进入到了注册 /里面了');
    res.render('register')
})



router.post('/in', function(req, res, next) {
    console.log('进入到了注册 in里面了');
    let Obj = req.body //获取post请求的数据   返回对象的形式
    console.log(Obj);

    //注册前先查询一下
    user.findOne({ username: Obj.username }, (err, data) => {
        if (err) {
            console.log(err);
        }
        if (data) {
            res.redirect('/register') //如果存在用户名就还跳到注册页面
        } else { //如果用户不存在 就添加用户

            user.insertMany(Obj, (err, data) => { //把当前的用户名和密码添加到user里面   并跳到登录页面
                if (err) {
                    console.log(err);

                }
                console.log(data);
                res.redirect('/login')
            })
        }
    })
})




module.exports = router