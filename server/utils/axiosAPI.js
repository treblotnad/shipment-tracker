const axios = require("axios");
require("dotenv").config({ path: require("find-config")(".env") });

const getId = async (tracking, carrier) => {
  const data = await axios.post(
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
    }
  );
  return data;
};

// getId("9434609105114603215305", "usps");

module.exports = getId;
