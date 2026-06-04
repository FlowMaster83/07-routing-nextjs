'use client';

import { useRouter } from 'next/navigation';
import css from './NotePreview.module.css';

export default function BackButton() {
  const router = useRouter();
  return (
    <button className={css.backBtn} onClick={() => router.back()}>
      BACK
    </button>
  );
}
