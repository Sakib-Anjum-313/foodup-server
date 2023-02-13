const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");

// Midleware
app.use(cors());
app.use(express.json());


// db id: foodup
// pass: NPqRWveqj0FgUsI2

const uri =
    "mongodb+srv://foodup:NPqRWveqj0FgUsI2@cluster0.dmfze9b.mongodb.net/?retryWrites=true&w=majority";
  
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
      await client.connect();
      console.log("database connected succesfully");
      const database = client.db("FoodUp");
      const restaurantCollection = database.collection("RestaurantList");
      const clientCollection = database.collection("Admin&ResAdminList");

      //adding new restaurant user
      app.post("/addNewRestaurant", async (req, res) => {
          console.log(req.body);
        const newResUser = {
          OwnerName: req.body.OwnerName,
          RestaurantName: req.body.RestaurantName,
          Email: req.body.Email,
          City: req.body.City,
          Role:"ResAdmin"
        };
        const result = await restaurantCollection.insertOne(newResUser);
        
        const newClient = {
          Name: newResUser.OwnerName,
          Email: newResUser.Email,
          Role: "ResAdmin",
        };

        const insertNewUserToDb = await clientCollection.insertOne(newClient);
          
          res.send(result);
      });

      //Find All Restaurants

      app.get("/adminPage/allRestaurantList", async(req, res) => {
        const query = {};
        
        const cursor =  restaurantCollection.find(query);

        const allRestaurantList = await cursor.toArray();
        res.send(allRestaurantList);
      });

    //Checking restaurant admin

    app.get("/resAdminCheck/:email", async (req, res) => {
      const userEmail = req.params.email;
      console.log(userEmail);
      const query = { Email: userEmail };
      const result = await restaurantCollection.findOne(query);
      console.log(result);
      if (result) {
        res.send(result);
      }
      else {
        res.send(false);
      }
    });


    //checking user Role

    app.get("/checkingUserRole/:email", async (req, res) => {
      const userEmail = req.params.email;
      console.log(userEmail);
      const query = { Email: userEmail };
      const result = await clientCollection.findOne(query);
      console.log(result);
       if (result) {
         res.send(result);
       } else {
         res.send(false);
       }
    });

    //find my restaurant by email

    app.get(`/restaurantAdmin/myRestaurant/:email`, async (req, res) => {
      const resEmail = req.params.email;
      console.log(resEmail);
      const query = { Email: resEmail };
      const result = await restaurantCollection.findOne(query);
      res.send(result);
    });

  


  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

// {
//           method: "POST",
//           headers: {
//             "content-type": "application/json",
//           },
//           body: JSON.stringify(data),
//         }


// app.post("/addNewRestaurant", async (req, res) => {
//   console.log(req.body);
//   res.send("get a new res admin");
// });

// app.get("/addNewRestaurant", async (req, res) => {
//   res.send("get a new res admin");
// });

app.get("/", (req, res) => {
  res.send("server is running in vercel");
});

// running the server

app.listen(port, () => {
    console.log(`My Server listening at ${port}`);
    console.log("Server running seccessfully");
})
