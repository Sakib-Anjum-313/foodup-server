// external imports
const express = require("express");


// internal import 
const router = express.Router();
const {
  addNewRestaurant,
  allRestaurantList,
} = require("../controller/adminController");


// Admin Router
// get methods
router.get("/allRestaurantList", allRestaurantList);

// post methods
router.post("/addNewRestaurant", addNewRestaurant);


// put methods

// delete methods


module.exports = router;
