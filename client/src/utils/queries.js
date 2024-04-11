import { gql } from "@apollo/client";

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      savedShipments {
        shipmentId
        tracking
        carrier
        isDelivered
      }
    }
  }
`;
