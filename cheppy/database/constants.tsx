import {gql} from "@apollo/client";

const testQuery = gql`
    query {
        hello
    }
`;

// const signUpUserMutation = gql`
//     mutation signUpUser($userid: String!, $password: String!, $email: String!, $username: String!){
//         signUpUser(userid: $userid, password: $password, email: $email, username: $username){
//             userid
//             password
//             email
//             username
//         }
//     }

// `;

const NEW_USER = gql`
mutation newUser($input: UserInput!){
    newUser(input: $input){
        id
        userid
        password
        email
        username
    }
}
`

const GET_USER_BY_ID= gql`
query getUserById($id: ID!){
    getUserById(_id: $id){
        id
        userid
        password
        email
        username
        cellnumber
        department
        usertype
        semester
    }
}
`

const GET_USER_BY_USER_ID= gql`
query getUserByUserId($userid: String!){
    getUserByUserId(userid: $userid){
        id
        userid
        password
        email
        username
        cellnumber
        department
        usertype
        semester
    }
}
`

const GET_ID_BY_USER_ID=gql`
query getIdByUserId($userid: String!){
    getIdByUserId(userid: $userid){
        id
    }
}
`

export { NEW_USER , GET_USER_BY_ID, GET_USER_BY_USER_ID, GET_ID_BY_USER_ID} ;