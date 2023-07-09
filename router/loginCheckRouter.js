// external imports
const express = require("express");


// internal import 
const router = express.Router();
const {
  resAdminCheck,
  checkingUserRole,
} = require("../controller/loginCheckController");


// login check
router.get("/resAdminCheck/:email", resAdminCheck);
router.get("/checkingUserRole/:email", checkingUserRole);






module.exports = router;
