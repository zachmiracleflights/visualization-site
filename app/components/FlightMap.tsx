'use client'

import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import L from "leaflet"
import { useEffect, useState } from "react"
import { uid } from "uid";

export default function FlightMap() {

    const [data, setData] = useState<any>()

    useEffect(() => {
        const getData = async () => {
            const airports: any = []
            const departureRes = await fetch('https://weary-teal-sheep.cyclic.app/departures')
            const departureData = await departureRes.json()
        
            departureData.forEach((data: any) => {
                airports.push(
                    [data.departure_city, data.arrival_city]
                )
            })
        
            const returnRes = await fetch('https://weary-teal-sheep.cyclic.app/returns')
            const returnData = await returnRes.json()
        
            returnData.forEach((data: any) => {
                airports.push(
                    [data.departure_city, data.arrival_city]
                )
            })
        
            console.log(airports)
            setData(airports)
        }
        getData()
    }, [])

    const testPolyline = [
        [36.1716, -115.1391],
        [40.4237, -86.9212]
    ]

    const redOptions = { color: 'red'}

    return (
        <MapContainer style={{ height: 536 } } center={[37.0902, -95.7129]} zoom={4} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                testPolyline.map((coordinates: any) => {
                    return (
                        <Marker 
                            key={uid()}
                            position={coordinates}
                            icon={L.icon({
                                iconUrl: '/airplaneicon.png',
                                iconRetinaUrl: '/airplaneicon.png',
                                iconSize: [30, 30]
                            })}
                        >
                            <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                        </Marker>            
                    )
                })
            }
            {/* @ts-ignore */}
            <Polyline pathOptions={redOptions} positions={testPolyline}/>
        </MapContainer>
    );
}
