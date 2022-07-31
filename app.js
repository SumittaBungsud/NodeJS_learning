const express = require('express')
const path = require('path')
const router = require('./routes/myRouter')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const app = express()

app.set('views',path.join(__dirname,'views')) // ตั้งค่าการเรียกใช้งาน dynamic files
app.set('view engine','ejs') // การเรียกใช้งาน Template Engine

app.use(cookieParser())
app.use(session({secret:'mysession',resave:false,saveUninitialized:false}))
app.use(express.urlencoded({extended: false})) // ตั้งค่าการส่งแบบ POST
app.use(router) // เรียกใช้การจัดการ router
app.use(express.static(path.join(__dirname,'public'))) // ตั้งค่าการเรียกใช้งาน static files

app.listen(8080, ()=>{
    console.log('Start server at port 8080.')
})