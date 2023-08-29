const express = require("express");
const router = new express.Router();
const departmentController = require("../controllers/student/department");

router.post("/department", departmentController.addDepartment);
router.get("/department", departmentController.getDepartment);
router.get("/department/:id", departmentController.getDepartment);
router.put("/department/:id", departmentController.updateDepartment);
router.delete("/department/:id", departmentController.deleteDepartment);
module.exports = router;
