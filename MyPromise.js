const connect = true
const url1 = "fai123/faile1.js"

function downloading(url){
    return new Promise(function(resolve,reject){
        console.log('กำลังโหลดไฟล์จาก '+url)
        setTimeout(()=>{
            if(connect){
                resolve('โหลด '+url+' เรียบร้อย')
            }else{
                reject('เกิดข้อผิดพลาด')
            }
        },3000)
    })
}

downloading(url1).then(result=>{
    console.log(result)
}).catch(err=>{
    console.log(err)
}).finally(()=>{
    console.log('จบการทำงาน')
})
