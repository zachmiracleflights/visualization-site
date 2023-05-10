import Board from "../components/Board";

export default function Departures() {
    return (
        <>
            {/* @ts-expect-error Async Server Component */}
            <Board route={"departures"}/>
        </>
    )
}