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
import RationFactTable from '../components/RationFactTable'
import RationFeedTable from '../components/RationFeedTable'
import Requestan from '../api_helpers/Requestan'
import LoadingCircular from '../components/Loading'


export default function RationPage() {
    const tableItem = (unsur) => {
        return ({
            unsur: unsur,
            ihtiyac: '-',
            rasyon: '-',
            denge: '-'
        })
    }
    const unsurlar = ['Kaba Yem', 'Kuru Madde', 'NEI', 'ME', 'RDP', 'RUP', 'HP', 'HP (%KM)', 'Metabolik Protein', 'NDF Kaba Yem', 'NDF', 'ADF', 'NFC Maksimum', 'Ca', 'P', 'Ca/P Değeri', 'Katyon-Anyon Farkı',
        'Enerjinin Sağlayacağı Süt', 'Proteinin Sağlayacağı Süt', 'Bir KS için Gün Sayısı']
    let sdata = unsurlar.map(unsur => tableItem(unsur))

    const feeds = Requestan('/my/sfeeds')
    const ranches = Requestan('/ranch')
    const animals = Requestan('/my/animals')

    const calculate = Requestan('/my/calculate', 'POST')
    const [data, setData] = useState(sdata)
    const [feedData, setFeedData] = useState(null)
    const [selectedRanch, setSelectedRanch] = useState(null)
    const [selectedAnimal, setSelectedAnimal] = useState(null)

    async function checkToken() {
        const token = localStorage.getItem("token")
        if (!token) {
            Router.push("/login")
        }
    }

    useEffect(() => {
        checkToken()
    }, [])

    useEffect(() => {
        if (!ranches?.data || ranches?.data?.length == 0 || !animals?.data || animals?.data?.length == 0) return
        const _sranch = localStorage.getItem("selectedRanch")
        const _sanimal = localStorage.getItem("selectedAnimal")
        _sranch && setSelectedRanch(ranches.data.find(a => a._id == _sranch))
        _sanimal && setSelectedAnimal(animals.data.find(a => a._id == _sanimal))
    }, [ranches?.data, animals?.data])


    const calc = async () => {
        if (feeds.data?.length == 0) return alert('Hesaplama için yem seçmeniz gerekiyor')
        calculate.reFetch({ timeout: 10000, body: { RanchID: selectedRanch?._id, AnimalID: selectedAnimal?._id } }).then(a => {
            let d = a.data?.table
            const ti = (unsur, ihtiyac, rasyon, denge) => {
                return ({
                    unsur: unsur,
                    ihtiyac: typeof ihtiyac == 'string' ? ihtiyac : ihtiyac?.toFixed(2) ?? 'ERR',
                    rasyon: typeof rasyon == 'string' ? rasyon : rasyon?.toFixed(2) ?? 'ERR',
                    denge: typeof denge == 'string' ? denge : denge?.toFixed(2) ?? 'ERR'
                })
            }

            const _fd = d?.Feeds
            _fd.percents = a.data?.bestPosition
            _fd.dmcal = a.data?.dmCalculated

            const _in = _fd.map((a, index) => a.EnergyEqClass == "Forage" ? index : -1).filter(a => a >= 0)
            const TotalForage = _in.map(a => _fd.percents[a]).reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
            setData([
                ti('Kuru Madde', d.DMIPred, d.DMIActual, d.DMIPred - d.DMIActual),
                ti('Kaba Yem', '-', TotalForage, '-'),
                ti('NEI', (d.NEMaint + d.NEPreg + d.NELact + d.NEGrowth), d.NEl_Total, ((d.NEMaint + d.NEPreg + d.NELact + d.NEGrowth) - d.DietNEl)),
                ti('ME', '-', d.DietME, '-'),
                ti('RDP', d.RDPReq, d.RDPSup, d.RDPBal),
                ti('RUP', d.RUPReq, d.RUPSup, d.RUPBal),
                ti('HP', (d.RDPReq + d.RUPReq), (d.RDPSup + d.RUPSup), (d.RDPBal + d.RUPBal)),
                ti('HP (%KM)', '-', (((d.RDPSup + d.RUPSup) * 10 ** -3 / d.DMIActual) * 100), '-'),
                ti('Metabolik Protein', d.EvalFactor[5]?.Total, ((d.MPFeed * 1000) + d.MPBact + d.MPEndo), d.MPBalance),
                ti('NDF Kaba Yem', '-', d.ForageNDF, '-'),
                ti('NDF', '-', d.DietNDF, '-'),
                ti('ADF', '-', d.DietADF, '-'),
                ti('NFC Maksimum', '-', ((d.DietaryNFC / d.TotalDMFed) * 100), '-'),
                ti('K', d.Mineral[5]?.Total, d.Mineral[5]?.Absorbable, d.Mineral[5]?.Balance),
                ti('Mg', d.Mineral[3]?.Total, d.Mineral[3]?.Absorbable, d.Mineral[3]?.Balance),
                ti('Cl', d.Mineral[4]?.Total, d.Mineral[4]?.Absorbable, d.Mineral[4]?.Balance),
                ti('Na', d.Mineral[6]?.Total, d.Mineral[6]?.Absorbable, d.Mineral[6]?.Balance),
                ti('S', d.Mineral[7]?.Total, d.Mineral[7]?.Absorbable, d.Mineral[7]?.Balance),
                ti('Ca', d.Mineral[1]?.Total, d.Mineral[1]?.Absorbable, d.Mineral[1]?.Balance),
                ti('P', d.Mineral[2]?.Total, d.Mineral[2]?.Absorbable, d.Mineral[2]?.Balance),
                ti('Ca/P Değeri', (d.Mineral[1]?.Total / d.Mineral[2]?.Total), (d.Mineral[1]?.Absorbable / d.Mineral[2]?.Absorbable), (d.Mineral[1]?.Balance / d.Mineral[2]?.Balance)),
                ti('Katyon-Anyon Farkı', '-', (d.DCAD), '-'),
                ti('Enerjinin Sağlayacağı Süt', '-', d.EnergyAllowableMilk, '-'),
                ti('Proteinin Sağlayacağı Süt', '-', d.ProteinAllowableMilk, '-')
            ])

            setFeedData(_fd)
            console.log(a.data?.bestFitness, a.data?.bestPosition)
        })
    }

    return (
        <main className={styles.main}>
            <Navbar />
            <div className='flex flex-col lg:flex-row flex-1 items-center justify-center self-center h-full overflow-hidden'>
                {
                    feeds.loading ? <div className='flex flex-col items-center justify-center gap-2'>
                        <p className='text-white text-center'>Yemler yükleniyor...</p>
                        <LoadingCircular />
                    </div> : <>
                        <RationFactTable data={data} />
                        <div className='flex flex-col'>
                            <RationFeedTable items={feeds?.data} feedData={feedData} />

                            <div className='mb-2 ml-6 items-center flex justify-center'>
                                <Menu as="div" className="relative inline-block text-left mr-4 mt-1">
                                    <div>
                                        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                                            Çiftlik: {selectedRanch?.Name ?? 'Seçiniz'}
                                            <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                                        </Menu.Button>
                                    </div>

                                    <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                                        <Menu.Items className="-top-3 -translate-y-full absolute left-0 origin-top-left mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none overflow-none max-h-96 z-10">
                                            <div className="py-1">
                                                {ranches.data?.map((item, index) => (
                                                    <Menu.Item key={item._id}>
                                                        <a className='cursor-pointer block px-4 py-2 text-sm hover:bg-sky-600 active:bg-sky-700' onClick={() => { setSelectedRanch(item); setSelectedAnimal(null); localStorage.setItem('selectedRanch', item._id) }}>
                                                            {item.Name}
                                                        </a>
                                                    </Menu.Item>
                                                ))}
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                                {
                                    selectedRanch != null &&
                                    <Menu as="div" className="relative inline-block text-left mr-4 mt-1">
                                        <div>
                                            <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                                                Hayvan: {selectedAnimal?.Type ?? 'Seçiniz'}
                                                <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                                            </Menu.Button>
                                        </div>

                                        <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                                            <Menu.Items className="-top-3 -translate-y-full absolute left-0 origin-top-left mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none overflow-none max-h-96 z-10">
                                                <div className="py-1">
                                                    {animals.data?.filter(a => a.RanchID == selectedRanch._id).map((item, index) => (
                                                        <Menu.Item key={item._id}>
                                                            <a className='cursor-pointer block px-4 py-2 text-sm hover:bg-sky-600 active:bg-sky-700' onClick={() => { setSelectedAnimal(item); localStorage.setItem('selectedAnimal', item._id) }}>
                                                                {`${item.Type} ${item.Breed} (Yaş: ${item.Age} BW: ${item.BodyWeight})`}
                                                            </a>
                                                        </Menu.Item>
                                                    ))}
                                                </div>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                }
                            </div>


                            <div className='mx-4'>
                                <button className={`bg-blue-400 text-gray-800 p-2 justify-self-end hover:bg-blue-500 rounded-lg font-bold w-full ${!selectedAnimal && 'cursor-not-allowed bg-gray-600 hover:bg-gray-600'}`} disabled={!selectedAnimal} onClick={() => calc()}>Otomatik Hesapla</button>
                            </div>
                        </div>
                    </>
                }

            </div>

        </main>
    )
}

/*
<div className="overflow-x-auto relative shadow-md rounded-lg m-6 w-max mb-4">
                <table className="text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 text-center">
                        <tr>
                            <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                                Unsurlar
                            </th>
                            <th scope="col" className="py-3 px-6">
                                İhtiyaç
                            </th>
                            <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                                Rasyon
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Denge
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items?.map((item, index) => (
                                <tr className="border-b border-gray-200 dark:border-gray-900" key={index}>
                                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                        {item.unsur}
                                    </th>
                                    <td className="py-4 px-6">
                                        {item.ihtiyac}
                                    </td>
                                    <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800">
                                        {item.rasyon}
                                    </td>
                                    <td className="py-4 px-6">
                                        {item.denge}
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
*/