const { Schema } = require("mongoose");

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedShipments` array in User.js
const shipmentSchema = new Schema({
  tracking: {
    type: String,
    required: true,
  },
  carrier: {
    type: String,
    required: true,
  },
  isDelivered: {
    type: Boolean,
    default: false,
  },
});

module.exports = shipmentSchema;
