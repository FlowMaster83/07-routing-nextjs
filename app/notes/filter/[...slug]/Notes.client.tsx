'use client';

import type { Note } from '@/types/note';
import NoteList from '@/components/NoteList/NoteList';

type Props = {
  notes: Note[];
};

export default function NotesClient({ notes }: Props) {
  return <NoteList notes={notes} />;
}