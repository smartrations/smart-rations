import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import Router from 'next/router'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import Navbar from '../components/Navbar'
import AnimalAddPage from '../page_views/animal_add'
import Animals from '../page_views/animals'
import { AiOutlinePlus } from 'react-icons/ai'


export default function AnimalPage() {
    const [page, setPage] = useState(0)

    const changePage = () => setPage(0)

    return (
        <main className={styles.main}>
            <Navbar />
            {
                page == 0 ?
                    <>
                        <div className='flex flex-col justify-center'>
                            <p className='text-white text-xl font-bold p-2 text-center'>Hayvanlarım</p>
                            <button style={{ color: '#00FA9A' }} className='font-bold flex items-center absolute right-2' onClick={() => setPage(1)}>
                                <AiOutlinePlus size={22} />
                                <span className='mx-1'>Hayvan Ekle</span>
                            </button>
                        </div>
                        <Animals />
                    </> :
                    <AnimalAddPage changePage={changePage} />
            }
        </main>
    )
}
