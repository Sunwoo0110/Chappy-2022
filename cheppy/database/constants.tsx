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

const GET_USER = gql`
query getUser($id: ID){
    getUser(_id: $id) {
        _id
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

const GET_USER_BY_ID= gql`
query getUserById($id: ID!){
    getUserById(_id: $id){
        id
    }
}`


const GET_USER_BY_USERID = gql`
query getUserByUserId($userid: String!){
    getUserByUserId(userid: $userid) {
        _id
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
    }
}`

const NEW_USER = gql`
mutation newUser($input: UserInput!){
    newUser(input: $input){
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

const UPDATE_USER_INFO = gql`
mutation UpdateUserInfo($id: ID!, $input: UserInfoInput) {
    updateUserInfo(_id: $id, input: $input) {
    _id
    userid
    email
    username
    cellnumber
    department
    semester
    }
}
`
const UPDATE_USER_PASSWORD = gql`
mutation UpdateUserPassword($id: ID!, $input: UserPasswordInput) {
    updateUserPassword(_id: $id, input: $input) {
    password
}
}
`

export { GET_USER, NEW_USER, GET_USER_BY_USERID, UPDATE_USER_INFO, UPDATE_USER_PASSWORD } ;
