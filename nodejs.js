// const mymodule = require('./modules/mymodule.js')
// console.log(mymodule.getCurrentTime())

// // Blocking
// const fs = require('fs')

// // Read
// const data = fs.readFileSync('./myFile/input.txt','utf-8')
// console.log(data)

// // Write
// const outputText = 'Hello NodeJs\n' + data + '\nถูกเขียนเมื่อ ' + (new Date())
// fs.writeFileSync('./myFile/output.txt',outputText)

// // Non-blocking
// const fs = require('fs')

// // Read
// fs.readFile('myFile/input.txt','utf-8',(err,data)=>{
//     if(err) return console.log('เกิดข้อผิดพลาด', err)
//     const outputText = 'Hello Node.js\n'+data+'\nถูกเขียนเมื่อ '+ new Date()
//     fs.writeFile('myFile/output.txt',outputText,err=>{
//         if(err) return console.log('เกิดข้อผิดพลาด', err)
//         console.log('เขียนไฟล์เสร็จเรียบร้อย!')
//     })
// })

// สร้าง Server ด้วย Node.js
const http = require('http')
const fs = require('fs')
const url = require('url')

const indexPage = fs.readFileSync(`${__dirname}/templates/index.html`,'utf-8')
const productPage1 = fs.readFileSync(`${__dirname}/templates/product1.html`,'utf-8')
const productPage2 = fs.readFileSync(`${__dirname}/templates/product2.html`,'utf-8')
const productPage3 = fs.readFileSync(`${__dirname}/templates/product2.html`,'utf-8')

const server = http.createServer(function(req,res){

    const {pathname, query} = url.parse(req.url,true)
    const pathName = req.url 

    if(pathname === "/" || pathname === "/home"){
        res.end(indexPage)
    }else if(pathname === "/product"){
        // ข้อมูลสินค้าชิ้นที่ 1
        if(query.id === '1'){
            res.end(productPage1)
        }else if(query.id === '2'){
            res.end(productPage2)
        }else if(query.id === '3'){
            res.end(productPage3)
        }else{
            res.writeHead(404)
            res.end('<h1>Not Found</h1>') 
        } 
        
    }else{
        res.writeHead(404)
        res.end('<h1>Not Found</h1>') 
    } 

}).listen(3000, 'localhost', ()=>{
    console.log('start server in port 3000')
}) // run on localhost:3000


