const mongoose = require("mongoose");


const newRestaurantSchema = mongoose.Schema(
  {
    OwnerName: {
      type: String,
      required: true,
      trim: true,
    },
    RestaurantName: {
      type: String,
      required: true,
      trim: true,
    },
    Email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    City: {
      type: String,
      required: true,
    },
    Role: {
      type: String,
      enum: ["Admin", "ResAdmin", "Public"],
      default: "resAdmin",
    },
  },
  {
    timestamps: true,
  }
);

const NewRestaurant = mongoose.model("Restaurant", newRestaurantSchema);

module.exports = NewRestaurant;