import styles from '../styles/Home.module.css'
import Navbar from '../components/Navbar'
import Head from 'next/head'



export default function AboutPage() {
    const bursiyerler = ["Feyza HEPKARŞI", "Olcay Han KORKUT", "Yağmur MUTLU", "Aleyna SEVIMLI"]
    const headerCSS = 'font-bold text-lg'
    const textCSS = 'text-gray-300'
    return (
        <main className={styles.main}>
            <Head>
                <meta key="robots" name="robots" content="noindex,nofollow" />
                <meta key="googlebot" name="googlebot" content="noindex,nofollow" />
            </Head>

            <Navbar />
            <div className='flex flex-col h-full justify-center items-center text-center text-white gap-4'>
                <div>
                    <h2 className={headerCSS}>Proje Yürütücüsü:</h2>
                    <p className={textCSS}> Dr.Öğr.Üyesi Muhammed MİLANİ </p>
                </div>

                <div>
                    <h2 className={headerCSS}>Danışman:</h2>
                    <p className={textCSS}>Prof. Dr. Muhlis MACİT</p>
                </div>

                <div>
                    <h2 className={headerCSS}>Araştırmacı:</h2>
                    <p className={textCSS}> Dr.Öğr.Üyesi Bahar MİLANİ </p>
                </div>

                <div>
                    <h2 className={headerCSS}>Bursiyerler:</h2>
                    {bursiyerler.map((bursiyer, index) => <p className={textCSS} key={index}>{bursiyer}</p>)}
                </div>

                <div>
                    <h2 className={headerCSS}>Yardımcı:</h2>
                    <p className={textCSS}>Harun DEMIRKAYA</p>
                </div>

            </div>
        </main >
    )
}
