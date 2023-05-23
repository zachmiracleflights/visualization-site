'use client';

import dynamic from "next/dynamic"
import { Suspense } from "react";
const FlightMap = dynamic(() => import("../components/FlightMap"), { ssr:false })

export default function Map() {
    return (
        <div className="m-10 rounded-lg">
            <FlightMap/>
        </div>
    )
}