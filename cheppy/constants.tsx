import {gql} from "graphql-request";

const testQuery = gql`
    query {
        hello
    }
`;

const signUpUserMutation = gql`
    # mutation signUpUser($userid: String!, $passsword: String!, $email: String!, $username: String!){
    #     signUpUser(userid: $userid, password: $password, email: $email, username: $username){
    #         userid
    #         password
    #         email
    #         username
    #     }
    # }
    mutation signUpUser($userid: String!){
        signUpUser(userid: $userid){
            userid,
            password,
            email,
            username,
            cellnumber,
            department,
            usertype,
            semester
        }
    }
`;

export { signUpUserMutation } ;