import { useState } from "react";
import { Container, Alert } from "react-bootstrap";
import SearchTrackingHome from "../components/SearchTrackingHome";
import ShipmentCardHome from "../components/ShipmentCardHome";


const Home = () => {

  const [shipmentDetails, setShipmentDetails] = useState(null);
  const [error, setError] = useState(null);

  const handleResults = (data) => {
    setShipmentDetails(data);
    setError(null);
  };

  const handleError = (message) => {
    setError(message);
    setShipmentDetails(null);
  };

  const handleInputClear = () => {
    setShipmentDetails(null);  // clear existing shipment details when new input is started
  };

  return (
    <Container>
      <h1>Track a Package</h1>
      <SearchTrackingHome
        onResults={setShipmentDetails}
        onError={setError}
        onInputClear={handleInputClear}
      />
      {error && <Alert variant="danger">{error}</Alert>}
      {shipmentDetails && <ShipmentCardHome shipmentDetails={shipmentDetails} />}
    </Container>
  );
};

export default Home;