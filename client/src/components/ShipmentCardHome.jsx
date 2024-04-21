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
  Spacer,
  useBreakpointValue,
  Container,
  Badge
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

  { console.log(shipmentDetails) }

  if (isNarrowScreen) {
    return (

      <Card boxShadow="dark-lg" p="0" rounded="md" bg="white" mt={12} mb={20} mx={4}>
        <CardHeader>
          <Flex
            justify='space-between'
            wrap='wrap'
            spacing={4}
          >

            <Container>
              <Flex mx={-2}>
                {/* Logo */}
                {shipmentDetails.slug === "ups" && (
                  <Image src={logo.ups} alt="UPS" height="30px" />
                )}
                {shipmentDetails.slug === "fedex" && (
                  <Image src={logo.fedex} alt="FedEx" height="30px" />
                )}
                {shipmentDetails.slug === "usps" && (
                  <Image src={logo.usps} alt="USPS" height="30px" />
                )}
                {/* Tracking Number */}
                <Text fontWeight="bold" fontSize='sm' color='dark-grey' mt='1' ml={2} pr='2' flexShrink={1} flexGrow={1} overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">{shipmentDetails.tracking_number}</Text>
                <Spacer />
                <Box ml='auto'>
                  <Status status={shipmentDetails.trackings.tag} fontSize={'xs'} />
                </Box>
              </Flex>
            </Container>

            {/* Ship From and Ship To */}
            <Container pt='2'>
              <HStack spacing={3}>
                <Text fontSize='sm'>
                  {shipmentDetails.trackings.address.ship_from.city},{" "}
                  {shipmentDetails.trackings.address.ship_from.state}{" "}
                  <ArrowRightIcon boxSize={2} mt={0} ml='2' color='green' />
                </Text>
                <Text fontSize='sm'>
                  {shipmentDetails.trackings.address.ship_to.city},{" "}
                  {shipmentDetails.trackings.address.ship_to.state}
                </Text>
              </HStack>
            </Container>

            {/* ETA */}
            <Container pt='2' mt={-4}>
              <Text fontWeight="bold" fontSize='sm'>{arrived}{eta}</Text>
            </Container>

          </Flex>
        </CardHeader >
        {/* The map on the left, and all the checkpoints on the right */}
        <CardBody mt={-6}>
          <Grid templateColumns={{
            base: '1fr',
            md: '1fr 3fr'
          }}
            gap={2} >
            <GridItem>
              <Image src={mapImage} alt="Shipment Map" />
              <Text color='gray' fontSize='sm' mt={2}>
                <strong>{shipmentDetails.trackings.shipment_type || ''}</strong> • Shipped on {dateToWeekDate(shipmentDetails.trackings.shipment_pickup_date)}
              </Text>
            </GridItem>

            <GridItem pr='3' ml='-2'>

              {/* Each checkpoint and message */}
              <Grid templateColumns='1fr' gap={0}>
                {shipmentDetails.trackings.checkpoints.map((checkpoint, index) => {
                  if (index === 0 || checkpoint.location == '') return null; // Skip the first checkpoint
                  return (
                    <GridItem key={index}>
                      <Box pl={3} pb={5}>
                        <Text mb={0} fontSize='xs'>
                          {dateToShortDate(checkpoint.checkpoint_time)}: {checkpoint.location.trim()} - <em>{checkpoint.message}</em>
                        </Text>
                        <Text as='i' color='gray' fontSize='xs' >

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
    )

  } else {

    return (

      <Card boxShadow="dark-lg" p="6" rounded="md" bg="white" mt={12} mb={20} mx={20}>
        <CardHeader>
          <Flex
            justifyContent={{ base: 'left', md: 'space-between' }}
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
                </Center>
              </Box>
            </Box>

            {/* ETA */}
            <Box pt='3' pb='5'>
              <Center m='auto'>

                <HStack spacing={1} alignItems='center'>
                  <Box pr='5'>
                    <Text fontWeight="bold" fontSize='lg' pr='3'>{arrived}{eta}</Text>
                  </Box>
                  {/* Status */}
                  <Box pr='2' mt={-2}>
                    <Status status={shipmentDetails.trackings.tag} />
                  </Box>
                </HStack>
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
                          <Badge variant='outline' mr='2'>{index}</Badge> {dateToShortDate(checkpoint.checkpoint_time)}: {checkpoint.location.trim()}
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
    )
  }
}