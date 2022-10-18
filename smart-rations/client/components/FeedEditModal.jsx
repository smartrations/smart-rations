import { useEffect, useState } from 'react'
import Requestan from '../api_helpers/Requestan'
import LoadingCircular from './Loading'
import { WiThermometer, WiWindy } from "react-icons/wi"
import { RiPinDistanceLine, RiArrowDownSFill } from "react-icons/ri"
import { BiTrip, BiCalendarCheck } from "react-icons/bi"
import { GiMountainCave, GiCow, GiGrass, GiHeatHaze, GiCooler, GiStatic } from "react-icons/gi"
import Router from 'next/router'
import RanchModal from './RanchModal'


export default function FeedEditModal({ closeModal, feed }) {
    const [Price, setPrice] = useState(feed.Price ?? 0)
    //const [DMFed, setDMFed] = useState(feed.DMFed ?? 0)

    const postFeed = Requestan('/my/ufeed', 'POST')

    const saveFeed = () => {
        feed.Price = Price
        //feed.DMFed = DMFed

        postFeed.reFetch({ body: feed }).then(a => {
            (a.code == 200 & !feed) && changePage(0)
            if (feed && a.code == 200) Router.reload('/feeds')
        })
    }

    return (
        <>
            <div className='absolute h-full w-full bg-black/80 flex translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]' style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={() => closeModal(false)} />

            <div className='absolute bg-slate-700/30 rounded-lg backdrop-blur-3xl w-[60%] h-auto lg:h-auto] lg:w-[30%] translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] z-10 drop-shadow-2xl flex-row p-4 overflow-auto'>
                <div className='justify-center flex-row'>
                    <div className='text-red-600 align-middle p-2 text-2xl flex'>
                        <button className='ml-auto' onClick={() => closeModal(false)}>X</button>
                    </div>
                    <div className="flex pb-4">
                        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-white border border-r-0 border-gray-300 rounded-l-md w-24">
                            Fiyat
                        </span>
                        <input defaultValue={Price} onChange={e => setPrice(e.target.value)} type="number" className="rounded-none rounded-r-lg bg-white border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5" placeholder='0' />
                    </div>

                    {/*  <div className="flex pb-4">
                        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-white border border-r-0 border-gray-300 rounded-l-md w-24">
                            DMFed
                        </span>
                        <input defaultValue={DMFed} onChange={e => setDMFed(e.target.value)} type="number" className="rounded-none rounded-r-lg bg-white border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5" placeholder='0' />
                    </div> */}
                </div>
                <button className='w-full bg-green-400 text-gray-800 p-2 justify-self-end hover:bg-green-500 rounded-lg font-bold lg:mt-2' onClick={() => saveFeed()}>Kaydet</button>

            </div>
        </>
    )
}