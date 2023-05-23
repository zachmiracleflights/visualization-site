'use client'

import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import L from "leaflet"
import { useEffect, useState } from "react"
import { uid } from "uid";

export default function FlightMap() {
    const [data, setData] = useState<any[]>()
    const [loaded, setLoaded] = useState<boolean>(false)

    useEffect(() => {
        const getData = async () => {
            const trips: any = []
            const departureRes = await fetch('https://weary-teal-sheep.cyclic.app/departures')
            const departureData = await departureRes.json()
        
            departureData.forEach((data: any) => {
                trips.push(data)
            })
        
            const returnRes = await fetch('https://weary-teal-sheep.cyclic.app/returns')
            const returnData = await returnRes.json()
        
            returnData.forEach((data: any) => {
                trips.push(data)
            })

            setData(trips)
            setLoaded(true)
        }
        getData()
    }, [])

    const redOptions = { color: 'red'}

    return (
        loaded ?
        <MapContainer style={{ height: 536 } } center={[37.0902, -95.7129]} zoom={4} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                data?.map((object: any) => {
                    return (
                        <Marker 
                            key={uid()}
                            position={object.departure_coords}
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
            {
                data?.map((object: any) => {
                    return (
                        <Marker 
                            key={uid()}
                            position={object.arrival_coords}
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
            {
                data?.map((object: any) => {
                    const coordsArr = []
                    coordsArr.push(object.departure_coords)
                    coordsArr.push(object.arrival_coords)
                    return (
                        <Polyline key={uid()} pathOptions={redOptions} positions={coordsArr} />
                    )
                })
            }
        </MapContainer> :
        <div className="bg-neutral-200 rounded-lg p-10 h-96 animate-pulse"></div>
    );
}