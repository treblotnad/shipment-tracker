import { dateToWeekDate, dateToShortDate } from "../utils/datetime";
import Status from "./Status";

import {
  Card,
  CardHeader,
  CardBody,
  Text,
  Image,
  Grid,
  GridItem,
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";

import { ArrowRightIcon } from "@chakra-ui/icons";

const logo = {
  ups: "/images/ups.png",
  fedex: "/images/fedex.png",
  usps: "/images/usps.png",
};

let arrived = 'Arriving ';
export default function ShipmentCardHome({ shipmentDetails, mapImage }) {
  function etaDefine() {
    if (shipmentDetails.current_status === "Delivered") {
      arrived = 'Arrived ';
      return dateToWeekDate(shipmentDetails.trackings.shipment_delivery_date);
    } else {
      return (
        dateToWeekDate(shipmentDetails.trackings.expected_delivery) ||
        "ETA not available"
      );
    }
  }
  const eta = etaDefine();

  const isNarrowScreen = useBreakpointValue({ base: true, md: false });

  return (
    <>
      {/* {console.log(shipmentDetails)} */}
      <Card boxShadow="dark-lg" p="6" rounded="md" bg="white" mt={12} mb={20} mx={20}>
        <CardHeader>
          <Flex
            justifyContent={{ base: 'center', md: 'space-between' }}
            alignItems='center'
            flexWrap='wrap'
            spacing={10}
          >

            {/* Logo based on the carrier */}
            <Box pt={2} pb={5}>
              <Center m='auto'>
                <Grid templateColumns="1fr 4fr" gap={4}>
                  {/* Logo */}
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
              </Center>
            </Box>

            {/* Ship From and Ship To */}
            <Box pb={5} px={4}>
              <Box border='1px' borderColor='gray.300' borderRadius='md' pt='3' px='5' bg='gray.50'>
                <Center m='auto'>

                  {isNarrowScreen ? (

                    <VStack spacing={1} alignItems='center' align='center'>
                      <Text fontWeight="bold" fontSize='auto'>
                        {shipmentDetails.trackings.address.ship_from.city},{" "}
                        {shipmentDetails.trackings.address.ship_from.state}{" "}
                        <Center><ArrowRightIcon boxSize={4} mt={4} color='green' /></Center>
                      </Text>
                      <Text fontWeight="bold" fontSize='auto'>
                        {shipmentDetails.trackings.address.ship_to.city},{" "}
                        {shipmentDetails.trackings.address.ship_to.state}
                      </Text>
                    </VStack>

                  ) : (
                    <HStack spacing={1} alignItems='center'>
                      <Text fontWeight="bold" fontSize='auto'>
                        {shipmentDetails.trackings.address.ship_from.city},{" "}
                        {shipmentDetails.trackings.address.ship_from.state}{" "}
                        <ArrowRightIcon boxSize={5} mx={12} color='green' mt='auto' />
                      </Text>
                      <Text fontWeight="bold" fontSize='auto'>
                        {shipmentDetails.trackings.address.ship_to.city},{" "}
                        {shipmentDetails.trackings.address.ship_to.state}
                      </Text>
                    </HStack>
                  )}
                </Center>
              </Box>
            </Box>

            {/* ETA */}
            <Box pt='3' pb='5'>
              <Center m='auto'>
                {isNarrowScreen ? (

                  <VStack spacing={1} m='auto'>

                    <Text fontWeight="bold" fontSize='lg' pr='3'>{arrived}{eta}</Text>

                    {/* Status */}
                    <Box m='auto' pr='2' >
                      <Status status={shipmentDetails.trackings.tag} />
                    </Box>
                  </VStack>

                ) : (
                  <HStack spacing={1} alignItems='center'>
                    <Box pr='5'>
                      <Text fontWeight="bold" fontSize='lg' pr='3'>{arrived}{eta}</Text>
                    </Box>
                    {/* Status */}
                    <Box pr='2' mt={-2}>
                      <Status status={shipmentDetails.trackings.tag} />
                    </Box>
                  </HStack>
                )}
              </Center>
            </Box>

          </Flex>
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

            <GridItem pl='5'>

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
}