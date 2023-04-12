const multer = require('multer')
const path  = require('path')

const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jepg",
    "image/jpg": "jpg"
  };

const diskStorage = multer.diskStorage({
   
    destination: "./images",

    filename: (req, file, cb) => {
        // console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
      }

    // fileFilter(req, file, cb) {
    //     const isValid = MIME_TYPE_MAP[file.mimetype];
 
    //     if (!isValid) {
    //         return cb(new Error('Please upload a proper document'))
    //     }
        
    //     cb(undefined, true)
   
    // }
})

const upload = multer({storage: diskStorage})

module.exports = {upload}