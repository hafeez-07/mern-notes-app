import type{ LoggedInUser, RegisteredUser } from "../types/user";

const BASE_URL="http://localhost:3000";

//register user
export const registerUser= async (user:RegisteredUser)=>{
    const response = await fetch(`${BASE_URL}/register`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        //to send and receive cookies
        credentials:"include",
        body:JSON.stringify(user)
    })
    const data = await response.json();
    if(!response.ok){
        throw new Error(data.message ||"Could not create an account")
    }

    return data;
}


export const loginUser = async (user:LoggedInUser)=>{
    const response = await fetch (`${BASE_URL}/login`,{
        method : "POST",
        headers:{
            "Content-Type":"application/json"
        },
        credentials:"include",
        body:JSON.stringify(user)
    })
    const data = await response.json();
    if(!response.ok){
        throw new Error(data.message ||"Could not login")
    }
    return data;
}

//logout

export const logoutUser = async ()=>{
    const response = await fetch(`${BASE_URL}/logout`,{
        credentials:"include"
    });
    const data = await response.json();
    if(!response.ok){
        throw new Error (data.message || "could not log out");
    }
    return data;
}