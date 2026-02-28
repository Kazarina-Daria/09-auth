'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import NotePreview from '@/components/NotePreview/NotePreview';
import { fetchNoteById } from '@/lib/api/clientApi';

type Props = {
  id: string;
};

export default function NotePreviewClient({ id }: Props) {
  const router = useRouter();
const {error, isLoading, data } = useQuery({
  queryKey : ['notes', id],
  queryFn : () => fetchNoteById(id)
})
  return (
    <Modal onClose={() => router.back()}>
    {isLoading && <p>Loading...</p>}
    {error && <p>Error loading note.</p>}
    {data && <NotePreview id={id}/> }
    </Modal>
  );
}