import { fetchNotes } from '@/lib/api';
import type { NoteTag } from '@/types/note';

type Props = {
  params: Promise<{ tags: string[] }>;
};

export default async function FilterPage({ params }: Props) {
  
  const { tags } = await params;
  const selectedTag = tags[0];

  const { notes } = await fetchNotes(
    '',
    1,
    12,
    selectedTag === 'all' ? undefined : selectedTag as NoteTag
  );

  return (
    <ul>
      {notes.map(note => (
        <li key={note.id}>{note.title}</li>
      ))}
    </ul>
  );
}