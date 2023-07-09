

const mongoose = require("mongoose");


const newClientSchema = mongoose.Schema({
  Name: {
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
  Role: {
    type: String,
    required: true,
    enum: ["Admin", "ResAdmin", "Public"],
  },
});

const Client = mongoose.model("Client", newClientSchema);

module.exports = Client;