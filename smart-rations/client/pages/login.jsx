import Router from 'next/router';
import Head from 'next/head'
import { useState } from 'react';

async function login({ email, password }) {
    try {
        const response = await fetch('https://api.smartrations.com:2096/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        const data = await response.json()
        if (!data?.token) throw data?.message ?? 'Bir hata oluştu'
        return data
    }
    catch (error) {
        console.log(error)
    }
}

export default function LoginPage() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setLoading] = useState(false)

    const submit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const data = await login({ email, password }).catch(e => setLoading(false))
        if (data?.token) {
            localStorage.setItem('token', data.token)
            Router.push({ pathname: '/' })
        }
        setLoading(false)
    }

    return (
        <div>
            <Head>
                <title>Dairy Farm Giriş</title>
                <meta name="description" content="Dairy Farm" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className='flex justify-center'>
                <div className="min-h-screen flex items-center justify-center px-5 py-5 w-2/6 min-w-max">
                    <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden">
                        <div className="w-full py-10 px-5 md:px-10">
                            <div className="text-center mb-10">
                                <h1 className="font-bold text-3xl text-gray-900">Giriş</h1>
                                <p className='mt-2'>Giriş yapmak için bilgilerinizi girin</p>
                            </div>
                            <form onSubmit={submit}>
                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mb-5">
                                        <label className="text-xs font-semibold px-1">Email</label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                            <input onChange={(e) => setEmail(e.target.value)} maxLength="80" type="email" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="mail@example.com" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mb-12">
                                        <label className="text-xs font-semibold px-1">Şifre</label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-lock-outline text-gray-400 text-lg"></i></div>
                                            <input onChange={(e) => setPassword(e.target.value)} minLength="6" maxLength="128" type="password" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="******" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mb-5">
                                        <button type="submit" disabled={isLoading} className={`block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold ${isLoading && "bg-gray-500"}`}>Giriş</button>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <p onClick={() => Router.push('/register')} className='text-gray-400 cursor-pointer'>Hesap oluşturmak için tıklayın</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
