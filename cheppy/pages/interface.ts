interface UserInventory {
    id: number
    userid: string
    password: string
    email: string
    username: string
    cellnumber: string
    department: string
    usertype: number
    semester: number
}

interface UserInput {
    userid: string
    password: string
    email: string
    username: string
}

export type {UserInventory, UserInput}