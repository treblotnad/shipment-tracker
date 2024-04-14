import { gql } from "@apollo/client";

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      savedShipments {
        _id
        tracking
        carrier
        isDelivered
        hiveId
      }
      hiveData {
        trackings {
          expected_delivery
          shipment_delivery_date
        }
      }
    }
  }
`;

export const GET_TRACKING_INFO = gql`
  query getTrackingInfo($tracking: String!, $carrier: String!) {
    getTrackingInfo(tracking: $tracking, carrier: $carrier) {
      _id
      tracking
      carrier
      isDelivered
    }
  }
`;
