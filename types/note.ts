export interface Note {
  id: string;
  title: string;
  content: string;
  tag : string;
    createdAt: string;
    updatedAt: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  page?: number;
  perPage?: number;
}


export type NoteTag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';