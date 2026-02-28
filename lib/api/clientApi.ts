import {type User} from "../../types/user";
import {type Note, FetchNotesResponse, type NoteTag}  from "../../types/note";
import { api } from './api';

export type RegisterRequest = {
    email : string;
password : string ;
}

export const register = async (payload: RegisterRequest) : Promise<User>=> {
    const res = await api.post("/auth/register", payload);
    return res.data;
}

export const login = async (payload: RegisterRequest) : Promise<User>=> {
    const res = await api.post("/auth/login", payload);
    return res.data;
}

export const logout = async () : Promise<void>=> {
await api.post("/auth/logout");
}

export const checkSession = async () : Promise<User | null>=> {
    const res = await api.get("/auth/session");
    return res.data  || null;
}

export const getMe = async () : Promise<User>=> {
    const res = await api.get("/users/me");
    return res.data;
}

export const updateMe = async ( payload :{username : string}) : Promise<User>=> {
    const res = await api.patch("/users/me", payload);
    return res.data;
}

export const fetchNotes= async (search : string, page: number, perPage?: number, tag?: NoteTag | "all") : Promise<FetchNotesResponse>=> {
    const res = await api.get<FetchNotesResponse>("/notes", {
        params: {
            page,
            perPage,
  ...(search? { search: search } : {}),
      ...(tag ? tag !== "all" ? { tag } : {} : {}),
        },
    });
    return res.data;
}


export interface CreateNote{
title:string;
content :string;
   tag: NoteTag;
}

export const createNote = async (payload : CreateNote) :Promise<Note> => {
    const res = await api.post<Note>("/notes", payload);
    return res.data;
}

export const deleteNote = async (id : Note["id"]): Promise<Note> =>{
    const res = await api.delete<Note>(`/notes/${id}`);
    return res.data;
}

export const fetchNoteById = async (id:Note["id"]):Promise<Note> => {
    const res = await api.get<Note>(`/notes/${id}`);
    return res.data;
}