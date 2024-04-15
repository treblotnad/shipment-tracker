import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { REMOVE_SHIPMENT } from "../utils/mutations";
import { SAVE_SHIPMENT } from "../utils/mutations";
import Auth from "../utils/auth";
import { removeShipmentId } from "../utils/localStorage";
// import { matchCarrier } from "../utils/carrierValidate";
import SearchTracking from "../components/SearchTracking";
import ShipmentCard from "../components/shipmentCard";

import {
  Box,
  Text,
  SimpleGrid,
  Grid,
  Center,
  Select,
  Button,
  Stack,
  ChakraProvider,
} from "@chakra-ui/react";
import {
  Pagination,
  usePagination,
  PaginationPage,
  PaginationNext,
  PaginationPrevious,
  PaginationPageGroup,
  PaginationContainer,
  PaginationSeparator,
} from "@ajna/pagination";

const Dashboard = () => {
  const { loading, data, error } = useQuery(GET_ME);
  const [saveShipment, { error: saveError }] = useMutation(SAVE_SHIPMENT);
  const [searchInput, setSearchInput] = useState("");

  const handleSaveShipment = async (tracking, carrier) => {
    if (!Auth.loggedIn()) {
      console.error("Not logged in");
      return false;
    }

    try {
      const result = await saveShipment({
        variables: {
          userId: Auth.getUser().data._id,
          shipmentData: {
            tracking: tracking,
            carrier: carrier,
          },
        },
      });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Load Error: {error.message}</Text>;
  }

  const savedShipments = data?.me?.hiveData || [];

  console.log(data.me);

  return (
    <Box padding="4">
      <Text fontSize="2xl" mb="4">
        Your Shipments
      </Text>
      <SearchTracking onSaveShipment={handleSaveShipment} />
      <SimpleGrid columns={{ sm: 1, md: 1, lg: 1 }} spacing={5}>
        {savedShipments.map((shipment) => (
          <ShipmentCard
            shipmentId={shipment.mongoId}
            userId={data.me._id}
            key={shipment.mongoId}
            tracking={shipment.tracking_number}
            carrier={shipment.slug}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Dashboard;
