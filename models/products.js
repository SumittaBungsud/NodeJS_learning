// ใช้งาน mongoose
const mongoose = require('mongoose')

// เชื่อมไปยัง mongoDB
const dbUrl = 'mongodb://localhost:27017/productDB'
mongoose.connect(dbUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(err=>console.log(err))

// ออกแบบ Schema
let productSchema = mongoose.Schema({
    name:String,
    price:Number,
    image:String,
    description:String
})

// สร้าง model
let Product = mongoose.model('products',productSchema) // เชื่อม Schema กับ Collection ที่ต้องการเก็บ

// ส่งออก model
module.exports = Product

// ออกแบบฟังก์ชันสำหรับบันทึกข้อมูล
module.exports.saveProduct = function(model,data){
    model.save(data)
}