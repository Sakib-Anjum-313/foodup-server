//internal import
const NewRestaurant = require("../models/NewRestaurant");
const Client = require("../models/Client");


//controller
async function resAdminCheck(req, res, next) {
  const resAdminEmail = req.params.email;
  try {
    const result = await NewRestaurant.findOne({ Email: resAdminEmail });
    res.status(200).sent(result);
  } catch (error) {
    res.status(500).json({
      errors: `${error}`,
    });
  }
}

async function checkingUserRole(req, res, next) {
    const userEmail = req.params.email;
    console.log(userEmail);
    
    try {
      const query = { Email: userEmail };
      const result = await Client.findOne(query);
        res.status(200).send(result);
        
  } catch (error) {
    res.status(500).json({
      errors: `${error}`,
    });
  }
}

module.exports = {
  resAdminCheck,
  checkingUserRole,
};
