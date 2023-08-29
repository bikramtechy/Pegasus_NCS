const Department = require("../../database/models/department");

exports.addDepartment = async (req, res) => {
  try {
    let createDepartment = await Department(req.body);
    await createDepartment.save();
    return res
      .status(201)
      .json({ success: true, message: "Department Created successfully" });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "All Feild is required" });
  }
};


exports.getDepartment = async (req, res) => {
  try {
    let data;
    if (req.params.id) {
      data = await Department.findById({ _id : req.params.id });
    } else {
      data = await Department.find({});
    }
    if (!data) {
      return res
        .status(400)
        .json({ success: true, message: "Department not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "", data });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "There is some error please try again later",
    });
  }
};


exports.updateDepartment = async (req, res) => {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ success: false, message: "Department not found" });
    }
    await Department.findByIdAndUpdate(req.params.id, req.body);
    return res.status(200).json({ success: true, message: "Department is Updated" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "There is some error please try again later",
    });
  }
};

exports.deleteDepartment = async (req, res) => {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ success: false, message: "Department not found" });
    }
    await Department.findByIdAndRemove(req.params.id);
    return res.status(200).json({ success: true, message: "Department is deleted" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "There is some error please try again later",
    });
  }
};