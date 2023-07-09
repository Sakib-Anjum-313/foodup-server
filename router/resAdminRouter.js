// external imports
const express = require("express");

// internal import
const router = express.Router();
const {
  myRestaurant,
  editTableInfo,
  allTableInfo,
} = require("../controller/resAdminController");

// Res Admin Router
// get methods
router.get("/myRestaurant/:email", myRestaurant);
router.get("/allTableInfo/:email", allTableInfo);

// post methods
// router.post("/addNewRestaurant", addNewRestaurant);

// put methods
router.put("/editTableInfo/:email", editTableInfo);

// delete methods

module.exports = router;
