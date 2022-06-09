import {gql} from "graphql-request";

const getUserInfo = gql`
    query {
        showUserInfo {
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
`;

export {getUserInfo};
