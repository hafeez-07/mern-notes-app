export type Note ={
    _id:string;
    title:string;
    body:string;
    createdAt:string;
    updatedAt:string;
   
}

export type CreateNote = Omit<Note,"_id" | "createdAt"| "updatedAt">;
