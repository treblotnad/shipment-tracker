const { User, Shipment } = require("../models");
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require("../utils/auth");
const { getId, getTracking } = require("../utils/axiosAPI");
const axios = require("axios");
require("dotenv").config();

// Helper function to fetch traking details using the ID from getID:
const getTrackingDetails = async (trackingId) => {
  try {
    const response = await axios.get(
      `https://api.trackinghive.com/trackings/${trackingId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.AUTHORIZATION,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch tracking details", error);
    throw new Error("Failed to fetch tracking details");
  }
};

const resolvers = {
  Query: {
    // get a single user by their username
    me: async (parent, args, context) => {
      if (context.user) {
        try {
          const response = await User.findOne({
            _id: context.user._id,
          }).populate("savedShipments");

          response.hiveData = await Promise.all(
            response.savedShipments.map(async (shipment) => {
              let hiveData = await getTracking(shipment.hiveId);

              hiveData.mongoId = shipment._id;

              // console.log(hiveData.mongoId);
              return hiveData;
            })
          );

          // console.log(response.hiveData);
          return response;
        } catch (error) {
          console.log(error.toJSON());
        }
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    getTrackingInfo: async (_, { tracking, carrier }) => {
      const trackingId = await getId(tracking, carrier);
      if (!trackingId) {
        throw new Error("Failed to create tracking entry");
      }
      const shipmentDetails = await getTrackingDetails(trackingId);
      return {
        _id: trackingId,
        tracking,
        carrier,
        isDelivered: shipmentDetails.isDelivered,
      };
    },
  },

  Mutation: {
    // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect email or password');
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError();
      }

      const token = signToken(user);
      return { token, user };
    },

    // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
    addUser: async (parent, { firstname, lastname, email, password }) => {
      const user = await User.create({ firstname, lastname, email, password });
      const token = signToken(user);
      return { token, user };
    },

    // update user
    updateUser: async (parent, { id, firstname, lastname, email }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not authorized');
      }

      const updatedUser = await User.findByIdAndUpdate(
        id,
        { $set: { firstname: firstname, lastname: lastname, email: email} },
        { new: true }
      );

      if (!updatedUser) {
        throw new Error('User not found');
      }

      return updatedUser
    },

    // save a shipment to a user's `savedShipments` field by adding it to the set (to prevent duplicates)
    saveShipment: async (_, { userId, shipmentData }, context) => {
      try {
        const hiveId = await getId(shipmentData.tracking, shipmentData.carrier);
        // console.log("IN TRY BLOCK");
        // console.log(hiveId);
        shipmentData.hiveId = hiveId;
        const user = await User.findByIdAndUpdate(
          userId,
          { $push: { savedShipments: shipmentData } },
          { new: true }
        );
        
        return user;
      } catch (e) {
        console.error(e.reponse);
        // console.log(e.data.data);
      }
    },

    // remove a shipment from `savedShipments`
    removeShipment: async (parent, { userId, shipmentId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: userId },
          { $pull: { savedShipments: { _id: shipmentId } } },
          { new: true }
        );
        // console.log(User);
        return User;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
