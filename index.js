const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
dotenv.config();

// Internal Import
// const {notFoundHandler, errorHandler } = require("./middlewares/common/errorHandler");
const adminRouter = require("./router/adminRouter");
const resAdminRouter = require("./router/resAdminRouter");
const publicRouter = require("./router/publicRouter");
const loginCheckRouter = require("./router/loginCheckRouter");

// request parsers
app.use(cors());
app.use(express.json());

// database connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connection successful !!!"))
  .catch((err) => console.log(err));

// routing setup
app.use("/admin", adminRouter);
app.use("/loginCheck", loginCheckRouter);
app.use("/resAdmin", resAdminRouter);
// app.use("/", publicRouter);

// port listening
app.listen(process.env.PORT, () => {
  console.log(`My Server listening at ${process.env.PORT}`);
  console.log("Server running successfully");
});
