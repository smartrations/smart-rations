import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import Navbar from '../components/Navbar'
import styles from '../styles/Home.module.css'
import Requestan from '../api_helpers/Requestan'
import Router from 'next/router'


export default function AnimalAddPage({ changePage, animal }) {
    const animalTypes = ['Lactating Cow', 'Dry Cow', 'Replacement Heifer']
    const animalBreeds = ['Ayrshire', 'Brown Swiss', 'Guernsey', 'Holstein', 'Jersey', 'Milking Shorthorn']
    const [inputs, setInputs] = useState([{ text: 'Yaş', name: 'Age', pos: 0 }, { text: 'Vücut Ağırlığı', name: 'BodyWeight', pos: 0 }, { text: 'Hamilelik Günleri', name: 'DaysPregnant', pos: 0 }, { text: 'Kondisyon Skoru', name: 'ConditionScore', pos: 0 }, { text: 'Sütlü Günler', name: 'DaysInMilk', pos: 0 }, { text: 'Emzirme Sayısı', name: 'LactationNumber', pos: 0 }, { text: 'İlk Buzağılama Yaşı', name: 'AgeAtFirstCalving', pos: 0 }, { text: 'Buzağılama Aralığı', name: 'CalvingInterval', pos: 0 }, { text: 'Buzağı Sıcaklığı', name: 'CalfTemp', pos: 0 }, { text: 'Desired ADG', name: 'DesiredADG', pos: 0 }, { text: 'Mature Weight', name: 'MatureWeight', pos: 1 }, { text: 'Calf Birth Weight', name: 'CalfBirthW', pos: 1 }, { text: 'Milk Production', name: 'MilkProduction', pos: 1 }, { text: 'Milk Fat', name: 'MilkFat', pos: 1 }, { text: 'Milk Protein', name: 'MilkProtein', pos: 1 }, { text: 'Lactose', name: 'Lactose', pos: 1 }])

    const [type, setType] = useState(animalTypes[0])
    const [breed, setBreed] = useState(animalBreeds[0])

    const postAnimal = Requestan('/my/animal', `${animal ? 'PUT' : 'POST'}`)
    const getRanches = Requestan('/ranch', 'GET')
    const [ranch, setRanch] = useState(null)

    const animalFilter = [
        { type: animalTypes[0], options: ['Age', 'BodyWeight', 'DaysPregnant', 'ConditionScore', 'DaysInMilk', 'LactationNumber', 'AgeAtFirstCalving', 'CalvingInterval', 'MatureWeight', 'MilkProduction', 'MilkFat', 'MilkProtein', 'Lactose'] },
        { type: animalTypes[1], options: ['Age', 'BodyWeight', 'DaysPregnant', 'ConditionScore', 'AgeAtFirstCalving', 'CalvingInterval', 'MatureWeight'] },
        { type: animalTypes[2], options: ['Age', 'BodyWeight', 'DaysPregnant', 'ConditionScore', 'AgeAtFirstCalving', 'CalvingInterval', 'MatureWeight'] }
    ]

    const addAnimal = () => {
        if (!ranch?._id) return alert('Bir çiftlik seçiniz.')
        const data = {}
        data.Type = type
        data.Breed = breed
        data.RanchID = ranch._id
        if (animal) data._id = animal._id
        inputs.forEach(input => data[input.name] = input.value ?? null)
        //console.log(data)
        //if (Object.values(data).some(o => o === null)) return alert('Lütfen tüm alanları doldurun!')
        postAnimal.reFetch({ body: data }).then(a => {
            (a.code == 200 & !animal) && changePage(0)
            if (ranch && a.code == 200) Router.reload('/ranch')
        })

    }

    useEffect(() => {
        setInputs(inputs.map(input => ({ ...input, value: animal?.[input.name] ?? 0 })))
        if (animal) {
            const _ranch = getRanches.data?.find(ranch => ranch._id == animal.RanchID)
            if (_ranch)
                setRanch(_ranch)
            setInputs(inputs.map(input => {
                return { ...input, value: animal[input.name] ?? input.value }
            }))
        }
    }, [getRanches.data])


    return (
        <>
            <div className='flex-1 grid sm:grid-cols-1 md:grid-cols-2 text-white opacity-95 flex-row font-sans text-xl'>
                <div className='flex flex-col flex-1 m-8'>
                    <div className='flex flex-row items-center mb-4'>
                        <p className='font-semibold mr-4'>Tür</p>
                        <Menu as="div" className="relative inline-block text-left text-black">
                            <div>
                                <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                                    {type}
                                    <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                                </Menu.Button>
                            </div>

                            <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                                <Menu.Items className="z-10 origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none overflow-auto max-h-96">
                                    <div className="py-1">
                                        {animalTypes.map((item, index) => (
                                            <Menu.Item key={index}>
                                                <a className='cursor-pointer block px-4 py-2 text-sm hover:bg-sky-600 active:bg-sky-700' onClick={() => setType(animalTypes[index])}>
                                                    {item}
                                                </a>
                                            </Menu.Item>
                                        ))}
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                    {
                        inputs.filter(a => a.pos == 0).filter(a => type == 'Young Calf' ? (a.name == 'BW' || a.name == 'DaysPregnant' || a.name == 'CalfTemp') : 1).filter(a => type != 'Young Calf' ? a.name != 'CalfTemp' : 1).filter(a => animalFilter.find(a => a.type == type).options.includes(a.name)).map((item) => (
                            <div className='mt-2' key={item.name}>
                                <label className="block mb-2 text-sm font-medium text-gray-300">{item.text}</label>
                                <input onChange={(e) => item.value = e.target.value} defaultValue={item.value} type="number" className="bg-white opacity-95 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="0" required />
                            </div>
                        ))
                    }
                </div>

                <div className='flex flex-col flex-1 m-8'>
                    <div className='flex flex-row items-center mb-4'>
                        <p className='font-semibold mr-4'>Cins</p>
                        <Menu as="div" className="relative inline-block text-left">
                            <div>
                                <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                                    {breed}
                                    <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                                </Menu.Button>
                            </div>

                            <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                                <Menu.Items className="z-10 origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none overflow-auto max-h-96">
                                    <div className="py-1">
                                        {animalBreeds.map((item, index) => (
                                            <Menu.Item key={index}>
                                                <a className='cursor-pointer block px-4 py-2 text-black text-sm hover:bg-sky-600 active:bg-sky-700' onClick={() => setBreed(animalBreeds[index])}>
                                                    {item}
                                                </a>
                                            </Menu.Item>
                                        ))}
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>

                    {
                        inputs.filter(a => a.pos == 1).filter(a => animalFilter.find(a => a.type == type).options.includes(a.name)).map((item) => (
                            <div className='mt-2' key={item.name}>
                                <label className="block mb-2 text-sm font-medium text-gray-300">{item.text}</label>
                                <input onChange={(e) => item.value = e.target.value} defaultValue={item.value} type="number" className="bg-white opacity-95 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="0" required />
                            </div>
                        ))
                    }

                    <div className='mt-2'>
                        <label className="block mb-2 text-sm font-medium text-gray-300">Eklenecek Çiftlik</label>
                        <Menu as="div" className="relative inline-block text-left text-black">
                            <div>
                                <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                                    {ranch?.Name ?? 'Seçiniz'}
                                    <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                                </Menu.Button>
                            </div>

                            <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                                <Menu.Items className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none overflow-auto max-h-96">
                                    <div className="py-1">
                                        {getRanches.data?.map((item, index) => (
                                            <Menu.Item key={index}>
                                                <a className='cursor-pointer block px-4 py-2 text-sm hover:bg-sky-600 active:bg-sky-700' onClick={() => setRanch(item)}>
                                                    {item.Name}
                                                </a>
                                            </Menu.Item>
                                        ))}
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                </div>

            </div>
            {
                !animal ?
                    <div className='mt-[auto] flex p-4 relative'>
                        <button className='bg-red-400 text-gray-800 p-2 justify-self-end hover:bg-red-500 rounded-lg font-bold w-2/6 mt-[auto] mr-4' onClick={() => changePage()}>Vazgeç</button>
                        <button className='bg-green-400 text-gray-800 p-2 justify-self-end hover:bg-green-500 rounded-lg font-bold w-full mt-[auto]' onClick={() => addAnimal()}>Yeni Hayvan Ekle</button>
                    </div>
                    :
                    <div className='mt-[auto] flex'>
                        <button className='bg-green-400 text-gray-800 p-2 justify-self-end hover:bg-green-500 rounded-lg font-bold w-full mt-[auto]' onClick={() => addAnimal()}>Güncelle</button>
                    </div>
            }
        </>
    )
}
