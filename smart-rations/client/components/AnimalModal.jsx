import AnimalAddPage from "../page_views/animal_add";

export default function AnimalModal({ closeModal, animal }) {
    return (
        <>
            <div className='absolute h-full w-full bg-black flex translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] z-0' style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={() => closeModal(false)} />

            <div className='absolute bg-gray-600 rounded-lg backdrop-blur-3xl w-[90%] h-[90%] lg:h-[80%] lg:w-[80%] translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] z-100 drop-shadow-2xl flex-row p-4 overflow-auto'>
                {/*   <p className="text-white m-4 text-semibold text-2xl">{ranch.Name} Çiftliği</p> */}
                <div className='flex flex-col justify-center'>
                    <AnimalAddPage animal={animal} />
                </div>
            </div>
        </>
    )
}