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
        created
        tracking_number
        slug
        current_status
        trackings {
          expected_delivery
          shipment_delivery_date
          shipment_weight
          shipment_weight_unit
          checkpoints {
            message
            subtag_message
            checkpoint_time
            city
            state
            zip
            location
          }
          address {
            ship_from {
              city
              state
              country_iso
            }
            ship_to {
              city
              state
              country_iso
            }
          }
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
