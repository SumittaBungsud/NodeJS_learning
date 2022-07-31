// โมดูลให้บริการเกี่ยวกับการทำงานต่างๆในโปรเจค

function getCurrentTime(){
    return new Date()
}

// ส่งโมดูลออกไปใช้งาน
module.exports.getCurrentTime = getCurrentTime