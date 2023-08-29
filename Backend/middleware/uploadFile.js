const multer  = require('multer');
const { UploadfilePath,UploadAssessmentPath } = require('../config');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, UploadfilePath)
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname )
    }
  })
const AssessmentStorage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, UploadAssessmentPath)
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname )
    }
  })
  
const upload = multer({ storage: storage });
const uploadAssessmentfile = multer({ storage: AssessmentStorage });
  

exports.uploadAvatarFile = (feildName,fileCount=1)=>{
  return upload.array(feildName, fileCount)
}

exports.uploadAssessment = (feildName,fileCount=1)=>{
  return uploadAssessmentfile.array(feildName, fileCount)
}