async function run() {
  try {
    await client.connect();
    console.log("database connected succesfully");
    const database = client.db("FoodUp");
    const restaurantCollection = database.collection("RestaurantList");
    const clientCollection = database.collection("Admin&ResAdminList");
    const tableInfoCollection = database.collection("TableInfo");
    const foodCategoryCollection = database.collection("FoodCategory");

    //adding new restaurant user
    // app.post("/addNewRestaurant", async (req, res) => {
    //   // console.log(req.body);
    //   const newResUser = {
    //     OwnerName: req.body.OwnerName,
    //     RestaurantName: req.body.RestaurantName,
    //     Email: req.body.Email,
    //     City: req.body.City,
    //     Role: "ResAdmin",
    //   };
    //   const result = await restaurantCollection.insertOne(newResUser);

    //   const newClient = {
    //     Name: newResUser.OwnerName,
    //     Email: newResUser.Email,
    //     Role: "ResAdmin",
    //   };

    //   const insertNewUserToDb = await clientCollection.insertOne(newClient);

    //   res.send(result);
    // });

    //Find All Restaurants

    // app.get("/adminPage/allRestaurantList", async (req, res) => {
    //   const query = {};

    //   const cursor = restaurantCollection.find(query);

    //   const allRestaurantList = await cursor.toArray();
    //   res.send(allRestaurantList);
    // });

    //Checking restaurant admin

    app.get("/resAdminCheck/:email", async (req, res) => {
      const userEmail = req.params.email;
      // console.log(userEmail);
      const query = { Email: userEmail };
      const result = await restaurantCollection.findOne(query);
      // console.log(result);
      if (result) {
        res.send(result);
      } else {
        res.send(false);
      }
    });

    //checking user Role

    // app.get("/checkingUserRole/:email", async (req, res) => {
    //   const userEmail = req.params.email;
    //   // console.log(userEmail);
    //   const query = { Email: userEmail };
    //   const result = await clientCollection.findOne(query);
    //   // console.log(result);
    //   if (result) {
    //     res.send(result);
    //   } else {
    //     res.send(false);
    //   }
    // });

    //find my restaurant by email

    app.get(`/restaurantAdmin/myRestaurant/:email`, async (req, res) => {
      const resEmail = req.params.email;
      // console.log(resEmail);
      const query = { Email: resEmail };
      const result = await restaurantCollection.findOne(query);
      res.send(result);
    });

    // uploading the restaurant table info by res email

    app.put(`/restaurantAdmin/editTableInfo/:email`, async (req, res) => {
      console.log("resTableList");
      const resEmail = req.params.email;
      const resTableList = req.body;
      // console.log(resTableList);
      const filter = { ResEmail: resEmail };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          Tables: resTableList,
        },
      };

      const result = await tableInfoCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });

    // get tableinfo by res email

    app.get("/restaurantAdmin/allTableInfo/:email", async (req, res) => {
      const resEmail = req.params.email;
      const query = { ResEmail: resEmail };
      const result = await tableInfoCollection.findOne(query);
      res.send(result);
    });

    //update live table tracking
    app.put(
      "/restaurantAdmin/liveTableTracking/updateTable/:email",
      async (req, res) => {
        const resEmail = req.params.email;
        const resTableList = req.body;
        const filter = { ResEmail: resEmail };
        const options = { upsert: true };
        const updateDoc = {
          $set: {
            Tables: resTableList,
          },
        };

        const result = await tableInfoCollection.updateOne(
          filter,
          updateDoc,
          options
        );
        res.send(result);
      }
    );

    // adding restaurant food category by email

    app.put(`/restaurantAdmin/menuEdit/:email`, async (req, res) => {
      const resEmail = req.params.email;
      const foodCategory = req.body;

      // console.log(resEmail, category);
      const filter = { ResEmail: resEmail };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          FoodCategories: foodCategory,
        },
      };

      const result = await foodCategoryCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });

    app.get("/restaurantAdmin/menuEdit/category/:email", async (req, res) => {
      const resEmail = req.params.email;

      const query = { ResEmail: resEmail };
      const allCategoryList = await foodCategoryCollection.findOne(query);
      res.send(allCategoryList);
    });

    // delete a food card

    app.delete(
      "/restaurantAdmin/menuEdit/category/deleteAFoodCard/:email",
      async (req, res) => {
        // console.log(req.body);
        // res.send("data found");
      }
    );
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);
