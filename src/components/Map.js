import './Map.css';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MapPoint from './map_point.svg';
import L from 'leaflet';

const getIcon = (i) => {
    return L.icon({
        iconUrl: MapPoint,
        iconSize: [30],
        iconAnchor: [15, 30]
    })
}

function Map({ cities }) {
    return (
        <div className="Map" id='Map'>
            <MapContainer center={[46.716, 1.69125]} zoom={5} style={{width: `${window.innerWidth}px`, height: '100%'}}>
                <TileLayer
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                {cities.map((city, i) => (
                    <Marker
                        key={i}
                        position={[city.lat, city.lng]}
                        radius={5}
                        icon={getIcon(i)}
                    />
                ))}
            </MapContainer>
        </div>
    )
}

export default Map;