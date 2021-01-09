// 错误处理的包  createError 
var createError = require('http-errors');
var express = require('express');
var path = require('path');
//日志的一个引入包  暂时知道这些就行了  
var logger = require('morgan');
// 路由表
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var proRouter = require('./routes/pro');
var userRouter = require('./routes/user');
var orderRouter = require('./routes/order');
var cartRouter = require('./routes/cart');
var bannerRouter = require('./routes/banner');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var staffRouter = require('./routes/staff')




//cookie
//首先下载一个nood 操作cookie最好用的包       npm install cookie-parser
//引入API
var cookieParser = require('cookie-parser')


//session
//先下载一个express-session的包     npm install express-session

// var session = require('express-session')





var app = express();
// view engine setup
//设置ejs 引擎的一个寻找路径  
app.set('views', path.join(__dirname, 'views'));
//使用模板 引擎ejs
app.set('view engine', 'ejs');
// dev的时候会处理logger日志   next() 会在底层内部执行  肉眼看不见
app.use(logger('dev'));
// 使用express的json模块 可以接收和处理现在最常用方便的JSON数据 脚手架已经配好
app.use(express.json());
//xtended: false：表示使用系统模块querystring来处理，也是官方推荐的  
app.use(express.urlencoded({ extended: false }));
//配置 ejs  里面寻找的静态文件的一个路径  
app.use(express.static(path.join(__dirname, 'public')));






//cookie部分   这是一个中间键   next()包里已经写过   
app.use(cookieParser())


//cookie路由守卫
app.all('*', (req, res, next) => {
    console.log('进入cookie路由守卫了');
    console.log(req.cookies);
    console.log('req.url', req.url);

    //当路由地址为以下三种情况的时候  程序才能正常进行     否则让其跳到登录页面 
    if (req.cookies.isLogin === 'ok' || req.url === '/login' || req.url === '/login/in' || req.url === '/register' || req.url === '/register/in') {
        next()
    } else {
        console.log('进入cookies路由守卫中');
        res.redirect('/login')
    }
})


//session部分
// app.use(
//     session({
//         //secret 加密用的 
//         secret: 'zxzc',
//         resave: false, //强制保存  推荐flase
//         saveUninitialized: true, //初始sesstion的存储   默认为ture

//         cookie: { maxAge: 1000 * 10 * 60 } //设置cookie的过期时间
//     }))


// //设置守卫
// app.all('*', (req, res, next) => {
//     console.log('全局进入守卫......');
//     console.log(req.session);
//     if (req.session.isLogin === 'ok' || req.url === '/login' || req.url === '/login/in' || req.url === '/register' || req.url === '/register/in') {
//         console.log('程序到这里了.....');
//         next()
//     } else {
//         console.log('session 看门狗');
//         res.redirect('/login');
//     }

// })













//以下是路由表的use  必须先命中第一个路由表  才能进入后面的indexRouter 等 注意！
app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/pro', proRouter);
app.use('/order', orderRouter);
app.use('/user', userRouter);
app.use('/cart', cartRouter);
app.use('/banner', bannerRouter);


app.use('/register', registerRouter)
app.use('/login', loginRouter)

app.use('/staff', staffRouter)

//以下两个是处理错误的 中间件！！！一个是 状态码错误处理 一个是全局错误处理
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;