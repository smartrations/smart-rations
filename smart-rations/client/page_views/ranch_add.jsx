import { useEffect, useState } from 'react'
import { Switch, Transition, Menu } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { Fragment } from 'react'
import Requestan from '../api_helpers/Requestan'
import Router from 'next/router'

export default function RanchAddPage({ changePage, ranch }) {

    const coatConds = [{ text: 'Temiz/Kuru', name: 'Clean/Dry' }, { text: 'Hafif Çamurlu', name: 'Some Mud' }, { text: 'Islak/Hasırlı', name: 'Wet/Matted' }, { text: 'Kar/Çamur ile kaplı', name: 'Snow/Mud' }]
    const topogs = [{ text: 'Düz', name: 'Flat' }, { text: 'Tepelik', name: 'Hilly' }]
    const heats = [{ text: 'Yok', name: 'None' }, { text: 'Ani/Sığ', name: 'Rapid/Shallow' }, { text: 'Open Mouth', name: 'OpenMouth' }]

    const [inputs, setInputs] = useState([{ text: 'İsim', name: 'Name', placeholder: 'Çiftlik Adı', type: String }, { text: 'Sıcaklık', name: 'Temperature' }, { text: 'Önceki Sıcaklık', name: 'PrevTemperature' }, { text: 'Rüzgar Hızı', name: 'WindSpeed' }, { text: 'Uzaklık (Yemleme ve sağım uzaklığı)', name: 'Distance' }, { text: 'Gezi Sayısı', name: 'Trips' }, { text: 'Hair Depth', name: 'HairDepth' }, { text: 'Isı Stresi', name: 'HeatStress', type: 'Dropdown' }, { text: 'Zemin Koşulu', name: 'CoatCondition', type: "Dropdown" }, { text: 'Topoğrafya', name: 'Topography', type: "Dropdown" }, { text: 'Otlama', name: 'Grazing', type: Boolean, value: false }, { text: 'Gece Soğutması', name: 'NightCooling', type: Boolean, value: false }])

    const postRanch = Requestan('/ranch', `${ranch ? 'PUT' : 'POST'}`)

    const addRanch = () => {
        const data = {}
        inputs.forEach(input => data[input.name] = input.value ?? null)
        if (Object.values(data).some(o => o === null)) return alert('Lütfen tüm alanları doldurun!')
        postRanch.reFetch({ body: { ...data, _id: ranch?._id } }).then(a => {
            (a.code == 200 & !ranch) && changePage(0)
            if (a.code == 200 && ranch) Router.reload('/ranch')
        })
    }

    useEffect(() => {
        if (ranch) {
            setInputs(inputs.map(input => {
                if (input.type == 'Dropdown') {
                    if (input.name == 'HeatStress') return { ...input, value: ranch[input.name], textValue: heats.find(a => a.name == ranch[input.name])?.text }
                    else if (input.name == 'CoatCondition') return { ...input, value: ranch[input.name], textValue: coatConds.find(a => a.name == ranch[input.name])?.text }
                    else if (input.name == 'Topography') return { ...input, value: ranch[input.name], textValue: topogs.find(a => a.name == ranch[input.name])?.text }
                    return { ...input, value: ranch[input.name], textValue: ranch[input.text] }
                }
                else {
                    return { ...input, value: ranch[input.name] ?? input.value }
                }
            }))
        }
    }, [])

    return (
        <div className='p-4 h-full flex flex-col'>
            <div className='items-center justify-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-4'>
                {
                    inputs.map((item, index) =>
                        <div className='mt-2 mr-2' key={item.name + item.index}>
                            <label className="block mb-2 text-sm font-medium text-gray-300">{item.text}</label>
                            {item.type === Boolean ?
                                <Switch
                                    checked={item.value}
                                    onChange={() => {
                                        setInputs(inputs.map(i => {
                                            if (i.name === item.name) {
                                                i.value = !i.value
                                            }
                                            return i
                                        }))

                                    }}
                                    className={`${item.value ? 'bg-blue-600' : 'bg-gray-200'
                                        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                                >
                                    <span
                                        className={`${item.value ? 'translate-x-6' : 'translate-x-1'
                                            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                                    />
                                </Switch>
                                :
                                item.type === "Dropdown" ?
                                    <Menu as="div" className="relative inline-block text-left text-black">
                                        <div>
                                            <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                                                {item.textValue ?? "Seçiniz"}
                                                <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                                            </Menu.Button>
                                        </div>

                                        <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                                            <Menu.Items className="z-10 origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none overflow-auto max-h-96">
                                                <div className="py-1">
                                                    {item.name == "CoatCondition" ?
                                                        coatConds.map((coat, index) => (
                                                            <Menu.Item key={index}>
                                                                <a className='cursor-pointer block px-4 py-2 text-sm hover:bg-sky-600 active:bg-sky-700' onClick={() => { item.value = coat.name; item.textValue = coat.text; setInputs([...inputs]) }}>
                                                                    {coat.text}
                                                                </a>
                                                            </Menu.Item>
                                                        ))
                                                        :
                                                        item.name == "Topography" ?
                                                            topogs.map((topo, index) => (
                                                                <Menu.Item key={index}>
                                                                    <a className='cursor-pointer block px-4 py-2 text-sm hover:bg-sky-600 active:bg-sky-700' onClick={() => { item.value = topo.name; item.textValue = topo.text; setInputs([...inputs]) }}>
                                                                        {topo.text}
                                                                    </a>
                                                                </Menu.Item>
                                                            ))
                                                            :
                                                            heats.map((heat, index) => (
                                                                <Menu.Item key={index}>
                                                                    <a className='cursor-pointer block px-4 py-2 text-sm hover:bg-sky-600 active:bg-sky-700' onClick={() => { item.value = heat.name; item.textValue = heat.text; setInputs([...inputs]) }}>
                                                                        {heat.text}
                                                                    </a>
                                                                </Menu.Item>
                                                            ))
                                                    }
                                                </div>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                    :
                                    <input defaultValue={item.value ?? null} type={item.type === String ? "text" : "number"} onChange={(e) => { item.value = item.type === String ? e.target.value : parseInt(e.target.value); setInputs([...inputs]) }} className="bg-white opacity-95 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={item.placeholder ?? 0} required />
                            }
                        </div>
                    )
                }
            </div>
            {
                !ranch ?
                    <div className='mt-[auto] flex'>
                        <button className='bg-red-400 text-gray-800 p-2 justify-self-end hover:bg-red-500 rounded-lg font-bold w-2/6 mt-[auto] mr-4' onClick={() => changePage()}>Vazgeç</button>
                        <button className='bg-green-400 text-gray-800 p-2 justify-self-end hover:bg-green-500 rounded-lg font-bold w-full mt-[auto]' onClick={() => addRanch()}>Yeni Çiftlik Ekle</button>
                    </div>
                    :
                    <>
                        <div className='mt-[auto] flex'>
                            <button className='bg-green-400 text-gray-800 p-2 justify-self-end hover:bg-green-500 rounded-lg font-bold w-full mt-[auto]' onClick={() => addRanch()}>Güncelle</button>
                        </div>
                    </>
            }
        </div>
    )
}