async function getFlights(route: string) {
    const res = await fetch("https://visualization-backend-production.up.railway.app/" + route, { next: { revalidate: 60 } })
    const data = await res.json()
    return data
}

const getStatus = (arrivalTime: Date, time: Date): string => {
    const currTime = new Date()

    if (currTime > arrivalTime) {
        return "Landed"
    } else if (currTime > time) {
        return "En Route"
    } else {
        return "On Time"
    }
}

const formatTime = (date: Date) => {
    const formatted = date.toLocaleString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC",
    })
    return formatted
}

export default async function Board(props: any) {
    const { route } = props
    const flights = await getFlights(route)

    return (
        <div className="rounded-md board flex flex-col space-y-4 items-center py-5">
            <h1 className="text-center w-full font-bold text-4xl 2xl:text-6xl">{route.substring(0, 1).toUpperCase() + route.substring(1)}</h1>
            <div className="flex flex-col space-y-0.5">
                <hr className="bg-[#A8BBDf] h-1 w-full border-0"/>
                <hr className="bg-[#8D2D39] h-1 w-full border-0"/>
                <table className="table-fixed w-full text-xs md:text-xl lg:text-2xl 2xl:text-2xl">
                    <thead className="uppercase bg-[#485B7E]">
                        <tr>
                            <th className="py-1.5">to</th>
                            <th className="py-1.5">from</th>
                            <th className="py-1.5">airline</th>
                            <th className="py-1.5">flight</th>
                            <th className="py-1.5">time</th>
                            <th className="py-1.5">status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            flights.map((data: any) => {
                                return (
                                    <tr className="text-center">
                                        <td className="py-2">{data.to}</td>
                                        <td className="py-2">{data.from}</td>
                                        <td className="py-2">{data.airline}</td>
                                        <td className="py-2">{data.flight}</td>
                                        <td className="py-2">{formatTime(new Date(data.time)).substring(formatTime(new Date(data.time)).indexOf(",") + 1) + " " + data.timezone}</td>
                                        <td className="py-2">{getStatus(new Date(data.arrival_time), new Date(data.time))}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}