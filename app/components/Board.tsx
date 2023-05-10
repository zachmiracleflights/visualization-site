import { FaPlaneDeparture, FaPlaneArrival } from "react-icons/fa"

async function getFlights(route: string) {
    const res = await fetch("https://visualization-backend-production.up.railway.app/" + route, { cache: "no-store" })
    const data = await res.json()
    return data
}

const testData = [
    {
        time: "04:28",
        airline: "Spirit",
        to: "Indiana",
        from: "Las Vegas",
        flight: "1234",
    }
]

export default async function Board(props: any) {
    const { route } = props
    const flights = await getFlights(route)

    return (
        <div className="board 2xl:w-2/5 m-2 md:m-3 lg:m-28 bg-black text-white flex flex-col space-y-5 items-center py-5">
            <div className="flex items-center justify-between 2xl:text-4xl p-4 w-full mt-3">
                <div className="bg-yellow-300 rounded-full p-3 text-black">
                    {
                        route == "departures" ? <FaPlaneDeparture/> : <FaPlaneArrival/>
                    }
                </div>
                <h1 className="font-bold text-4xl 2xl:text-6xl text-yellow-300">{route.substring(0, 1).toUpperCase() + route.substring(1)}</h1>
                <div></div>
            </div>
            <table className="table-fixed w-full text-xs md:text-xl 2xl:text-2xl">
                <thead className="uppercase text-neutral-400">
                    <tr>
                        <th>time</th>
                        <th>to</th>
                        <th>from</th>
                        <th>airline</th>
                        <th>flight</th>
                        <th>status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        flights.map((data: any) => {
                            return (
                                <tr className="text-center">
                                    <td>{data.time}</td>
                                    <td className="text-yellow-300">{data.to}</td>
                                    <td>{data.from}</td>
                                    <td>{data.airline}</td>
                                    <td>{data.flight}</td>
                                    <td className="text-green-400">On Time</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}