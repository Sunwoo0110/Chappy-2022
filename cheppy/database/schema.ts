import { gql } from 'apollo-server-micro'

const typeDefs = gql`
    # Users
    type User {
        userid: String
        password: String
        email: String
        username: String
        cellnumber: String
        department: String
        usertype: Int
        semester: Int
    }
    # input ProductInput {
    #     name: String!
    #     productionCapacity: Int!
    #     price: Float!
    #     description: String
    # }
    type Query {
        getUsers: [User]
        # getProduct(id: ID!): Product
    }
    # type Mutation {
    #     #Products
    #     newProduct(input: ProductInput): Product
    #     updateProduct(id: ID!, input: ProductInput): Product
    #     deleteProduct(id: ID!): String
    # }
`
export {typeDefs};