import { useMutation } from "@apollo/client";
import { REMOVE_SHIPMENT } from "../utils/mutations";
import Auth from "../utils/auth";
import { dateToWeekDate, dateToShortDate } from "../utils/datetime";
import Status from "./Status";
import axios from "axios";
import { useState } from "react";
// const BASE_URL = "http://localhost:3001";
import { BASE_URL } from "../../../config";

import {
  Text,
  Image,
  Grid,
  GridItem,
  Box,
  Center,
  Flex,
  HStack,
  VStack,
  useBreakpointValue,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  IconButton,
  Skeleton,
  Container,
  Spacer,
} from "@chakra-ui/react";

import { ArrowRightIcon, DeleteIcon } from "@chakra-ui/icons";

const logo = {
  ups: "/images/ups.png",
  fedex: "/images/fedex.png",
  usps: "/images/usps.png",
};

export default function ShipmentCard({ shipmentId, props }) {
  const [removeShipment] = useMutation(REMOVE_SHIPMENT, {
    refetchQueries: ["me"],
  });
  const [mapImage, setMapImage] = useState("");
  const [loading, setLoading] = useState(true);

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

  let arrived = 'Arriving ';

  function etaDefine() {
    if (props.current_status === "Delivered") {
      arrived = 'Arrived ';
      return "Delivered ".concat(
        dateToWeekDate(props.trackings.shipment_delivery_date)
      );
    }
    if (props.tracking?.expected_delivery) {
      return "Arriving ".concat(
        dateToWeekDate(props.trackings.expected_delivery)
      );
    } else {
      return "ETA not Available";
    }
  }
  const eta = etaDefine();

  const isNarrowScreen = useBreakpointValue({ base: true, md: false });

  async function getImage(e) {
    e.preventDefault;
    try {
      const response = await axios.post(BASE_URL + `/api/trackshipment`, {
        tracking: props.tracking_number,
        carrier: props.slug,
        props,
        isDashboard: true,
      });
      const shipmentData = response.data.shipmentDetails;
      setMapImage(response?.data?.image);

      if (!shipmentData || shipmentData.trackings.tag === "Pending") {
        console.log("No shipment found or the shipment is currently pending.");
      } else {
        // console.log("mapImage");
        setLoading(false);
      }
    } catch (error) {
      console.error("Failed to fetch tracking details:", error);
      console.error("Failed to fetch tracking details");
    }
  }
  let pickupDate = "";
  if (props.trackings.shipment_pickup_date) {
    pickupDate = dateToWeekDate(props.trackings.shipment_pickup_date);
  }
  let shipFrom = "";
  let shipTo = "";
  if (props.trackings.address.ship_from?.city) {
    shipFrom = props.trackings.address.ship_from?.city.concat(
      ", ",
      props.trackings.address.ship_from?.state
    );
  }
  if (props.trackings.address.ship_to?.city) {
    shipTo = props.trackings.address.ship_to?.city.concat(
      ", ",
      props.trackings.address.ship_to?.state
    );
  }

  if (isNarrowScreen) {
    return (
      <>
        <AccordionItem maxW='100%'>
          <AccordionButton onClick={getImage}>
            <Flex
              wrap='wrap'
              spacing={4}
              pt={5}
            >

              {/* Logo based on the carrier, with image sources in the const above */}
              <Container>
                <Flex mx={-2} justify='space-between'>

                  {props?.slug === "ups" && (
                    <Image src={logo.ups} alt="UPS" height="40px" />
                  )}
                  {props?.slug === "fedex" && (
                    <Image src={logo.fedex} alt="FedEx" height="40px" />
                  )}
                  {props?.slug === "usps" && (
                    <Image src={logo.usps} alt="USPS" height="40px" />
                  )}

                  {/* Tracking Number */}
                  <Text fontWeight="bold" fontSize='sm' color='dark-grey' mt='1' ml={2} pr='2' flexShrink={1} flexGrow={1} overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">{props?.tracking_number}</Text>
                  <Spacer />
                  <Box ml='auto'>
                    <Status status={props.current_status}
                      fontSize={'xs'} />
                  </Box>
                  <IconButton
                    variation="outline"
                    size="md"
                    icon={<DeleteIcon />}
                    mt={-1}
                    ml={15}
                    mb={4}
                    onClick={handleRemoveShipment}
                    zIndex={5}

                  />
                </Flex>
              </Container>

              {/* Ship From and Ship To */}
              <Container pt='2'>
                <HStack spacing={3}>
                  {props.trackings.address.ship_from?.city && props.trackings.address.ship_to?.city ? (
                    <>
                      <Text fontSize='sm'>
                        {shipFrom}
                        <ArrowRightIcon boxSize={2} mt={0} color="green" ml='3' />
                      </Text>
                      <Text fontSize='sm'>
                        {shipTo}
                      </Text>
                    </>
                  ) : (
                    <Text>No Data Available Yet!</Text>
                  )}
                </HStack>
              </Container>

              {/* ETA */}
              <Container pt='2' mt={-4} textAlign='left'>
                <Text fontWeight="bold" fontSize='sm'>{arrived}{eta}</Text>
              </Container>

            </Flex>
          </AccordionButton>

          {/* Expanded Shipment Card */}
          <AccordionPanel>
            <Grid
              templateColumns='1fr'
              gap={4}
            >
              {props.trackings.shipment_pickup_date ? (
                <GridItem>
                  {loading ? (
                    <Skeleton height="220px"></Skeleton>
                  ) : (
                    <Image src={mapImage} alt="Shipment Map" />
                  )}
                  <Text color="gray" fontSize="sm" mt={2}>
                    <strong>{props.trackings.shipment_type || ""}</strong> •
                    Shipped on {pickupDate}
                  </Text>
                </GridItem>
              ) : (
                <GridItem>
                  <Text>No Shipping Data Available!</Text>
                </GridItem>
              )}

              <GridItem ml="-2">
                {/* Each checkpoint and message */}
                <Grid templateColumns="1fr" gap={1}>
                  {props.trackings.checkpoints.map((checkpoint, index) => {
                    if (index === 0 || checkpoint.location == "") return null; // Skip the first checkpoint
                    return (
                      <GridItem key={index}>
                        <Box pl={3} pb={5}>
                          <Text mb={0} fontSize="xs">
                            {dateToShortDate(checkpoint.checkpoint_time)}:{" "}
                            {checkpoint.location.trim()} - <em>{checkpoint.message}</em>
                          </Text>
                        </Box>
                      </GridItem>
                    );
                  })}
                </Grid>
              </GridItem>
            </Grid>
          </AccordionPanel>
        </AccordionItem>
      </>
    )
  } else {


    return (
      <>
        <AccordionItem>
          <AccordionButton onClick={getImage}>
            <Flex
              justifyContent={{ base: "center", md: "space-between" }}
              alignItems="center"
              flexWrap="wrap"
              spacing={10}
              w="full"
              pt={3}
            >
              {/* Logo based on the carrier, with image sources in the const above */}
              <Box pt={2} pb={5}>
                <Center m="auto">
                  <Grid templateColumns="1fr 4fr" gap={4}>
                    {props?.slug === "ups" && (
                      <Image src={logo.ups} alt="UPS" height="40px" />
                    )}
                    {props?.slug === "fedex" && (
                      <Image src={logo.fedex} alt="FedEx" height="40px" />
                    )}
                    {props?.slug === "usps" && (
                      <Image src={logo.usps} alt="USPS" height="40px" />
                    )}

                    {/* Tracking Number */}
                    <Text fontWeight="bold" fontSize="lg" color="dark-grey">
                      {props?.tracking_number}
                    </Text>
                  </Grid>
                </Center>
              </Box>

              {/* Ship From and Ship To */}
              <Box pb={5} px={4}>
                <Box
                  border="1px"
                  borderColor="gray.300"
                  borderRadius="md"
                  pt="3"
                  px="5"
                  bg="gray.50"
                >
                  {props.trackings.address.ship_from?.city &&
                    props.trackings.address.ship_to?.city ? (
                    <Center m="auto">
                      {isNarrowScreen ? (
                        <VStack spacing={1} alignItems="center" align="center">
                          <Text fontWeight="bold" fontSize="auto">
                            {shipFrom}
                            <Center>
                              <ArrowRightIcon boxSize={4} mt={4} color="green" />
                            </Center>
                          </Text>
                          <Text fontWeight="bold" fontSize="auto">
                            {shipTo}
                          </Text>
                        </VStack>
                      ) : (
                        <HStack spacing={1} alignItems="center">
                          <Text fontWeight="bold" fontSize="auto">
                            {shipFrom}
                            <ArrowRightIcon
                              boxSize={5}
                              mx={12}
                              color="green"
                              mt="auto"
                            />
                          </Text>
                          <Text fontWeight="bold" fontSize="auto">
                            {shipTo}
                          </Text>
                        </HStack>
                      )}
                    </Center>
                  ) : (
                    <Text>No Data Available Yet!</Text>
                  )}
                </Box>
              </Box>

              {/* ETA */}
              <Box pt="3" pb="5">
                <Center m="auto">
                  {isNarrowScreen ? (
                    <VStack spacing={1} m="auto">
                      <Text fontWeight="bold" fontSize="lg" pr="3">
                        {eta}
                      </Text>

                      {/* Status */}
                      <Box m="auto" pr="2">
                        <Status status={props.current_status} />
                      </Box>
                    </VStack>
                  ) : (
                    <HStack spacing={1} alignItems="center">
                      <Box pr="5">
                        <Text fontWeight="bold" fontSize="lg" pr="3">
                          {eta}
                        </Text>
                      </Box>
                      {/* Status */}
                      <Box pr="2" mt={-2}>
                        <Status status={props?.current_status} />
                      </Box>
                    </HStack>
                  )}
                  {isNarrowScreen ? (
                    <IconButton
                      variation="outline"
                      size="md"
                      icon={<DeleteIcon />}
                      mt={12}
                      onClick={handleRemoveShipment}
                    />
                  ) : (
                    <IconButton
                      variation="outline"
                      size="md"
                      icon={<DeleteIcon />}
                      mt={-2}
                      ml={10}
                      onClick={handleRemoveShipment}
                      zIndex={5}
                    />
                  )}
                </Center>
              </Box>
            </Flex>
          </AccordionButton>

          {/* Expanded Shipment Card */}
          <AccordionPanel>
            <Grid
              templateColumns={{
                base: "1fr",
                md: "1fr 3fr",
              }}
              gap={4}
            >
              {props.trackings.shipment_pickup_date ? (
                <GridItem>
                  {loading ? (
                    <Skeleton height="220px"></Skeleton>
                  ) : (
                    <Image src={mapImage} alt="Shipment Map" />
                  )}
                  <Text color="gray" fontSize="sm" mt={2}>
                    <strong>{props.trackings.shipment_type || ""}</strong> •
                    Shipped on {pickupDate}
                  </Text>
                </GridItem>
              ) : (
                <GridItem>
                  <Text>No Shipping Data Available!</Text>
                </GridItem>
              )}

              <GridItem pl="5">
                {/* Each checkpoint and message */}
                <Grid templateColumns="repeat(3, 1fr)" gap={1}>
                  {props.trackings.checkpoints.map((checkpoint, index) => {
                    if (index === 0 || checkpoint.location == "") return null; // Skip the first checkpoint
                    return (
                      <GridItem key={index}>
                        <Box pl={3} pb={5}>
                          <Text mb={0} fontSize="sm">
                            {dateToShortDate(checkpoint.checkpoint_time)}:{" "}
                            {checkpoint.location.trim()}
                          </Text>
                          <Text as="i" color="gray" fontSize="sm">
                            {checkpoint.message}
                          </Text>
                        </Box>
                      </GridItem>
                    );
                  })}
                </Grid>
              </GridItem>
            </Grid>
          </AccordionPanel>
        </AccordionItem>
      </>
    );
  }
}
