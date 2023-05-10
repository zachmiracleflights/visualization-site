import Link from "next/link"

export default function Footer() {
    return (
        <nav className="absolute bottom-0 w-screen flex justify-center space-x-2 p-5 text-gray-400">
            <div className="flex space-x-5 text-xs">
                <Link href="/" className="hover:text-sky-400 duration-500">Home</Link>
                <Link href="/departures" className="hover:text-sky-400 duration-500">Departures</Link>
                <Link href="/returns" className="hover:text-sky-400 duration-500">Returns</Link>
            </div>
        </nav>
    )
}