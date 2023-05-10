import Board from "./components/Board"
import Link from "next/link"

export default function Home() {
  return (
    <div className="h-screen w-screen text-white flex flex-col justify-center items-center space-y-5 p-3 text-center">
      <h1 className="font-bold text-5xl">Miracle Flights Visualization Site</h1>
      <p className="text-gray-400 text-lg">Visualize the amazing work Miracle Flights is doing by viewing our Flight Boards. All data is in real time!</p>
      <div className="flex space-x-5 text-xl">
        <Link href="/departures" className="py-2 px-5 shadow-2xl bg-sky-400 rounded-md text-white hover:opacity-80 duration-500">Departures</Link>
        <Link href="/returns" className="py-2 px-5 shadow-2xl bg-red-800 rounded-md text-white hover:opacity-80 duration-500">Returns</Link>
      </div>
    </div>
  )
}
