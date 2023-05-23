import Board from "./components/Board"
import Image from "next/image"

export default function Home() {
  return (
    <main className="h-screen w-screen text-white flex flex-col justify-center items-center space-y-5 p-3 text-center">
      <div className="shadow-2xl lg:m-20 rounded-md bg-cover bg-[url('/HalfHeart.png')] bg-right-bottom">
          {/* <Image  
            src="/HalfHeart.png"
            alt="half-heart"
            width={1920}
            height={1080}
            className="bottom-0"
          /> */}
          {/* @ts-expect-error Async Server Component */}
          <Board route={"departures"}/>
          {/* @ts-expect-error Async Server Component */}
          <Board route={"returns"}/>
      </div>
    </main>
  )
}
