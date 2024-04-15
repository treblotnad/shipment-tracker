import { useMutation } from "@apollo/client";
import { REMOVE_SHIPMENT } from "../utils/mutations";
import Auth from "../utils/auth";
import {
  Box,
  Text,
  Button,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Accordion,
} from "@chakra-ui/react";

export default function ShipmentCard({ shipmentId, tracking_number, slug }) {
  const [removeShipment] = useMutation(REMOVE_SHIPMENT);

  const handleRemoveShipment = async () => {
    if (!Auth.loggedIn()) {
      console.error("Not logged in");
      return false;
    }

    try {
      await removeShipment({
        variables: {
          userId: Auth.getUser().data._id,
          shipmentId: shipmentId,
        },
      });
      console.log("Removed shipment", shipmentId);
    } catch (error) {
      console.error(error);
    }
  };
  return (
      <AccordionItem>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            <Text fontSize="lg" fontWeight="bold">
              Tracking: {tracking_number || "N/A"}
            </Text>
          </Box>

          <AccordionIcon />
        </AccordionButton>

        <AccordionPanel>
          <Text fontSize="lg">Carrier: {slug || "N/A"}</Text>
          <Button colorScheme="red" onClick={handleRemoveShipment}>
            Remove
          </Button>
        </AccordionPanel>
      </AccordionItem>
  );
}
