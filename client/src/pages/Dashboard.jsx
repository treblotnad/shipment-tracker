import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";

import { SAVE_SHIPMENT } from "../utils/mutations";
import Auth from "../utils/auth";

// import { matchCarrier } from "../utils/carrierValidate";
import SearchTracking from "../components/SearchTracking";
import PaginationObj from "../components/Pagination";

import { Box, Text, Skeleton } from "@chakra-ui/react";

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
      // console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <>
        <Text>Loading...</Text>
        <Skeleton height="6000px"></Skeleton>
      </>
    );
  }

  if (error) {
    return <Text>Load Error: {error.message}</Text>;
  }
  const dbShipments = data?.me?.savedShipments;
  const savedShipments = data?.me?.hiveData || [];

  // console.log(data.me);

  return (
    <Box padding="4">
      <Text fontSize="2xl" mb="4">
        Your Shipments
      </Text>
      <SearchTracking onSaveShipment={handleSaveShipment} />
      <PaginationObj
        props={savedShipments}
        dbProps={dbShipments}
      ></PaginationObj>
    </Box>
  );
};

export default Dashboard;
