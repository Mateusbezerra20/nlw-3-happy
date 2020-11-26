import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import api from '../services/api'

import mapMarkerImg from '../images/map-marker.svg'

import '../styles/pages/orphanages-map.css'

import mapIcon from '../utils/mapIcon'

interface Orphanage {
    id: number
    name: string
    latitude: number
    longitude: number
}

function OrphanagesMap() {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([])

    useEffect(() => {
        api.get('orphanages').then(response => {
            setOrphanages(response.data)
        })
    }, [])

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy" />
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>
                <footer>
                    <strong>São João do Carú</strong>
                    <span>Maranhão</span>
                </footer>
            </aside>

            <Map
                center={[-4.2303183, -44.7822702]}
                zoom={15}
                style={{width: '100%', height: '100%'}}
            >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {orphanages.map(orphanage => {
                    // Marcadores dos orfanatos no mapa
                    return (
                        <Marker 
                        key={orphanage.id}
                        icon={mapIcon}
                        position={[orphanage.latitude, orphanage.longitude]}
                        >
                            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                                {orphanage.name}
                                <Link to={`/Orphanage/${orphanage.id}`}>
                                    <FiArrowRight size={20} color='#FFF' />
                                </Link>
                            </Popup>
                        </Marker>
                    )
                })}

            </Map>

            <Link to="/orphanage/create" className="create-orphanage">
                <FiPlus size={32} color="#FFF" />
            </Link>
        </div>
    )
}

export default OrphanagesMap