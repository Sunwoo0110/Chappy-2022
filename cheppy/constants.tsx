import {gql} from "graphql-request";

const testQuery = gql`
    query {
        hello
    }
`;

const signUpUserMutation = gql`
    mutation signUpUser($userid: String!, $password: String!, $email: String!, $username: String!){
        signUpUser(userid: $userid, password: $password, email: $email, username: $username){
            userid
            password
            email
            username
        }
    }

`;

export { signUpUserMutation } ;