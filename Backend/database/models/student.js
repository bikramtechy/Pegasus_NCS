const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const studentschema = new mongoose.Schema(
  {
    fName: {
      type: String,
      trim: true,
      required: [true, "First Name is requied"],
    },
    lName: {
      type: String,
      trim: true,
      required: [true, "Last Name is requied"],
    },
    isDeleted :{
     type : Boolean,
     default : false
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is requied"],
    },
    password: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
      required: [true, "Phone is requied"],
    },
    state: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
      default: "USA",
    },
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "department",
    },
    courseId :{
      type: mongoose.Schema.Types.ObjectId,
      ref: "studentcourse",
    }, 
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    address1: {
      type: String,
      trim: true,
      // required: [true, "address1 is required"],
    },
    address2: {
      type: String,
      trim: true,
    },
    roleId: {
      type: Number,
    },
    resetToken: String,
    resetTokenExpiry: Date
  },
  { timestamps: true }
);

studentschema.pre("save", function (next) {
  let studentData = this;
  bcrypt
    .hash(this.password, Number(process.env.BCRYPT_HASH))
    .then(function (hash) {
      studentData.password = hash;
      next();
    })
    .catch((err) => {
      console.log("err", err);
      next("err");
    });
});
let student = mongoose.model("student", studentschema);
module.exports = student;
