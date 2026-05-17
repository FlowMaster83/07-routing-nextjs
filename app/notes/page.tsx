// notes/page.tsx
'use client'

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce'

import { fetchNotes } from '../../lib/api';

import SearchBox from '../../components/SearchBox/SearchBox';
import Modal from '../../components/Modal/Modal';
import NoteForm from '../../components/NoteForm/NoteForm';
import NoteList from '../../components/NoteList/NoteList';
import Pagination from '../../components/Pagination/Pagination';

import css from './NotesPage.module.css'

const Notes = () => {
    const [page, setPage] = useState(1)
    const perPage = 12;
    const [filter, setFilter] = useState('')
    const [debouncedFilter] = useDebounce(filter, 500)
    const [isOpenCreateNote, setIsOpenCreateNote] = useState(false)

    const { data, error, isLoading, isError, isSuccess } = useQuery(
        {
            queryKey: ['notes', debouncedFilter, page],
            queryFn: () => fetchNotes(debouncedFilter, page, perPage),
            refetchOnWindowFocus: false,
            placeholderData: (prevData) => prevData,
        }
    )

    const notes = data?.notes || [];
    const totalPages = data?.totalPages || 0;

    const openModal = () => setIsOpenCreateNote(true);
    const closeModal = () => setIsOpenCreateNote(false);

    const handleSearch = (newFilter: string) => {
        setFilter(newFilter);
        setPage(1);
    }

    return (
        <>
            <div className={css.app}>
                <header className={css.toolbar}>

                    <SearchBox value={filter} onSearch={handleSearch} />

                    {isSuccess && totalPages > 1 && (
                        <Pagination totalPages={totalPages} currentPage={page} onPageChange={(nextPage) => setPage(nextPage)} />
                    )}

                    <button onClick={openModal} className={css.button}>Create note +</button>
                </header>
                {isLoading && <p>Loading...</p>}
                {isError && <p>Error: {error.message}</p>}

                {isSuccess && data.notes.length > 0 &&
                    <NoteList notes={notes} />}

                {isOpenCreateNote && <Modal onClose={closeModal}>
                    <NoteForm onClose={closeModal} />
                </Modal>}
            </div>
        </>
    )
}


export default Notes