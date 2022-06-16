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
        userid
        password
        email
        username
    }
}
`

const GET_OBJECT_ID= gql`
query getObjectId($userid: String!){
    getObjectId(userid: $userid){
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

export { NEW_USER , GET_OBJECT_ID} ;