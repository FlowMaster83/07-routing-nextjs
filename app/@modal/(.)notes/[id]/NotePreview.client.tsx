// app/@modal/(.)notes/[id]/NotePreview.client.tsx
'use client';

import { useRouter } from 'next/navigation';
import css from './NotePreview.module.css';

export default function NotePreviewClient() {
  const router = useRouter();
  return (
    <button className={css.backBtn} onClick={() => router.back()}>
      Back
    </button>
  );
}