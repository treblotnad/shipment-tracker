const typeDefs = `#graphql

type User {
    _id: ID!
    username: String
    email: String
    shipmentCount: Int
    savedShipments: [Shipment]
    hiveData: [Hive]
}

type Hive {
    customer_emails:[String]
    other_emails: [String]
    customer_phone_numbers: [String]
    tags: [String]
    return_to_sender: Boolean
    _id: String
    tracking_number: String
    slug: String
    source: String
    user_id: String
    created_by: String
    langauge_type: String
    trackings: Tracking
    current_status: String
    created: String
    modified: String
}

type Tracking {
    signed_by: String
    tag: String
    shipment_weight: String
    shipment_weight_unit: String
    expected_delivery: String
    deliver_time: Int
    shipment_type: String
    shipment_pickup_date: String
    shipment_delivery_date: String
}


type Shipment {
    _id: ID
    tracking: String
    carrier: String
    isDelivered: Boolean
    hiveId: String
}

type Auth {
    token: ID!
    user: User
}

type Query {
    users: [User]
    user(username: String!): User
    me: User
    shipments(username: String): [Shipment]
    shipment(shipmentId: ID!): Shipment
}

input ShipmentInput {
    tracking: String!
    carrier: String!
    hiveid: String
}

type Mutation {
    addUser(
        username: String!, 
        email: String!, 
        password: String!
        ): Auth
    login(
        email: String!, 
        password: String!
        ): Auth
    saveShipment(
        userId: ID, 
        shipmentData: ShipmentInput
        ): User
    removeShipment(
        userId: ID!,
        shipmentId: ID!
        ): User
}

`;

module.exports = typeDefs;
