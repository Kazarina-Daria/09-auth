import 'server-only';

import { headers } from 'next/headers';
import {type User} from "../../types/user";
import {type Note, FetchNotesResponse, type NoteTag}  from "../../types/note";
import { api } from './api';
import { AxiosResponse } from 'axios';


export type ServerRequestOptions = {
  cookie?: string;
};


export type FetchNotesParams = {
  page: number;
  perPage: number;
  search?: string;
  tag?: NoteTag | "all";
};

const getAuthHeaders = async (options? : ServerRequestOptions)=>{
if (options?.cookie) return options.cookie;
const headersList = await headers();
return  headersList.get("cookie") || "";
}

export const fetchNotesServer= async (params: FetchNotesParams, options?: ServerRequestOptions) : Promise<FetchNotesResponse>=> {
   const cookie = await getAuthHeaders(options);
    const res = await api.get<FetchNotesResponse>("/notes", {
         params,
    headers: {cookie},
    });
    return res.data;
}

export const fetchNoteByIdServer = async (id:Note["id"], options?: ServerRequestOptions):Promise<Note> => {
      const cookie = await getAuthHeaders(options);
    const res = await api.get<Note>(`/notes/${id}`, {
    headers: {cookie},
    });
    return res.data;
}

export const checkSession = async (options?: ServerRequestOptions) : Promise<AxiosResponse<User | null>>=> {
    const cookie = await getAuthHeaders(options);
    return api.get("/auth/session",  { headers: { cookie } });
    
}

export const getMe = async (options?: ServerRequestOptions) : Promise<User>=> {
      const cookie = await getAuthHeaders(options);
    const res = await api.post<User>("/users/me", { headers: { cookie } });
    return res.data;
}