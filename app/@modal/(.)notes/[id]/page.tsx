import NotePreviewClient from "./NotePreview.client"
import { fetchNoteByIdServer } from "@/lib/api/serverApi";
import { dehydrate, QueryClient, HydrationBoundary, } from "@tanstack/react-query";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NoteModalPage({ params } : Props){
 const { id } = await params;
  const qc = new QueryClient();
  await qc.prefetchQuery({
    queryKey:["note", id],
    queryFn :()=> fetchNoteByIdServer(id),
  })
  return ( <HydrationBoundary state ={dehydrate(qc)}>
<NotePreviewClient id ={id} />
  </HydrationBoundary>)
}