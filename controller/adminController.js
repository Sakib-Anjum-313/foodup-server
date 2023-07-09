// internal imports
const NewRestaurant = require("../models/NewRestaurant");
const Client = require("../models/Client");

async function addNewRestaurant(req, res, next) {
  let newRestaurant;
  let newClient;

  const newResUser = {
    OwnerName: req.body.OwnerName,
    RestaurantName: req.body.RestaurantName,
    Email: req.body.Email,
    City: req.body.City,
    Role: "ResAdmin",
  };
  const newResClient = {
    Name: req.body.OwnerName,
    Email: req.body.Email,
    Role: "ResAdmin",
  };

  newRestaurant = new NewRestaurant({
    ...newResUser,
  });

  newClient = new Client({
    ...newResClient,
  });

  // save user or send error
  try {
    const addRestaurant = await newRestaurant.save();
    const addClient = await newClient.save();

    res.status(200).json({ acknowledged: true });
  } catch (error) {
    res.status(500).json({
      errors: `${error}`,
    });
  }
}

async function allRestaurantList(req, res, next) {
  try {
    const allRestaurant = await NewRestaurant.find();
    res.status(200).send(allRestaurant);
  } catch (error) {
    res.status(500).json({
      errors: `${error}`,
    });
  }
}

module.exports = {
  addNewRestaurant,
  allRestaurantList,
};
