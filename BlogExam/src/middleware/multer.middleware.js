const multer = require("multer");


const imgUpload = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "src/uploads")
    },
    filename: (req, file, cb) => {
        cb(null, `IMG-${Date.now()}`)
    }
})

const productsImg = multer({storage : imgUpload});
module.exports = productsImg;