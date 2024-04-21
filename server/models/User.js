const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// import schema from Shipment.js
const shipmentSchema = require('./Shipment');

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    // set savedShipments to be an array of data that adheres to the shipmentSchema
    savedShipments: [shipmentSchema],
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `shipmentCount` with the number of saved shipments we have
userSchema.virtual('shipmentCount').get(function () {
  return this.savedShipments.length;
});

const User = model('User', userSchema);

module.exports = User;
