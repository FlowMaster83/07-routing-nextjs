// app\@modal\(.)notes\[id]\page.tsx

import Modal from '@/components/Modal/Modal';
import { fetchNoteById } from '@/lib/api';

import css from './NotePreview.module.css';
import BackButton from './BackButton';

type Props = {
  params: Promise<{ id: string }>;
};

const notePreview = async ({ params }: Props) => {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return (
    <Modal>
      <div className={css.container}>
        <div className={css.item}>
          <BackButton />
          <div className={css.header}>
            <h2>{note.title}</h2>
            <span className={css.tag}>{note.tag}</span>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>
            {new Date(note.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default notePreview;
