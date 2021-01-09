var express = require("express");
var router = express.Router();
var uuid = require("node-uuid");
const staffapp = require("../sql/staff");
/* GET home page. */
router.get("/", function(req, res, next) {
    // 先请求数据库数据，将数据渲染到页面模板

    staffapp.find({}, (err, data) => {
        if (err) {
            console.log(err)
        }

        res.render("staff", {
            index: 3,
            data: data
        })
    })

});

router.get("/add", function(req, res, next) {
    console.log('进来了吗?');
    res.render("staffAdd", {
        index: 3,
    });
    console.log('回来吗');
});

router.post("/addAction", function(req, res, next) {

    console.log('进入/addAction里面了')
    let obj = req.body;
    //调用方法转数字
    obj.price = Number(obj.price);
    //隐形转换
    obj.discount = obj.discount - 0;
    //隐形转换
    obj.score = obj.score * 1;
    console.log(obj);
    staffapp.insertMany(obj, (err, data) => {
        if (err) {
            console.log(err)
        }
        console.log(data)
        res.redirect("/staff");
    })

});

//删除操作
router.get("/delete", function(req, res, next) {
    //get来的数据在req.query.id
    // const id = req.query.id;
    console.log('我现在进入/delete里面了')
    console.log(req.query)

    staffapp.deleteOne({ '_id': req.query._id }, (err, data) => {
        if (err) {
            console.log(err)
        }
        console.log(data)
        res.redirect("/staff");
    })



});

//修改操作
router.get("/update", function(req, res, next) {
    //get来的数据在req.query.id    拿到宇宙唯一id
    console.log(req.query)

    const _id = req.query._id;
    console.log("_id", _id);

    staffapp.findById({ "_id": _id }, (err, data) => {
        if (err) {
            console.log(err)
        }
        console.log('我现在到了/update修改数据路由')
        console.log(data)
        console.log(data._id)
        res.render('staffUpdate', {
            index: 3,
            data: data
        })
    })


});

// 修改操作 - 更新数据
router.post("/updateAction", function(req, res, next) {
    console.log('我在/updateAction里面')
        // 接收当前商品的数据
    const obj = req.body;

    // 处理数据类型，符合数据集合的字段类型
    obj.age = Number(obj.age);
    // obj.stock = parseFloat(obj.stock);
    obj.seniority = obj.seniority - 0;
    obj.salary = obj.salary - 0;
    // obj.score = obj.score * 1;
    console.log('obj_id', obj)
    staffapp.findByIdAndUpdate(obj._id, obj, (err, data) => {
        if (err) {
            console.log(err)
        }
        console.log(data)
        console.log('进来了');
        res.redirect("/staff");

    })


});

//sort 排序
router.get("/sort1", (req, res, next) => {
    const obj = req.query;
    staffapp.find({}).sort({ age: 1 }).exec((err, data) => {
        if (err) {
            console.log(err)
        }
        console.log(data)
        res.render("staff", {
            index: 3,
            data,
        })
    })

});

router.get("/sort2", (req, res, next) => {
    const obj = req.query;
    staffapp.find({}).sort({ age: -1 }).exec((err, data) => {
        if (err) {
            console.log(err)
        }
        console.log(data)
        res.render("staff", {
            index: 3,
            data,
        })
    })

});

//商品搜索
router.get("/search", (req, res, next) => {
    console.log("商品搜索路由 搜索数据")
    const obj = req.query;

    let reg = new RegExp(obj.search);
    staffapp.find({ username: reg }, (err, data) => {
        if (err) {
            console.log(err)
        }
        console.log(data)
        res.render("staff", {
            index: 3,
            data,
        });
    })


});



module.exports = router;