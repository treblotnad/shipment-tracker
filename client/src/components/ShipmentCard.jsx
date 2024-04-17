import { useMutation } from "@apollo/client";
import { REMOVE_SHIPMENT } from "../utils/mutations";
import Auth from "../utils/auth";
import { dateToWeekDate, dateToShortDate } from "../utils/datetime";
import Status from "./Status";

import {
  Box,
  Text,
  Button,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Accordion,
  Grid,
  GridItem,
  Center,
  Image,
  SimpleGrid,
  Flex,
  Spacer,
} from "@chakra-ui/react";
const logo = {
  ups: "/images/ups.png",
  fedex: "/images/fedex.png",
  usps: "/images/usps.png",
};
import { ArrowRightIcon } from "@chakra-ui/icons";

export default function ShipmentCard({
  shipmentId,
  tracking_number,
  slug,
  props,
}) {
  const [removeShipment] = useMutation(REMOVE_SHIPMENT, {
    refetchQueries: ["me"],
  });
//   console.log(props);
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
  function etaDefine() {
    if (props.current_status === "Delivered") {
      return dateToWeekDate(props.trackings.shipment_delivery_date);
    } else {
      return (
        dateToWeekDate(props.trackings.expected_delivery) || "Not available"
      );
    }
  }
  const eta = etaDefine();

  return (
    <AccordionItem>
      <AccordionButton>
        <Grid templateColumns="100px 1.5fr 3fr 1fr 150px" gap={3}>
          {/* Logo based on the carrier, with image sources in the const above */}
          <GridItem>
            {props.slug === "ups" && (
              <Image src={logo.ups} alt="UPS" height="40px" />
            )}
            {props.slug === "fedex" && (
              <Image src={logo.fedex} alt="FedEx" height="40px" />
            )}
            {props.slug === "usps" && (
              <Image src={logo.usps} alt="USPS" height="40px" />
            )}
          </GridItem>
          <GridItem alignSelf="center">
            {/* <Center h='40px'> */}
            <Text fontWeight="bold">{props.tracking_number}</Text>
            {/* </Center> */}
          </GridItem>
          <GridItem>
            <Center h="40px">
              <Text fontWeight="bold">
                {props.trackings.address.ship_from?.city},{" "}
                {props.trackings.address.ship_from?.state}{" "}
                <ArrowRightIcon boxSize={8} mx={12} />
                {props.trackings.address.ship_to?.city},{" "}
                {props.trackings.address.ship_to?.state}
              </Text>
            </Center>
          </GridItem>

          <GridItem align="right">
            <Center h="40px">
              <Text fontWeight="bold">{eta}</Text>
            </Center>
          </GridItem>

          <GridItem align="right">
            <Status status={props.current_status} />
            <AccordionIcon />
          </GridItem>
        </Grid>
      </AccordionButton>

      <AccordionPanel>
        <Grid templateColumns="1fr 2fr" gap={4}>
          <GridItem>
            <Image src="images/map.jpg" alt="Map" />
            <Text color="gray" fontSize="sm" mt={2}>
              <strong>{props.trackings.shipment_type || ""}</strong> • Shipped
              on {dateToWeekDate(props.trackings.shipment_pickup_date)}
            </Text>
          </GridItem>

          <GridItem>
            {/* Each checkpoint and message */}
            <Grid templateColumns="repeat(3, 1fr)" gap={1}>
              {props.trackings.checkpoints.map((checkpoint, index) => {
                if (index === 0) return null; // Skip the first checkpoint
                return (
                  <GridItem key={index}>
                    <Box pl={3} pb={5}>
                      <Text mb={0}>
                        {dateToShortDate(checkpoint.checkpoint_time)}:{" "}
                        {checkpoint.city}, {checkpoint.state}
                      </Text>
                      <Text as="i" color="gray">
                        {checkpoint.message}
                      </Text>
                    </Box>
                  </GridItem>
                );
              })}
            </Grid>
          </GridItem>
        </Grid>
        <Button colorScheme="red" onClick={handleRemoveShipment}>
          Remove
        </Button>
      </AccordionPanel>
    </AccordionItem>
  );
}
