import { ID } from 'type-graphql';
import { gql } from 'apollo-server-micro'

const typeDefs = gql`
    # Users
    type User {
        _id: ID
        userid: String
        password: String
        email: String
        username: String
        cellnumber: String
        department: String
        usertype: Int
        semester: Int        
    }
    input UserInput {
        userid: String
        password: String
        email: String
        username: String
    }
    type Query {
        getUsers: [User]
        getUserById(id: ID!): User
        getUserByUserId(userid: String!): User
        getIdByUserId(userid: String!): User
    }
    input UserInfoInput {
        username: String
        userid: String
        department: String
        cellnumber: String
        semester: Int
        email: String
    }
    input UserPasswordInput {
        password: String
    }

    type Mutation {
        #Products
        newUser(input: UserInput): User
        updateUserInfo(_id: ID!, input: UserInfoInput): User
        updateUserPassword(_id: ID!, input: UserPasswordInput): User
        # deleteProduct(id: ID!): String
    }
`
export {typeDefs};