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

export { NEW_USER } ;