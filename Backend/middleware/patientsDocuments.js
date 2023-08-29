const multer = require("multer");
const { UploadPatientsDocumentsPath } = require("../config");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UploadPatientsDocumentsPath)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname )
  }
})

const upload = multer({ storage: storage });


const uploadFile = (feildName, fileCount = 1) => {
  
  return upload.array(feildName, fileCount);
};
module.exports = uploadFile;
