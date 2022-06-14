let userInfo = [
    {
        "userid": "sunwoo",
        "password": "1234",
        "email": "s@g.skku.edu",
        "username": "sunwoo",
        "cellnumber": "01012345678",
        "department": "software",
        "usertype": 0,
        "semester": 5
    },
    {
        "userid": "woojeong",
        "password": "1234",
        "email": "s@g.skku.edu",
        "username": "woojeong",
        "cellnumber": "01012345677",
        "department": "software",
        "usertype": 0,
        "semester": 5
    },
    {
        "userid": "sumin",
        "password": "1234",
        "email": "s@g.skku.edu",
        "username": "sumin",
        "cellnumber": "01012345676",
        "department": "software",
        "usertype": 0,
        "semester": 5
    }
]

export const getUserInfo = () => {
    return userInfo;
}

export const signUpUser = (userid, password, email, username) => {
    let newInfo = {
        userid: userid,
        password: password,
        email: email,
        username: username,
        cellnumber: "",
        department: "",
        usertype: 0,
        semester: 0
    };

    userInfo.push(newInfo);
    return true;

} 