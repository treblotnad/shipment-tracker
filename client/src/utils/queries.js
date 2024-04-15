import { gql } from "@apollo/client";

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      hiveData {
        created
        tracking_number
        slug
        current_status
        
        mongoId
        trackings {
          shipment_weight
          shipment_weight_unit
          expected_delivery
          shipment_type
          shipment_pickup_date
          shipment_delivery_date
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
          checkpoints {
            message
            subtag_message
            checkpoint_time
            city
            state
            zip
            location
          }
        }
      }
      savedShipments {
        _id
        tracking
        carrier
        isDelivered
        hiveId
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
