import { useState } from "react";
// import { Form } from 'react-bootstrap';
import axios from "axios";
import { matchCarrier } from "../utils/carrierValidate";
const BASE_URL = "http://localhost:3001";
import {
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";

export default function SearchTrackingHome({
  onResults,
  onError,
  onInputClear,
}) {
  const [trackingNumber, setTrackingNumber] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    const carrier = matchCarrier(trackingNumber);
    if (!trackingNumber || !carrier) {
      onError("Please enter a valid tracking number.");
      return;
    }

    try {
      onError(null); // clears any previous error message
      onInputClear(); // clears any previous results when trying a new search
      const response = await axios.post(BASE_URL + "/api/trackshipment", {
        tracking: trackingNumber,
        carrier,
        isDashboard: false,
      });
      const shipmentData = response.data.shipmentDetails;
      const mapImage = response.data.image;

      if (!shipmentData || shipmentData.trackings.tag === "Pending") {
        onError("No shipment found or the shipment is currently pending.");
      } else {
        onResults(shipmentData, mapImage);
      }
    } catch (error) {
      console.error("Failed to fetch tracking details:", error);
      onError("Failed to fetch tracking details");
    }
  };

  const handleInputChange = (e) => {
    if (e.target.value !== trackingNumber) {
      onError(null); // clears any previous error message
      onInputClear(); // clears any previous results when trying a new search
    }
    setTrackingNumber(e.target.value);
  };

  return (
    <FormControl onSubmit={handleSearch}>
      <InputGroup>
        <Input
          h="2.5rem"
          type="text"
          // value={input}
          placeholder="Enter a tracking number"
          onChange={handleInputChange}
        />
        <InputRightElement width="5rem">
          <Button
            h="2rem"
            size="md"
            type="submit"
            mr="2"
            colorScheme="blue"
            onClick={handleSearch}
          >
            Search
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
}
