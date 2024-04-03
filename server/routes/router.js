const express = require("express");
const multer = require('multer');
const router = express.Router();
const controllerStudent = require("../controllers/student");
const controllerAdmin = require("../controllers/admin");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

router.post("/student-login", controllerStudent.loginstudent);
router.post("/student-register", controllerStudent.registerstudent);
router.post("/admin-login", controllerAdmin.loginadmin);

module.exports = router;