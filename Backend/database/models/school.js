const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const schoolschema = new mongoose.Schema(
    {
        schoolCode : {
            type: String,
            trim: true,
            required: [true, "SchoolCode is requied"],
        },
        schoolName :{
            type: String,
            trim: true,
            required: [true, "schoolName is requied"],
        },
        cp_fName: {
            type: String,
            trim: true,
        },
        cp_lName: {
            type: String,
            trim: true,
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        email: {
            type: String,
            trim: true
        },
        cp_email: {
            type: String,
            trim: true,
        },
        password: {
            type: String,
            trim: true
        },
        user_Id: {
            type: String,
            trim: true,
            required: [true, "userId is requied"],
        },
        address: {
            type: String,
            trim: true,
          },
        phone: {
            type: String,
            trim: true,
            required: [true, "phone is requied"],
        },
        cp_phone: {
            type: String,
            trim: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
        roleId: {
            type: Number,
        },
        resetToken: String,
        resetTokenExpiry: Date
    },
    { timestamps: true }
);

schoolschema.pre("save", function (next) {
    let schooltData = this;
    bcrypt
        .hash(this.password, Number(process.env.BCRYPT_HASH))
        .then(function (hash) {
            console.log('hash',hash)
            schooltData.password = hash;
            next();
        })
        .catch((err) => {
            next("err");
        });
});
let student = mongoose.model("school", schoolschema);
module.exports = student;
