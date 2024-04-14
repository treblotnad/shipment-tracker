const express = require('express');
const router = express.Router();
const { getId, getTracking } = require('./axiosAPI');

// Endpoint to initiate tracking
router.post('/trackshipment', async (req, res) => {
  console.log(req.body)
  const { tracking, carrier } = req.body;
  try {
    const hiveId = await getId(tracking, carrier);
    const shipmentDetails = await getTracking(hiveId);
    res.json(shipmentDetails);
  } catch (error) {
    res.status(500).json({ message: "Failed to process tracking request", error: error.toString() });
  }
});

module.exports = router;
