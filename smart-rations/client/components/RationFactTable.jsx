import { useState } from "react"

export default function RationFactTable({ data }) {

    const changeTablePage = (page) => setSPage(page >= 1 && page <= Math.ceil(data?.length / pageSize) ? page : sPage)

    const [sPage, setSPage] = useState(1)
    const pageSize = 10

    return (
        <div className="bg-gray-800 border-[1px] border-gray-900 m-4 overflow-auto relative shadow-md rounded-lg w-max h-max">
            <table className="text-sm text-left text-gray-400">
                <thead className="text-xs uppercase text-gray-400 text-center bg-gray-800">
                    <tr>
                        <th scope="col" className="py-3 px-6 bg-gray-900">
                            Unsurlar
                        </th>
                        <th scope="col" className="py-3 px-6">
                            İhtiyaç
                        </th>
                        <th scope="col" className="py-3 px-6 bg-gray-900">
                            Rasyon
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Denge
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.slice((sPage - 1) * pageSize, pageSize * sPage).map((item, index) => (
                            <tr className="border-b border-gray-900 bg-gray-800" key={index}>
                                <th scope="row" className="py-2 px-6 font-medium whitespace-nowrap text-white bg-gray-900">
                                    {item.unsur}
                                </th>
                                <td className="px-6 text-center">
                                    {item.ihtiyac}
                                </td>
                                <td className="px-6 bg-gray-900">
                                    {item.rasyon}
                                </td>
                                <td className="px-6">
                                    {item.denge}
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
            <nav className="flex m-2 justify-between items-center" aria-label="Table navigation">
                <span className="text-sm font-normal text-gray-400"><span className="font-semibold text-white">{sPage == 1 ? 1 : (sPage - 1) * pageSize}-{sPage * pageSize}</span> of <span className="font-semibold text-white">{data?.length}</span></span>
                <ul className="inline-flex items-center -space-x-px">
                    <li>
                        <a onClick={() => changeTablePage(sPage - 1)} className="block py-2 px-3 ml-0 leading-tight rounded-l-lg border bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white">
                            <span className="sr-only">Önceki</span>
                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                        </a>
                    </li>
                    {
                        [...Array(Math.ceil(data?.length / pageSize))].map((_, index) => (
                            <li key={index}>
                                <a onClick={() => setSPage(index + 1)} className={`cursor-pointer py-2 px-3 leading-tight bg-gray-800 border border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white ${sPage == index + 1 && "bg-gray-900"}`}>{index + 1}</a>
                            </li>
                        ))
                    }

                    <li>
                        <a onClick={() => changeTablePage(sPage + 1)} className="block py-2 px-3 leading-tight rounded-r-lg border bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white">
                            <span className="sr-only">Sonraki</span>
                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}