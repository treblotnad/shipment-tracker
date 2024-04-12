const axios = require("axios");
require("dotenv").config({ path: require("find-config")(".env") });

const getId = async (tracking, carrier) => {
  try {
    const { data } = await axios.post(
      "https://api.trackinghive.com/trackings/",
      {
        tracking_number: tracking,
        slug: carrier,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.AUTHORIZATION,
        },
        validateStatus(status) {
          return status < 400 || status === 409;
        },
      }
    );
    return data.data._id;
  } catch (error) {
    console.log(error.toJSON());
  }
};

// getId("9434609105114603215305", "usps").then((id) => console.log({ id }));

module.exports = getId;
