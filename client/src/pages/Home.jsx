import { useState } from "react";
// import { useLazyQuery } from "@apollo/client";
import { Container, Col, Form, Button, Card, Row, Alert } from "react-bootstrap";

// import Auth from "../utils/auth";
// import { saveShipmentIds, getSavedShipmentIds } from "../utils/localStorage";

// import { useMutation } from "@apollo/client";
// import { SAVE_SHIPMENT } from "../utils/mutations";

//import the query to get the tracking information for a search
// import { GET_TRACKING_INFO } from "../utils/queries";
import { matchCarrier } from "../utils/carrierValidate";
import axios from "axios";


const Home = () => {

  const [trackingNumber, setTrackingNumber] = useState('');
  const [shipmentDetails, setShipmentDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    const carrier = matchCarrier(trackingNumber);
    if (!trackingNumber || !carrier) {
      alert('Please enter a valid tracking number.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await axios.post('http://localhost:3001/api/trackshipment', {
        tracking: trackingNumber,
        carrier
      });
      setShipmentDetails(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tracking info:', error);
      setError(error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setTrackingNumber(e.target.value);
  };

  return (
    <Container>
      <h1>Track a Package</h1>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Group>
          <Form.Label>Tracking Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Type in Tracking Number"
            value={trackingNumber}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? 'Loading...' : 'Search'}
        </Button>
      </Form>

      {error && <Alert variant="danger">{error}</Alert>}

      {shipmentDetails && (
        <Card>
          <Card.Header>Tracking Details</Card.Header>
          <Card.Body>
            <Card.Text>Status: {shipmentDetails.trackings.tag}</Card.Text>
            <Card.Text>Ship From: {shipmentDetails.trackings.address.ship_from.address_line1} {shipmentDetails.trackings.address.ship_from.city}, {shipmentDetails.trackings.address.ship_from.state}</Card.Text>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default Home;