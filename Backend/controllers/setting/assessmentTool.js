const fs = require("fs");
const AssessmentTool = require("../../database/models/assessmentTool");
const { default: mongoose } = require("mongoose");

exports.postAssessment = async (req, res) => {
  let {
    assessmentTitle,
    module,
    duration,
    assesmentType,
    objectives,
    description,
  } = req.body;
  let file = "";
  if (req.files.length > 0) {
    file = req.files[0].filename;
  }
  let newData = new AssessmentTool({
    assessmentTitle,
    module,
    duration,
    createdBy : req.userId,
    roleId : req.roleId,
    assesmentType,
    objectives,
    description,
    file
  });
  try {
    await newData.validate();
    await newData.save();
    return res.status(201).json({
      success: true,
      message: "Assessment is created"
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Please fill required fields",
      });
    }
    return res.status(400).json({
      success: false,
      message: "There is some problem please try again later",
    });
  }
};

exports.getAssessment = async (req, res) => {
  try {

    let data = await AssessmentTool.find({ isDeleted : false , $or:[{createdBy: new mongoose.Types.ObjectId(req.userId), roleId:req.roleId},{roleId:1}]}).populate("createdBy");
    if (!data) {
      return res.status(400).json({ success: true, message: "Data not found" });
    }
    return res.status(200).json({ success: true, message: "Data found", data });
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      success: false,
      message: "There is some error please try again later",
    });
  }
};
exports.getAssessmentFile = async (req, res) => {
  try {
    if (!req.params.fileName) {
      return res.status(400).json({ success: true, message: "flie not found" });
    }
    return fs.createReadStream(`${__dirname}/../../assessmentFiles/${req.params.fileName}`).pipe(res);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "There is some error please try again later",
    });
  }
};

exports.updateAssessment = async (req, res) => {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ success: false, message: "Data not found" });
    }
    let {
      assessmentTitle,
      module,
      duration,
      createdBy,
      assesmentType,
      objectives,
      description,
    } = req.body;
    let file = "";
    if(req.body.file){
      file= req.body.file
    }
    if (req.files.length > 0) {
      file = req.files[0].filename;
    }
    await AssessmentTool.findByIdAndUpdate(req.params.id, {
      assessmentTitle,
      module,
      duration,
      createdBy,
      assesmentType,
      objectives,
      description,
      file
    });
    return res.status(200).json({ success: true, message: "Data is Updated" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "There is some error please try again later",
    });
  }
};
exports.deleteAssessment = async (req, res) => {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ success: false, message: "Data not found" });
    }
    await AssessmentTool.findByIdAndDelete(req.params.id ,{  isDeleted : true});
    return res.status(200).json({ success: true, message: "Data is Deleted" });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "There is some error please try again later",
    });
  }
};
