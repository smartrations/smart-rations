import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import Router from 'next/router'
import FeedsPage from './feeds'
import AnimalPage from './animal'
import Navbar from '../components/Navbar'
import LoadingCircular from '../components/Loading'



export default function Home() {

  async function checkToken() {
    const token = localStorage.getItem("token")
    if (!token) {
      Router.push("/login")
    }
    else {
      Router.push('/ranch')
    }
  }

  useEffect(() => {
    checkToken()
  }, [])

  return (
    <div>
      <Head>
        <title>Dairy Farm</title>
        <meta name="description" content="Dairy Farm" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main /*'flex flex-1 flex-col h-screen'*/}>
        <Navbar />
        <div className='flex flex-col h-full items-center justify-center text-white font-bold'>
          <p>Lütfen bekleyiniz</p>
          <p>Birazdan yönlendirileceksiniz...</p>
          <div className='p-4'>
            <LoadingCircular />
          </div>
        </div>
      </main>
    </div>
  )
}
