import { fetchNotes } from '@/lib/api';
import type { NoteTag } from '@/types/note';
import NotesClient from './Notes.client';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function FilterPage({ params }: Props) {
  const { slug } = await params;
  const selectedTag = slug[0];

  const { notes } = await fetchNotes(
    '',
    1,
    12,
    selectedTag === 'all' ? undefined : (selectedTag as NoteTag)
  );

  return <NotesClient notes={notes} />;
}