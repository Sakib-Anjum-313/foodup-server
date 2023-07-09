
// internal export 
const NewRestaurant = require("../models/NewRestaurant");
const TableInfo = require("../models/TableInfo");

async function myRestaurant(req, res, next) {
     const resEmail = req.params.email;
     // console.log(resEmail);
     const query = { Email: resEmail };
     try {
        const result = await NewRestaurant.findOne(query);
        res.status(200).send(result);
     } catch (error) {
        res.status(500).json({
          errors: `${error}`,
        });
     }
}


async function editTableInfo(req, res, next) {
    const resEmail = req.params.email;
    const resTableList = req.body;
    const filter = { ResEmail: resEmail };
    const options = { upsert: true };
    const updateDoc = {
      $set: {
        Tables: resTableList,
      },
    };
    try {
        const result = await TableInfo.findOneAndUpdate(
          filter,
          updateDoc,
          options
        );
       res.status(200).json({ acknowledged : true}); 
    } catch (error) {
        res.status(500).json({
          errors: `${error}`,
        });
    }
}

async function allTableInfo(req, res, next) {
    const resEmail = req.params.email;
    const query = { ResEmail: resEmail };
    try {
        const result = await TableInfo.findOne(query);
        res.status(200).send(result);
    } catch (error) {
         res.status(500).json({
           errors: `${error}`,
         });
    }
   
   
    
}


module.exports = {
  myRestaurant,
  editTableInfo,
  allTableInfo,
};