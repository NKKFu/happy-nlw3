import React, { useEffect, useState } from 'react';
import { Container } from './styles';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import mapMarkerImg from '../../images/map-marker.svg';
import Leaflet from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import { Link } from 'react-router-dom';
import { api } from '../../services/api';

const mapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2]
});

interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

export const OrphanagesMap: React.FC = () => {

    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    useEffect(() => {
        api.get('orphanages')
            .then(response => {
                setOrphanages(
                    response.data
                );
            });
    }, []);

    return (
        <Container>
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy" />
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>
                <footer>
                    <strong>Manaus</strong>
                    <span>Amazonas </span>
                </footer>
            </aside>

            <Map
                center={[-3.04012, -59.9681458]}
                zoom={15}
                style={{ width: '100%', height: '100%' }}
            >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {orphanages.map((orphanage) => (
                    <Marker
                        key={orphanage.id}
                        position={[orphanage.latitude, orphanage.longitude]}
                        icon={mapIcon}
                    >
                        <Popup closeButton={false} maxWidth={240} minWidth={240}>
                            {orphanage.name}
                            <Link to={`/orphanages/${orphanage.id}`}>
                                <FiArrowRight size={20} color={'#FFF'} />
                            </Link>
                        </Popup>
                    </Marker>
                ))}
            </Map>

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#FFF" />
            </Link>
        </Container>
    );
}
