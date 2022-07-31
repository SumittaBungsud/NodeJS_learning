// จัดการ Routing
const express = require('express')
const router = express.Router()
// เรียกใช้งาน model
const Product = require('../models/products')
// อัพโหลดไฟล์
const multer = require('multer')

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/images/products') // ตำแหน่งจัดเก็บไฟล์
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+".jpg") // เปลี่ยนชื่อไฟล์ ป้องกันชื่อซ้ำกัน
    }
})

// เริ่มต้น upload
const upload = multer({ 
    storage:storage
})

router.get("/", (req,res)=>{
    // ดึงข้อมูลจาก model ที่เชื่อมต่อกับ database มาทั้งหมด
    Product.find().exec((err,doc)=>{ 
        res.render('index',{productArray:doc}) // ส่งไปที่ Template
    })
})

router.get("/add-product", (req,res)=>{
    if(req.session.login){
         res.render('form')
    }else{
        res.render('admin')
    }
   
})

router.get("/manage", (req,res)=>{
    if(req.session.login){
        // ดึงข้อมูลจาก model ที่เชื่อมต่อกับ database มาทั้งหมด
        Product.find().exec((err,doc)=>{ 
            res.render('manage',{productArray:doc}) // ส่งไปที่ Template
        })
   }else{
       res.render('admin')
   }
    //  แสดงข้อมูล session
    // console.log('sessionID = ',req.sessionID)
    // console.log('session data = ',req.session)
    
})

// ออกจากระบบ
router.get("/logout",(req,res)=>{
    // res.clearCookie('username')
    // res.clearCookie('password')
    // res.clearCookie('login')
    req.session.destroy((err=>{
        res.redirect('/manage')
    }))
    
})

router.get("/:id", (req,res)=>{
    Product.findOne({_id:req.params.id}).exec((err,doc)=>{
        res.render('product',{product:doc})
    })
})

router.get("/delete/:id", (req,res)=>{
    Product.findByIdAndDelete(req.params.id,{useFindAndModify:false}).exec(err=>{
        if(err) console.log(err)
        res.redirect("/manage")
    })
})

router.post("/insert", upload.single('image'), (req,res)=>{
    console.log(req.file)
    let data = new Product({
        name:req.body.name,
        price:req.body.price,
        image:req.file.filename,
        description:req.body.description
    })
    Product.saveProduct(data, (err)=>{
        if(err) console.log(err)
        res.redirect('/')
    })
})

router.post("/edit", (req,res)=>{
    const edit_id = req.body.edit_id
    Product.findOne({_id:edit_id}).exec((err,doc)=>{
        // นำข้อมูลเดิมก่อนจะแก้ไขมาแสดง
        res.render('edit',{product:doc})
    })
})

router.post("/update", (req,res)=>{
    // ข้อมูลที่ส่งมาจากฟอร์มแก้ไข
    const update_id = req.body.update_id
    let data = {
        name:req.body.name,
        price:req.body.price,
        description:req.body.description
    }
    // อัปเดตข้อมูล
    Product.findByIdAndUpdate(update_id,data,{useFindAndModify:false}).exec(err=>{
        res.redirect("/manage")
    })
})

// เข้าสู่ระบบ
router.post("/login",(req,res)=>{
    const username = req.body.username
    const password = req.body.password
    const timeExpire = 10000 // 10 s

    if(username === 'admin' && password === '123'){
        // // สร้าง cookie
        // res.cookie('username',username,{maxAge:timeExpire})
        // res.cookie('password',password,{maxAge:timeExpire})
        // res.cookie('login',true,{maxAge:timeExpire}) // true => login เข้าสู่ระบบ
        req.session.username = username
        req.session.password = password
        req.session.login = true
        req.session.cookie.maxAge = timeExpire
        res.redirect('/manage')
    }else{
        res.render('404')
    }
}) 


module.exports = router