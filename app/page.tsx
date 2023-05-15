import Board from "./components/Board"
import Link from "next/link"

export default function Home() {
  return (
    <main className="h-screen w-screen text-white flex flex-col justify-center items-center space-y-5 p-3 text-center">
      <div className="shadow-2xl m-16 rounded-md">
          {/* @ts-expect-error Async Server Component */}
          <Board route={"departures"}/>
          {/* @ts-expect-error Async Server Component */}
          <Board route={"returns"}/>
        </div>
    </main>
  )
}
