const BASE_URL = 'http://localhost:3000';
import type { CreateNote} from "../types/note";



export const fetchNotes=async()=>{
    const response=await fetch(`${BASE_URL}/read`);
    if(!response.ok){
        throw new Error("Could not fetch notes");
    }
    return response.json();
}

export const createNote = async (note:CreateNote)=>{
    const response= await fetch (`${BASE_URL}/add`,{
        method :"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(note),
    });
    if(!response.ok){
        throw new Error("Could not create note");
    }
    return response.json();
}

export const deleteNote = async (id:string)=>{
    const response=await fetch(`${BASE_URL}/delete/${id}`,{
        method:"DELETE",
    })

    if(!response.ok){
        throw new Error("Couldn't delete a note");
    }

    return response.json();
}

export const deleteAll = async ()=>{
    const response=await fetch(`${BASE_URL}/deleteAll`,{
        method:"DELETE"
    })
    if(!response.ok){
        throw new Error("Could not delete all notes");
    }
    return response.json();
}