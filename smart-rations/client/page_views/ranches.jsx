import { useEffect, useState } from 'react'
import Requestan from '../api_helpers/Requestan'
import LoadingCircular from '../components/Loading'
import { WiThermometer, WiWindy } from "react-icons/wi"
import { RiPinDistanceLine, RiArrowDownSFill } from "react-icons/ri"
import { BiTrip, BiCalendarCheck } from "react-icons/bi"
import { GiMountainCave, GiCow, GiGrass, GiHeatHaze, GiCooler, GiStatic } from "react-icons/gi"
import Router from 'next/router'
import RanchModal from '../components/RanchModal'

export default function Ranches() {
    async function checkToken() {
        const token = localStorage.getItem("token")
        if (!token) {
            Router.push("/login")
        }
    }

    useEffect(() => {
        checkToken()
    }, [])

    const ranches = Requestan('/ranch?AnimalCount=1')

    const displayProperties = [
        { name: 'AnimalCount', label: 'Hayvan Sayısı', icon: GiCow },
        { name: 'Temperature', label: 'Sıcaklık', icon: WiThermometer },
        { name: 'WindSpeed', label: 'Rüzgar Hızı', icon: WiWindy },
        { name: 'Distance', label: 'Uzaklık', icon: RiPinDistanceLine },
        { name: 'Trips', label: 'Tur Sayısı', icon: BiTrip },
        { name: 'HairDepth', label: 'Hair Depth', icon: RiArrowDownSFill },
        { name: 'CoatCondition', label: 'Zemin Durumu', icon: GiStatic },
        { name: 'Topography', label: 'Topoğrafya', icon: GiMountainCave },
        { name: 'HeatStress', label: 'Isı Stresi', icon: GiHeatHaze },
        { name: 'Grazing', label: 'Otlama', icon: GiGrass },
        { name: 'NightCooling', label: 'Gece Soğutması', icon: GiCooler },
        { name: 'createDate', label: 'Oluşturma Tarihi', icon: BiCalendarCheck },
    ]

    const formatValue = (key, value) => {
        switch (key) {
            case 'Temperature':
                return `${value} °C`
            case 'WindSpeed':
                return `${value} m/s`
            case 'Distance':
                return `${value} m`
            case 'HairDepth':
                return `${value} cm`
            case 'createDate':
                return `${new Date(value).toLocaleString()}`
            default:
                return typeof value === 'boolean' ? value ? 'Var' : 'Yok' : value
        }
    }

    const removeRanch = Requestan('/ranch', 'DELETE')

    const deleteRanch = (id) => {
        let answer = window.confirm("Silmek istediğinize emin misiniz?")
        if (!answer) return
        removeRanch.reFetch({ body: { id: id } }).then(a => ranches.reFetch())
    }

    const [showModal, setShowModal] = useState(false)
    const [selectedR, setSelectedR] = useState(null)

    return (
        <>
            <div className={`max-h-[95%] overflow-auto opacity-75 p-4 grid gap-4 grid-cols-1 ${ranches.data?.length >= 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-1'}`}>
                {
                    ranches.loading ? <LoadingCircular /> :
                        ranches.data?.map((ranch, index) => (
                            <div className='bg-black rounded-lg p-4 relative' key={ranch._id ?? index}>
                                <button className='hover:text-red-800 text-red-500 font-bold py-2 px-4 rounded-full absolute right-0'>
                                    <span className='text-sm' onClick={() => deleteRanch(ranch._id)} >Sil</span>
                                </button>
                                <button className='hover:text-white text-white font-bold py-2 px-4 rounded-full absolute right-0 bottom-2'>
                                    <span className='text-sm' onClick={() => { setSelectedR(ranch); setShowModal(!showModal) }} >Görüntüle</span>
                                </button>
                                <p className='text-xl mb-4 text-white'>{ranch.Name} Çiftliği</p>
                                {
                                    Object.entries(ranch).map(([key, value]) => {
                                        let p = displayProperties.find(p => p.name == key)
                                        if (!p) return
                                        return (
                                            <div className='flex items-center my-1' key={key}>
                                                <p.icon color='gray' size={28} className='mr-2' />
                                                <p className='text-white font-semibold'>{p.label}: {formatValue(key, value)}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        ))
                }
            </div>

            {showModal && <RanchModal closeModal={setShowModal} ranch={selectedR} />}
        </>


    )
}