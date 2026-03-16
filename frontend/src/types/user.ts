export type RegisteredUser={
    fullname?:string;
    username : string;
    email:string;
    password:string;
}

export type LoggedInUser={
    email:string;
    password:string;
}