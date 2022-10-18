import { useEffect, useState } from 'react'
import Requestan from '../api_helpers/Requestan'
import LoadingCircular from '../components/Loading'
import Router from 'next/router'
import AnimalModal from '../components/AnimalModal'

export default function Animals() {
    async function checkToken() {
        const token = localStorage.getItem("token")
        if (!token) {
            Router.push("/login")
        }
    }

    useEffect(() => {
        checkToken()
    }, [])

    const animals = Requestan('/my/animals')

    const displayProperties = [
        { name: 'Type', label: 'Tür' },
        { name: 'Breed', label: 'Cins' },
        { name: 'BodyWeight', label: 'Vücut Ağırlığı' },
        { name: 'Age', label: 'Age ' },
        { name: 'MatureWeight', label: 'MatureWeight' },
        { name: 'DaysPregnant', label: 'DaysPregnant' },
        { name: 'ConditionScore', label: 'ConditionScore' },
        { name: 'DaysInMilk', label: 'DaysInMilk' },
        { name: 'LactationNumber', label: 'LactationNumber' },
        { name: 'AgeAtFirstCalving', label: 'AgeAtFirstCalving' },
        { name: 'CalfBirthW', label: 'CalfBirthW' },
        { name: 'CalfTemp', label: 'CalfTemp' },
        { name: 'CalvingInterval', label: 'CalvingInterval' },
        { name: 'DesiredADG', label: 'DesiredADG' },
        { name: 'MilkProduction', label: 'MilkProduction' },
        { name: 'MilkFat', label: 'MilkFat' },
        { name: 'MilkProtein', label: 'MilkProtein' },
        { name: 'Lactose', label: 'Lactose' },
        { name: 'createDate', label: 'Eklenme Tarihi' },
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

    const removeAnimal = Requestan('/my/animal', 'DELETE')

    const deleteAnimal = (id) => {
        let answer = window.confirm("Silmek istediğinize emin misiniz?")
        if (!answer) return
        removeAnimal.reFetch({ body: { AnimalID: id } }).then(a =>
            animals.reFetch()
        )
    }

    const [showModal, setShowModal] = useState(false)
    const [selectedA, setSelectedA] = useState(null)

    return (
        <>
            <div className={`p-4 grid gap-4 grid-cols-1 ${animals.data?.length >= 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-1'}`}>
                {
                    animals.loading ? <LoadingCircular /> :
                        animals.data?.map((animal, index) => (
                            <div className='bg-black opacity-75 rounded-lg p-4 relative grid sm:grid-cols-2 md:grid-cols-3' key={animal._id ?? index}>
                                <button className='hover:text-gray-800 text-white font-bold py-2 px-4 rounded-full absolute right-0'>
                                    <span className='text-sm' onClick={() => { setSelectedA(animal); setShowModal(!showModal) }} >Düzenle</span>
                                    <span className='text-sm ml-4 text-red-600' onClick={() => deleteAnimal(animal._id)} >Sil</span>
                                </button>
                                {
                                    Object.entries(animal).map(([key, value]) => {
                                        let p = displayProperties.find(p => p.name == key)
                                        if (!p) return
                                        return (
                                            <div className='flex items-center my-1' key={key}>
                                                <p className='text-white font-semibold'>{p.label}: {formatValue(key, value)}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        ))
                }
            </div>
            {showModal && <AnimalModal closeModal={setShowModal} animal={selectedA} />}
        </>
    )
}