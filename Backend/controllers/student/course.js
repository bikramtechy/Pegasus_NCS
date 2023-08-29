const StudentCourse = require("../../database/models/studentCourse");

exports.addCourse = async (req, res) => {
  try {
    let createCourse = await StudentCourse(req.body);
    await createCourse.save();
    return res
      .status(201)
      .json({ success: true, message: "Course Created successfully" });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "All Feild is required" });
  }
};


exports.getCourse = async (req, res) => {
  try {
    let data;
    if (req.params.id) {
      data = await StudentCourse.findById({ _id : req.params.id });
    } else {
      data = await StudentCourse.find({});
    }
    if (!data) {
      return res
        .status(400)
        .json({ success: true, message: "Course not found" });
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


exports.updateCourse = async (req, res) => {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ success: false, message: "Course not found" });
    }
    await StudentCourse.findByIdAndUpdate(req.params.id, req.body);
    return res.status(200).json({ success: true, message: "Course is Updated" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "There is some error please try again later",
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ success: false, message: "Course not found" });
    }
    await StudentCourse.findByIdAndRemove(req.params.id);
    return res.status(200).json({ success: true, message: "Course is deleted" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "There is some error please try again later",
    });
  }
};