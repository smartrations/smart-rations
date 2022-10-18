import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import Router from 'next/router'
import Navbar from '../components/Navbar'
import Requestan from '../api_helpers/Requestan'
import LoadingCircular from '../components/Loading'
import FeedEditModal from '../components/FeedEditModal'
import { AiFillEdit } from 'react-icons/ai'
import { MdAdd } from 'react-icons/md'

export default function FeedsPage() {

  const [selected, setSelected] = useState([])
  const [toAdd, setToAdd] = useState([])

  const [selectedType, setType] = useState("All")
  const [textFilter, setTextFilter] = useState("")
  const [selectedFeed, setSelectedFeed] = useState(null)
  const [price, setPrice] = useState(0)

  const feedTypes = [{ text: 'Hepsi', name: 'All' }, { text: 'Kesif Yem', name: 'Concentrate' }, { text: 'Kuru Yem', name: 'Dry' }, { text: 'Islak Yem', name: 'Wet' }]
  const [feedType, setFeedType] = useState(feedTypes[0])

  const [typeFilter, setTypeFilter] = useState(feedTypes[0])

  const cities = ['Tüm İller', 'Adana', 'Adıyaman', 'Afyon', 'Ağrı', 'Amasya', 'Ankara', 'Antalya', 'Artvin',
    'Aydın', 'Balıkesir', 'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa', 'Çanakkale',
    'Çankırı', 'Çorum', 'Denizli', 'Diyarbakır', 'Edirne', 'Elazığ', 'Erzincan', 'Erzurum', 'Eskişehir',
    'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkari', 'Hatay', 'Isparta', 'Mersin', 'Istanbul', 'Izmir',
    'Kars', 'Kastamonu', 'Kayseri', 'Kırklareli', 'Kırşehir', 'Kocaeli', 'Konya', 'Kütahya', 'Malatya',
    'Manisa', 'Kahramanmaraş', 'Mardin', 'Muğla', 'Muş', 'Nevşehir', 'Niğde', 'Ordu', 'Rize', 'Sakarya',
    'Samsun', 'Siirt', 'Sinop', 'Sivas', 'Tekirdağ', 'Tokat', 'Trabzon', 'Tunceli', 'Şanlıurfa', 'Uşak',
    'Van', 'Yozgat', 'Zonguldak', 'Aksaray', 'Bayburt', 'Karaman', 'Kırıkkale', 'Batman', 'Şırnak',
    'Bartın', 'Ardahan', 'Iğdır', 'Yalova', 'Karabük', 'Kilis', 'Osmaniye', 'Düzce']

  //const [IFN, setIFN] = useState(null)
  const energyEQC = [{ text: 'Forage', name: 'Forage' }, { text: 'Yağ', name: 'Fat' }, { text: 'Yağ Asidi', name: 'Fatty Acid' }, { text: 'Vitamin/Mineral', name: 'Vitamin/Mineral' }]
  const [energyEQ, setEnergyEQ] = useState(energyEQC[0])


  const columns = Requestan('/column')
  const feeds = Requestan('/my/feeds')
  const sfeeds = Requestan('/my/sfeeds', 'get')
  /* 
    const sfeeds = Requestan('/my/sfeeds').getDataPromise().then(async a => {
      console.log('a')
      //setSelected(feeds.data.filter(f => a.includes(f._id)))
    })
   */

  const categories = [{ _id: 0, name: 'Hepsi' }, ...(Requestan('/my/feedcategories').data ?? [])]

  const postItems = Requestan('/my/feed', 'POST')
  const postSFeeds = Requestan('/my/sfeeds', 'POST')
  const putFeeds = Requestan('/my/feed', 'PUT')

  const [category, setCategory] = useState(categories[0])
  const [toAddCategory, setToAddCategory] = useState(null)
  const [editMode, setEditMode] = useState(false)

  const [city, setCity] = useState(cities[0])

  const [showWindow, setShowWindow] = useState(false)

  const buttonObjects = [{ name: "Tüm Yemler", type: "All" }, { name: "Standart Yemler", type: "Standart" }, { name: "Kullanıcı Yemleri", type: "User" }]
  const [buttonState, changeButtonState] = useState({ activeObject: buttonObjects[0], objects: buttonObjects })

  const [newForageName, setNewForageName] = useState("")
  const [editID, setEditID] = useState(null)

  const [DMFed, setDMFed] = useState(0)
  const [showEditModal, setShowModal] = useState(false)
  const [modalFeed, setModalFeed] = useState(null)

  const handleModal = (feed) => {
    setModalFeed(feed)
    setShowModal(true)
  }

  const handleValueChange = (e, col) => {
    const newValue = { name: col, value: e.target.value }
    setToAdd([...toAdd.filter(a => a.name != col), newValue])
  }

  const addItem = async (e) => {
    if (selected.includes(e) || selected.some(a => a._id == e._id)) return
    if (selected.length > 10) return alert('En fazla 10 yem ekleyebilirsiniz')
    setSelected([...selected, e].sort())
  }
  const addFeed = async (name = newForageName) => {
    if (name == "" || !name) return alert("Lütfen bir yem adı giriniz.")
    if (feeds?.data?.some(a => a.name == name)) return alert("Bu yem zaten var.")
    if (!toAddCategory || !feedType) return alert("Lütfen bir seçim yapınız.")
    let temp = new Map()
    toAdd.map(a => temp.set(a.name, a.value))

    await postItems.reFetchPromise({ body: { Name: name, Price: price, DMFed, EnergyEqClass: energyEQ.name, Category: toAddCategory?._id, ForageDescrp: feedType?.name, City: cities.indexOf(city), data: Object.fromEntries(temp) } }).then(a => {
      if (!a) return alert(a?.error ?? "Bir hata oluştu.")
      feeds.reFetch()

      setToAdd([])
      setShowWindow(false)
    }).catch(e => alert(e))
  }

  const editFeed = async () => {
    if (!toAddCategory || !feedType) return alert("Lütfen bir seçim yapınız.")
    let temp = new Map()
    toAdd.map(a => temp.set(a.name, a.value))

    await putFeeds.reFetchPromise({ body: { id: editID, Name: newForageName, Price: price, DMFed, EnergyEqClass: energyEQ.name, Category: toAddCategory?._id, ForageDescrp: feedType?.name, City: cities.indexOf(city), data: Object.fromEntries(temp) } }).then(a => {
      if (!a) return alert(a?.error ?? "Bir hata oluştu.")
      feeds.reFetch()

      setToAdd([])
      setShowWindow(false)
      setEditMode(false)
    }).catch(e => alert(e))
  }

  const openEditWindow = async (id) => {
    if (!id) {
      setEditMode(false)
      setToAdd([])
      setNewForageName("")
      setEditID(null)
      return
    }

    if (!showWindow) setShowWindow(true)

    setEditMode(true)
    const _feed = feeds.data.find(a => a._id == id)

    setToAdd(_feed.data)
    setEditID(_feed._id)
    setNewForageName(_feed.Name)
    setPrice(_feed.Price)
    setDMFed(_feed.DMFed)
    setEnergyEQ(energyEQC.find(a => a.name == _feed.EnergyEqClass))
    setFeedType(feedTypes.find(a => a.name == _feed.ForageDescrp))
    setToAddCategory(categories.find(a => a._id == _feed.Category))
  }

  const removeFeed = async (e) => {
    let answer = window.confirm("Silmek istediğinize emin misiniz?")
    if (!answer) return
    await postItems.reFetch({ body: { id: e._id }, method: 'DELETE' })
    feeds.reFetch()
  }


  const removeItem = (e) => setSelected(selected.filter(item => item !== e))

  const searchChange = (e) => {
    setTextFilter(e.target.value.toLowerCase())
  }

  const toggleActive = (index) => {
    let selected = buttonState.objects[index]
    changeButtonState({ ...buttonState, activeObject: selected })
    setType(selected.type)
  }


  async function checkToken() {
    const token = localStorage.getItem("token")
    if (!token) {
      Router.push("/login")
    }
  }

  useEffect(() => {
    checkToken()
    sfeeds?.reFetchPromise().then(a => {
      setSelected(a ?? [])
    })
  }, [])

  return (
    <>
      <Head>
        <title>Dairy Farm</title>
        <meta name="description" content="Dairy Farm" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <main className={styles.main + ' flex-col flex flex-1'}>

        <header>
          <div className="flex items-center justify-between flex-wrap bg-black/50 pl-4 select-none">

            <div className="flex w-4/6">
              <div className='flex flex-wrap justify-between'>

                {
                  buttonState.activeObject.type === "User" &&
                  <>
                    <Menu as="div" className="relative inline-block text-left p-2">
                      <div>
                        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                          {city}
                          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                        </Menu.Button>
                      </div>

                      <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                        <Menu.Items className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none overflow-auto max-h-96 z-10">
                          <div className="py-1">
                            {cities.map((item, index) => (
                              <Menu.Item key={index}>
                                <a className='cursor-pointer block px-4 py-2 text-sm hover:bg-sky-600 active:bg-sky-700' onClick={() => setCity(cities[index])}>
                                  {item}
                                </a>
                              </Menu.Item>
                            ))}
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>

                    <button className="ml-2 hover:bg-teal-300 bg-white text-gray-600 font-bold px-4 rounded-full mr-2 my-2" onClick={() => { setShowWindow(!showWindow); openEditWindow(false) }}>
                      {showWindow ? "Pencereyi Kapat" : "Yeni Yem Ekle"}
                    </button>

                  </>
                }


              </div>
            </div>

            <button className="hover:bg-teal-300 bg-blue-600 text-white font-bold px-4 rounded-full mr-2 my-2 p-2" onClick={() => postSFeeds.reFetch({ body: { feedsID: selected?.map(a => a._id) } })}>
              Kaydet
            </button>

          </div>

        </header>


        <div className="justify-between h-full items-stretch flex select-none flex-1 flex-col lg:flex-row overflow-hidden lg:m-4">
          <div className="flex flex-col w-full lg:w-2/6 p-2 h-4/6 lg:h-full lg:p-0 lg:max-h-full overflow-hidden">

            <form className='w-full pb-2 px-1'>
              <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input onChange={searchChange} type="search" className="block p-4 pl-10 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Aramak istediğiniz yemin adını yazınız..." required />

              </div>
            </form>

            <li className="lg:max-h-max flex flex-1 shadow rounded-t-lg flex-col overflow-auto bg-black/50 scrollbar scrollbar-thumb-black scrollbar-track-gray-100">

              <p className="p-4 text-white font-bold text-3xl self-center text-center w-full" key="Label">Yem Listesi</p>
              <div className='flex flex-1 flex-col grid-cols-1 divide-y'>

                {
                  feeds.loading ? <LoadingCircular className='ml-auto' /> :
                    feeds.data?.filter(a => textFilter == "" || a.Name.toLowerCase().includes(textFilter)).filter(a => (selectedType == "Standart" && !a.UserID) || (selectedType == "All") || (selectedType == "User" && a.UserID && (cities.indexOf(city) == 0 ? true : cities.indexOf(city) == a.City ? true : false))).filter(b => category._id != 0 ? b.Category == category._id : true).filter(b => typeFilter.name == 'All' ? 1 : b.ForageDescrp == typeFilter.name).map(item => (
                      <div className={`flex items-center justify-between opacity-75 bg-white w-full hover:bg-sky-200 ${selectedFeed?._id == item._id && "bg-sky-200"}`} key={item._id}>
                        <p className="text-2xl p-2 pl-4 text-gray-900 font-semibold font-sans tracking-wide cursor-pointer" style={{ color: selected.some(a => a.Name == item.Name) ? "Gray" : null }} onClick={() => { }}>{item.Name}</p>
                        <div className="h-full flex-1 m-2" onClick={() => setSelectedFeed(selectedFeed?._id == item._id ? null : item)} />
                        {item?.UserID ?
                          <div className='flex content-center items-center'>
                            <p className='mr-5 text-blue-400 font-semibold font-sans cursor-pointer' onClick={() => { setShowWindow(!showWindow); openEditWindow(item._id) }}>Düzenle</p>
                            <p className='mr-5 text-red-400 font-semibold font-sans cursor-pointer' onClick={() => removeFeed(item)}>Sil</p>
                            {
                              (item.DMFed > 0) && <p className='mr-5 text-blue-400 font-semibold font-sans cursor-pointer' onClick={() => item.Price > 0 ? addItem(item) : handleModal(item)}><MdAdd /></p>
                            }
                          </div> :
                          <div className='flex justify-center content-center items-center mr-2'>
                            <p className='mr-3 text-blue-400 font-semibold font-sans cursor-pointer' onClick={() => { handleModal(item) }}><AiFillEdit /></p>
                            <p className='mr-3 text-blue-400 font-semibold font-sans cursor-pointer items-center align-center self-center justify-center' onClick={() => item.Price > 0 ? addItem(item) : handleModal(item)}><MdAdd /></p>
                            {
                              //(item.DMFed > 0) && <p className='mr-3 text-blue-400 font-semibold font-sans cursor-pointer items-center align-center self-center justify-center' onClick={() => addItem(item)}><MdAdd /></p>
                            }
                          </div>
                        }
                      </div>
                    ))}
              </div>

            </li>

            <div className='p-2 rounded-b-lg bg-black/50 h-max'>

              <Menu as="div" className="relative inline-block text-left mr-4">
                <div>
                  <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                    {buttonState.activeObject.name}
                    <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                  </Menu.Button>
                </div>

                <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                  <Menu.Items className="-top-3 -translate-y-full absolute left-0 w-56 origin-top-left mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none overflow-none max-h-96 z-10">
                    <div className="py-1">
                      {buttonState.objects.map((item, index) => (
                        <Menu.Item key={index}>
                          <a className='cursor-pointer block px-4 py-2 text-sm hover:bg-sky-600 active:bg-sky-700' onClick={() => toggleActive(index)}>
                            {item.name}
                          </a>
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>


              <Menu as="div" className="relative inline-block text-left mr-4 mt-1">
                <div>
                  <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                    Kategori: {category.name}
                    <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                  </Menu.Button>
                </div>

                <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                  <Menu.Items className="-top-3 -translate-y-full absolute left-0 origin-top-left mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none overflow-none max-h-96 z-10">
                    <div className="py-1">
                      {categories.map((item, index) => (
                        <Menu.Item key={item._id}>
                          <a className='cursor-pointer block px-4 py-2 text-sm hover:bg-sky-600 active:bg-sky-700' onClick={() => setCategory(item)}>
                            {item.name}
                          </a>
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <Menu as="div" className="relative inline-block text-left mr-4 mt-1">
                <div>
                  <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                    Tür: {typeFilter?.text}
                    <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                  </Menu.Button>
                </div>

                <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                  <Menu.Items className="-top-3 -translate-y-full absolute left-0 origin-top-left mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none overflow-none max-h-96 z-10">
                    <div className="py-1">
                      {feedTypes.map((item, index) => (
                        <Menu.Item key={item.name}>
                          <a className='cursor-pointer block px-4 py-2 text-sm hover:bg-sky-600 active:bg-sky-700' onClick={() => setTypeFilter(item)}>
                            {item.text}
                          </a>
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>

          </div>
          {
            showEditModal ? <FeedEditModal feed={modalFeed} closeModal={setShowModal} /> :
              showWindow &&
              <div className="flex flex-col w-full lg:w-2/6 p-2 lg:p-0 absolute lg:m-4 lg:static lg:h-auto h-[calc(100%-64px-64px)] z-10 bg-black/95 lg:bg-transparent">
                <div className='overflow-auto flex-col mb-4 scrollbar scrollbar-thumb-gray-600 scrollbar-track-gray-100 grid md:grid-cols-2 lg:grid-cols-1 m-2 lg:m-0'>

                  <div className="flex pb-4 mr-8">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-white border border-r-0 border-gray-300 rounded-l-md w-24">
                      Yem Adı
                    </span>
                    <input defaultValue={newForageName} onChange={(e) => setNewForageName(e.target.value)} type="text" className="rounded-none rounded-r-lg bg-white border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5" placeholder='Yeni Yem' />
                  </div>

                  <div className="flex pb-4 mr-8">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-white border border-r-0 border-gray-300 rounded-l-md w-24">
                      Fiyat
                    </span>
                    <input defaultValue={price} onChange={e => setPrice(e.target.value)} type="number" className="rounded-none rounded-r-lg bg-white border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5" placeholder='0' />
                  </div>

                  <div className="flex pb-4 mr-8">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-white border border-r-0 border-gray-300 rounded-l-md w-24">
                      DMFed
                    </span>
                    <input defaultValue={DMFed} onChange={e => setDMFed(e.target.value)} type="number" className="rounded-none rounded-r-lg bg-white border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5" placeholder='0' />
                  </div>

                  <div className="flex pb-4 mr-8">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-white border border-r-0 border-gray-300 rounded-l-md w-24">
                      Tür
                    </span>
                    <Menu as="div" className="relative inline-block text-left ml-2">
                      <div>
                        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                          {feedType?.text ?? 'Seçiniz'}
                          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                        </Menu.Button>
                      </div>

                      <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                        <Menu.Items className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none overflow-auto max-h-96 z-10">
                          <div className="py-1">
                            {feedTypes.filter(a => a.name != 'All').map((item, index) => (
                              <Menu.Item key={index}>
                                <a className='cursor-pointer block px-4 py-2 text-sm hover:bg-sky-600 active:bg-sky-700' onClick={() => setFeedType(item)}>
                                  {item.text}
                                </a>
                              </Menu.Item>
                            ))}
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>

                  <div className="flex pb-4 mr-8">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-white border border-r-0 border-gray-300 rounded-l-md w-24">
                      Kategori
                    </span>
                    <Menu as="div" className="relative inline-block text-left ml-2">
                      <div>
                        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                          {toAddCategory?.name ?? 'Seçiniz'}
                          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                        </Menu.Button>
                      </div>

                      <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                        <Menu.Items className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none overflow-auto max-h-96 z-10">
                          <div className="py-1">
                            {categories.filter(a => a._id != 0).map((item, index) => (
                              <Menu.Item key={index}>
                                <a className='cursor-pointer block px-4 py-2 text-sm hover:bg-sky-600 active:bg-sky-700' onClick={() => setToAddCategory(item)}>
                                  {item.name}
                                </a>
                              </Menu.Item>
                            ))}
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>

                  <div className="flex pb-4 mr-8">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-white border border-r-0 border-gray-300 rounded-l-md w-24">
                      Enerji Sınıfı
                    </span>
                    <Menu as="div" className="relative inline-block text-left ml-2">
                      <div>
                        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                          {energyEQ?.text ?? 'Seçiniz'}
                          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                        </Menu.Button>
                      </div>

                      <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                        <Menu.Items className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none overflow-auto max-h-96 z-10">
                          <div className="py-1">
                            {energyEQC.map((item, index) => (
                              <Menu.Item key={index}>
                                <a className='cursor-pointer block px-4 py-2 text-sm hover:bg-sky-600 active:bg-sky-700' onClick={() => setEnergyEQ(item)}>
                                  {item.text}
                                </a>
                              </Menu.Item>
                            ))}
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>

                  {columns.data?.map((item, index) => (
                    <div className="flex pb-4 mr-8" key={index}>
                      <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-white border border-r-0 border-gray-300 rounded-l-md w-24">
                        {item}
                      </span>
                      <input onChange={e => handleValueChange(e, item)} defaultValue={toAdd.find(a => a.name == item)?.value ?? undefined} type="number" className="rounded-none rounded-r-lg bg-white border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5" placeholder='0' />
                    </div>))
                  }

                </div>
                <div className='mb-4'>
                  <button className='w-full bg-green-400 text-gray-800 p-2 justify-self-end hover:bg-green-500 rounded-lg font-bold lg:mt-2' onClick={() => editMode ? editFeed() : addFeed()}>{editMode ? `Düzenle` : `${city} için Ekle`}</button>
                </div>
              </div>
          }

          <li className="m-2 lg:m-0 h-2/6 lg:h-full lg:w-2/6 flex shadow rounded-lg flex-col overflow-y-auto bg-black/50 grid-cols-1 divide-y scrollbar scrollbar-thumb-gray-600 scrollbar-track-gray-100 mt-4">
            <p className="p-4 text-white font-bold text-3xl self-center text-center w-full" key="Label">Seçilen Yemler</p>
            {selected.map(item => (
              <div className="flex items-center" key={item._id + 'selected'}>
                <p className="text-2xl p-2 pl-4 text-gray-900 font-semibold font-sans tracking-wide cursor-pointer opacity-75 bg-white w-full hover:bg-sky-200" onClick={() => removeItem(item)}>{item.Name}</p>
              </div>
            ))}
          </li>

        </div>


        {
          selectedFeed &&
          <div className='text-gray-400 font-bold text-2xl pt-2 pl-4 bg-gray-700 h-max mx-4 mb-2 rounded-lg overflow-y scrollbar scrollbar-thumb-gray-600 scrollbar-track-gray-500 flex flex-row'>
            <div className='flex flex-row'>
              {
                selectedFeed?.data.map(a => (
                  <div key={a.ame} className='flex-col m-2 divide-y divide-gray-600 mb-6'>
                    <p className='flex flex-1 whitespace-nowrap'>{a.name}</p>
                    <p className='text-center divide-x'>{a.value}</p>
                  </div>
                ))
              }
            </div>
          </div>
        }


      </main >
    </>
  )
}
