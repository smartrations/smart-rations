import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { useEffect } from 'react'
import logo from '../public/tubitaklogo.png'
import Image from 'next/image'
import Head from 'next/head'

const menuItems = [
    //{ path: "/", text: "Anasayfa" },
    { path: "/ranch", text: "Çiftliğim" },
    { path: "/animal", text: "Hayvanlarım" },
    { path: "/feeds", text: "Yemler" },
    { path: "/rations", text: "Rasyonlar" },
    { path: "/about", text: "Hakkında" },
]

export default function Navbar() {
    const router = useRouter();
    const [nav, setNav] = useState(false)
    const [isLogged, setIsLogged] = useState(false)

    async function checkToken() {
        localStorage.getItem("token") ? setIsLogged(true) : setIsLogged(false)
        //isim yazdır
    }

    async function logout() {
        localStorage.removeItem('token')
        router.reload(window.location.pathname);
    }

    useEffect(() => {
        checkToken()
    }, [])


    return (
        <div className='bg-white/75 w-full flex items-center justify-between h-16 min-h-[64px] overflow-hidden'>
            <Head>
                <title>Smart Rations</title>
            </Head>

            <div className='flex justify-center items-center text-black'>
                <p className='ml-4 mr-2 self-center text-2xl justify-content font-bold text-black whitespace-nowrap select-none'>Smart Rations |</p>
                <Image width={32} height={32} src={logo} title='Tübitak desteğiyle geliştirilmiştir' alt='Tübitak desteğiyle geliştirilmiştir' className='select-none' />
                <div className='hidden lg:block'>
                    {
                        menuItems.map((item, index) => {
                            return (
                                <Link href={item.path} key={index} shallow={item.path == '/rations' ? true : false}>
                                    <a className={`ml-8 font-semibold font-mono mt-1 ${router.pathname == item.path && "text-2xl"}`}>{item.text}</a>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
            <div className='hidden lg:block'>
                {
                    !isLogged ?
                        <>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg self-center mr-4"><Link href="/register">Kayıt Ol</Link></button>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg self-center mr-4"><Link href="/login">Giriş Yap</Link></button>
                        </> :
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg self-center mr-4" onClick={() => logout()}>Çıkış Yap</button>
                }
            </div>


            <div onClick={() => setNav(!nav)} className='mr-4 block z-20 cursor-pointer lg:hidden'>
                {nav ? <AiOutlineClose size={32} color={'white'} /> : <AiOutlineMenu size={32} color={'white'} />}
            </div>
            {
                nav &&
                <div className={`lg:hidden fixed top-0 left-0 z-10 w-full h-screen bg-gray-900 flex justify-center items-center ease-in duration-300`}>
                    <ul className='text-center text-white'>
                        {
                            menuItems.map((item, index) =>
                                <li className={`p-4 text-3xl font-bold font-mono ${router.pathname == item.path && "text-emerald-300"} `} key={index}>
                                    <Link href={item.path}>{item.text}</Link>
                                </li>
                            )
                        }
                    </ul>
                </div>}
        </div>
    )
}

/*
        <div className='bg-neutral-900 w-full h-16 flex items-center justify-between'>
            <div className='flex justify-center items-center text-white text-lg'>
                <p className='mx-4 self-center text-2xl justify-content font-bold text-teal-500 font-serif'>Dairy Farm</p>
                <button href="/" className='ml-12 font-semibold font-mono mt-1'>Anasayfa</button>
                <button href="/" className='ml-8 font-semibold font-mono mt-1'>Çiftliğim</button>
                <button href="/animals" className='ml-8 font-semibold font-mono mt-1 text-emerald-300'>Hayvanlarım</button>
                <button href="/feeds" className='ml-8 font-semibold font-mono mt-1'>Yemler</button>
            </div>
            <div className='mr'>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg self-center mr-4">Kayıt Ol</button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg self-center mr-4">Giriş Yap</button>
            </div>
        </div>
*/