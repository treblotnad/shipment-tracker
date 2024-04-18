import { dateToWeekDate, dateToShortDate } from "../utils/datetime";
import Status from "./Status";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Container,
  Text,
  Image,
  Grid,
  GridItem,
  Box,
  Center,
  Divider,
} from "@chakra-ui/react";

import { ArrowRightIcon } from "@chakra-ui/icons";

const logo = {
  ups: "/images/ups.png",
  fedex: "/images/fedex.png",
  usps: "/images/usps.png",
};

export default function ShipmentCardHome({ shipmentDetails, mapImage }) {
  function etaDefine() {
    if (shipmentDetails.current_status === "Delivered") {
      return dateToWeekDate(shipmentDetails.trackings.shipment_delivery_date);
    } else {
      return (
        dateToWeekDate(shipmentDetails.trackings.expected_delivery) ||
        "ETA not available"
      );
    }
  }
  const eta = etaDefine();
  return (
    <>
      {console.log(shipmentDetails)}
      <Card boxShadow="dark-lg" p="6" rounded="md" bg="white" mt={12} mb={20} mx={20}>
        <CardHeader>
          <Grid templateColumns=
            {{
              base: "repeat(1fr)",
              md: "1fr 1.8fr 1.3fr",
            }}
            gap={4}

            alignItems="center"
          >

            {/* Logo based on the carrier, with image sources in the const above */}
            <GridItem pt={2}>
              <Grid templateColumns="1fr 4fr" gap={4}>
                {shipmentDetails.slug === "ups" && (
                  <Image src={logo.ups} alt="UPS" height="40px" />
                )}
                {shipmentDetails.slug === "fedex" && (
                  <Image src={logo.fedex} alt="FedEx" height="40px" />
                )}
                {shipmentDetails.slug === "usps" && (
                  <Image src={logo.usps} alt="USPS" height="40px" />
                )}

                {/* Tracking Number */}
                <Text fontWeight="bold" fontSize='lg' color='dark-grey'>{shipmentDetails.tracking_number}</Text>
              </Grid>
            </GridItem>

            {/* Ship From and Ship To */}
            <GridItem>
              <Center>
                <Box border='1px' borderColor='gray.300' borderRadius='md' pt='3' px='5' bg='gray.50'>
                  <Text fontWeight="bold" fontSize='auto'>
                    {shipmentDetails.trackings.address.ship_from.city},{" "}
                    {shipmentDetails.trackings.address.ship_from.state}{" "}
                    <ArrowRightIcon boxSize={5} mx={12} color='green' mt='auto' />
                    {shipmentDetails.trackings.address.ship_to.city},{" "}
                    {shipmentDetails.trackings.address.ship_to.state}
                  </Text>
                </Box>
              </Center>
            </GridItem>

            {/* ETA */}
            <GridItem pt='3' align='center'>
              <Grid templateColumns="4fr 1fr" gap={4}>
                <Text fontWeight="bold" fontSize='lg' pr='3'>Arriving {eta}</Text>

                {/* Status */}
                <Box m={{
                  base: 'auto',
                  md: '-2'
                }} pr='2'>
                  <Status status={shipmentDetails.trackings.tag} />
                </Box>
              </Grid>
            </GridItem>

          </Grid>
        </CardHeader >

        <Divider color='gray' />

        {/* The map on the left, and all the checkpoints on the right */}
        < CardBody >
          <Grid templateColumns={{
            base: '1fr',
            md: '1fr 3fr'
          }}
            gap={4} >
            <GridItem>
              <Image src={mapImage} alt="Shipment Map" />
              <Text color='gray' fontSize='sm' mt={2}>
                <strong>{shipmentDetails.trackings.shipment_type || ''}</strong> • Shipped on {dateToWeekDate(shipmentDetails.trackings.shipment_pickup_date)}
              </Text>
            </GridItem>

            <GridItem>

              {/* Each checkpoint and message */}
              <Grid templateColumns='repeat(3, 1fr)' gap={1}>


                {shipmentDetails.trackings.checkpoints.map((checkpoint, index) => {
                  if (index === 0 || checkpoint.location == '') return null; // Skip the first checkpoint
                  return (
                    <GridItem key={index}>
                      <Box pl={3} pb={5}>
                        <Text mb={0} fontSize='sm'>
                          {dateToShortDate(checkpoint.checkpoint_time)}: {checkpoint.location.trim()}
                        </Text>
                        <Text as='i' color='gray' fontSize='sm' >
                          {checkpoint.message}
                        </Text>
                      </Box>
                    </GridItem>
                  );
                })}
              </Grid>
            </GridItem>
          </Grid>
        </CardBody >
      </Card >
    </>
  );
};