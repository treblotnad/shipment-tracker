const { User, Shipment } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const { getId, getTracking } = require("../utils/axiosAPI");

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
              return await getTracking(shipment.hiveId);
            })
          );

          console.log(response.hiveData);
          return response;
        } catch (error) {
          console.log(error.toJSON());
        }
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError();
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError();
      }

      const token = signToken(user);
      return { token, user };
    },

    // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    // save a shipment to a user's `savedShipments` field by adding it to the set (to prevent duplicates)
    saveShipment: async (_, { userId, shipmentData }, context) => {
      try {
        const hiveId = await getId(shipmentData.tracking, shipmentData.carrier);
        // console.log("IN TRY BLOCK");
        console.log(hiveId);
        shipmentData.hiveId = hiveId;
        const user = await User.findByIdAndUpdate(
          userId,
          { $push: { savedShipments: shipmentData } },
          { new: true }
        );
        console.log(hiveId);
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
          { $pull: { savedShipments: { shipmentId } } },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
