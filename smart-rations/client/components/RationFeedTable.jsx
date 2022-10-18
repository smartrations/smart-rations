export default function RationFeedTable({ items, feedData }) {
    return (
        <div className="bg-gray-800 border-[1px] border-gray-900 m-4 overflow-auto relative shadow-md rounded-lg w-max h-max">
            <table className="text-sm text-left text-gray-400">
                <thead className="text-xs text-gray-400 text-center bg-gray-800">
                    <tr>
                        <th scope="col" className="py-3 px-6 bg-gray-900">
                            Yem
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Miktar
                        </th>
                        <th scope="col" className="py-3 px-6 bg-gray-900">
                            KM
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Oran
                        </th>
                        <th scope="col" className="py-3 px-6 bg-gray-900">
                            Tutar
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items?.map((item, index) => (
                            <tr className="border-b border-gray-900 bg-gray-800 text-center" key={index}>
                                <th scope="row" className="py-2 px-6 font-medium  text-white bg-gray-900">
                                    {item.Name}
                                </th>
                                <td className="px-6 text-center">
                                    {feedData?.find(x => x?.Name === item.Name)?.DMC}
                                </td>
                                <td className="px-6 bg-gray-900">
                                    {feedData?.find(x => x?.Name === item.Name)?.DMFed}
                                </td>
                                <td className="px-6">
                                    {(feedData?.percents && feedData?.percents[index]) ?? ''}
                                </td>
                                <td className="px-6 bg-gray-900">
                                    {(feedData && feedData[index].Price) ?? 0}
                                </td>
                            </tr>
                        ))
                    }
                    <tr className="bg-gray-500 border-b border-gray-900 text-center">
                        <th scope="row" className="py-2 px-6 font-medium  whitespace-nowrap text-white bg-gray-500">
                            Toplam
                        </th>
                        <td className="px-6 text-center">
                            {feedData?.map(a => a.DMC).reduce((a, b) => a = (parseFloat(a) + parseFloat(b)).toFixed(4), 0)}
                        </td>
                        <td className="px-6">
                            {feedData?.map(a => a.DMFed).reduce((a, b) => a = (parseFloat(a) + parseFloat(b)).toFixed(4), 0)}
                        </td>
                        <td className="px-6">
                            {feedData?.percents.reduce((a, b) => a = (parseFloat(a) + parseFloat(b)).toFixed(4), 0)}
                        </td>
                        <td className="px-6">
                            {feedData?.map(a => a.Price).reduce((a, b) => a = (parseFloat(a) + parseFloat(b ?? 0)).toFixed(4), 0)}
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    )
}