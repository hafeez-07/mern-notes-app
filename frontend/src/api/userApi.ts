const BASE_URL='http://localhost:3000'

export const fetchUser = async ()=>{
    const response = await fetch(`${BASE_URL}/getUser`,{
        credentials:"include"
    })

    if(response.status===401){
        return null;
    }

    const data= await response.json();

    if(!response.ok){
        throw new Error(data.message || "couldn't find user");
    }
    return data;
}