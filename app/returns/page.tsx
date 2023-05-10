import Board from "../components/Board"

export default function Returns() {
    return (
        <>
            {/* @ts-expect-error Async Server Component */}
            <Board route={"returns"}/>
        </>
    )
}