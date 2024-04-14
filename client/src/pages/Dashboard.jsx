import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
// import { REMOVE_SHIPMENT } from "../utils/mutations";
import { SAVE_SHIPMENT } from "../utils/mutations";
import Auth from "../utils/auth";
// import { removeShipmentId } from "../utils/localStorage";
// import { matchCarrier } from "../utils/carrierValidate";
import SearchTracking from "../components/SearchTracking";
import ShipmentCard from "../components/shipmentCard";

import { Box, Text, SimpleGrid } from "@chakra-ui/react";

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

  console.log(data);

  const savedShipments = data?.me?.savedShipments || [];

  

  return (
    <Box padding="4">
      <Text fontSize="2xl" mb="4">
        Your Shipments
      </Text>
      <SearchTracking onSaveShipment={handleSaveShipment} />
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={5}>
        {savedShipments.map((shipment) => (
          <ShipmentCard
            key={shipment._id}
            tracking={shipment.tracking}
            carrier={shipment.carrier}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Dashboard;
