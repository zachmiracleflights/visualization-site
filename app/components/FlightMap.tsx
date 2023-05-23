'use client'

import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import L from "leaflet"
import { useEffect, useState } from "react"
import { uid } from "uid";

export default function FlightMap() {
    const [data, setData] = useState<number[][][]>()
    const [loaded, setLoaded] = useState<boolean>(false)

    useEffect(() => {
        const getData = async () => {
            const trips: any = []
            const locations: number[][][] = []
            const departureRes = await fetch('https://weary-teal-sheep.cyclic.app/departures')
            const departureData = await departureRes.json()
        
            departureData.forEach((data: any) => {
                trips.push(
                    [data.departure_city, data.arrival_city]
                )
            })
        
            const returnRes = await fetch('https://weary-teal-sheep.cyclic.app/returns')
            const returnData = await returnRes.json()
        
            returnData.forEach((data: any) => {
                trips.push(
                    [data.departure_city, data.arrival_city]
                )
            })
        
            for (const trip of trips) {
                const tripCoordinates: number[][] = []
                for (const leg of trip) {
                    const coordinates: number[] = []
                    const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${leg}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`)
                    const data = await res.json()
                    coordinates.push(
                        data.results[0].geometry.location.lat
                    )
                    coordinates.push(
                        data.results[0].geometry.location.lng
                    )
                    tripCoordinates.push(coordinates)
                }
                locations.push(tripCoordinates)
            }

            console.log(locations)
            setData(locations)
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
                data?.map((subData: any) => {
                    return (
                        <MarketSet key={uid()} coordinateSet={subData}/>
                    )
                })
            }
            {
                data?.map((subData: any) => {
                    return (
                        <Polyline key={uid()} pathOptions={redOptions} positions={subData}/>
                    )
                })
            }
        </MapContainer> :
        <div className="bg-neutral-200 rounded-lg p-10 h-96 animate-pulse"></div>
    );
}

function MarketSet(props: any) {
    const { coordinateSet } : any = props
    return (
        <>
            {
                coordinateSet.map((coordinates: any) => {
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
        </>
    )
}
 