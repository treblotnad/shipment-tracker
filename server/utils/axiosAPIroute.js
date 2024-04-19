const express = require("express");
const NodeGeocoder = require("node-geocoder");
const StaticMaps = require("staticmaps");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const { getId, getTracking } = require("./axiosAPI");

const marker = path.join(__dirname, "../../client/public/images/marker.png");

// const imagePath = './image.png';
const geocoderOptions = {
  provider: "opencage",
  apiKey: process.env.OPENCAGE,
};
const geocoder = NodeGeocoder(geocoderOptions);

const mapOptions = {
  width: 600,
  height: 400,
};

router.post("/trackshipment", async (req, res) => {
  const map = new StaticMaps(mapOptions);
  const { tracking, carrier, props, isDashboard } = req.body;
  try {
    let hiveId = "";
    let shipmentDetails = "";
    if (!isDashboard) {
      hiveId = await getId(tracking, carrier);
      shipmentDetails = await getTracking(hiveId);
    }
    if (isDashboard) {
      shipmentDetails = props;
    }

    const coords = []; // array to store all the geocoded coordinates for the map polyline

    // Geocode each checkpoint and then process the map
    const geocodePromises = shipmentDetails.trackings.checkpoints.map(
      (checkpoint) => {
        if (checkpoint.location !== "") {
          return geocoder.geocode(checkpoint.location);
        }
        return Promise.resolve([]); // if location is empty, return empty array
      }
    );

    const geocodedResults = await Promise.all(geocodePromises);
    geocodedResults.forEach((data) => {
      if (data.length > 0 && data[0].extra.confidence > 5) {
        const { latitude, longitude } = data[0];
        coords.push([longitude, latitude]); // Add the geocoded coordinates to the map polyline
        map.addMarker({
          coord: [longitude, latitude],
          img: marker,
          width: 48,
          height: 48,
        });
      }
      if (coords.length > 1) {
        // Only add a line if there are at least two points
        const line = {
          coords: coords,
          color: "#0000FFBB",
          width: 3,
        };
        map.addLine(line); // Add the polyline to the map
      }
      // } else {
      //   console.error('Geocode data missing or incomplete for checkpoint', data);
      // }
    });

    // Render the map after all markers have been added
    await map.render();

    let buffer = await map.image.buffer(`image/png`, {
      quality: 90,
    });
    const base64Image = `data:image/png;base64,${buffer.toString("base64")}`;

    res.json({ shipmentDetails, image: base64Image });
  } catch (error) {
    console.error("Failed to process tracking request:", error);
    res.status(500).json({
      message: "Failed to process tracking request",
      error: error.toString(),
    });
  }
});

module.exports = router;
