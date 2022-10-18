import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RanchAddPage from '../page_views/ranch_add'
import styles from '../styles/Home.module.css'
import Ranches from '../page_views/ranches'
import { AiOutlinePlus } from 'react-icons/ai'

export default function RanchPage() {
    const [page, setPage] = useState(0)

    const changePage = () => setPage(0)

    return (
        <main className={styles.main}>
            <Navbar />
            {
                page == 0 ?
                    <div className='h-full flex-col overflow-hidden'>
                        <div className='flex flex-col justify-center'>
                            <p className='text-white text-xl font-bold p-2 text-center'>Çiftliklerim</p>
                            <button style={{ color: '#00FA9A' }} className='font-bold flex items-center absolute right-2' onClick={() => setPage(1)}>
                                <AiOutlinePlus size={22} />
                                <span className='mx-1'>Yeni Çiftlik Ekle</span>
                            </button>
                        </div>
                        <Ranches />
                    </div> :
                    <RanchAddPage changePage={changePage} />
            }
        </main>
    )

    return (
        <main className={styles.main}>
            <Navbar />
            <div className='flex-1 flex-row'>
                <p className='text-white text-xl font-bold p-2 text-center flex-1 flex-col'>Çiftliklerim</p>

            </div>
        </main>
    )
}