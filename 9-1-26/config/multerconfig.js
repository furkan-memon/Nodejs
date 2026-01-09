const multer = require('multer')
const path = require('path')
const crypto = require('crypto')
const uploadDir = path.join(__dirname, '..','public', 'images', 'upload');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(16, (err, buf) => {
      const fn = buf.toString('hex') + path.extname(file.originalname); 
      cb(null,  fn)
    })
  }
})

const upload = multer({ storage: storage })
module.exports = upload