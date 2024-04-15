import { useState } from "react";
import { Container } from "react-bootstrap";
import Hero from "../components/Hero";
import SearchTrackingHome from "../components/SearchTrackingHome";
import ShipmentCardHome from "../components/ShipmentCardHome";
import {
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Image,
  Divider,
  AbsoluteCenter,
  VStack,
} from "@chakra-ui/react";

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
      <Hero />
      <p></p>

      <Box position='relative' padding='10'>
        <Divider />
        <AbsoluteCenter bg='white' px='4'>
          Try it out
        </AbsoluteCenter>
      </Box>


      <VStack spacing={1} justify='center'>
        <Box w={{ base: "100%", md: "70%" }} >
          <SearchTrackingHome
            onResults={setShipmentDetails}
            onError={setError}
            onInputClear={handleInputClear}
          />

          {error && <Alert status='error'>
            <AlertIcon />
            <AlertTitle>{error}</AlertTitle>
          </Alert>}
        </Box>
      </VStack>


      <Container maxW={'7xl'}>
        {shipmentDetails && <ShipmentCardHome shipmentDetails={shipmentDetails} />}
      </Container >

    </Container >
  );
};

export default Home;


