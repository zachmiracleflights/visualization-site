import Board from "./components/Board"

export default function Home() {
  return (
    <main className="h-screen w-screen text-white flex flex-col space-y-5 p-10 text-center items-center max-w-full">
      <div className="shadow-2xl lg:m-20 rounded-md bg-cover bg-[url('/HalfHeart.png')] bg-right-bottom">
          {/* @ts-expect-error Async Server Component */}
          <Board route={"departures"}/>
          {/* @ts-expect-error Async Server Component */}
          <Board route={"returns"}/>
      </div>
    </main>
  )
}
