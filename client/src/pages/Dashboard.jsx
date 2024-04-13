import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
// import { GET_ME } from "../utils/queries";
// import { REMOVE_SHIPMENT } from "../utils/mutations";
import { SAVE_SHIPMENT } from "../utils/mutations";
import Auth from "../utils/auth";
// import { removeShipmentId } from "../utils/localStorage";
// import { matchCarrier } from "../utils/carrierValidate";
import SearchTracking from "../components/SearchTracking";

const Dashboard = () => {
  // const { loading, data } = useQuery(GET_ME);
  const [searchInput, setSearchInput] = useState("");
  const [saveShipment, { error }] = useMutation(SAVE_SHIPMENT);

  const handleSaveShipment = async (tracking, carrier) => {

    if (!Auth.loggedIn()) {
      console.error('Not logged in');
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

  return (
    <SearchTracking onSaveShipment={handleSaveShipment} />
  );
};

export default Dashboard;
