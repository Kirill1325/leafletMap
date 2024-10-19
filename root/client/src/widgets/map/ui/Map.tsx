// import L from 'leaflet';
// import { renderToString } from 'react-dom/server';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
// import { Icon } from '../../../entities/icon';
import { UserPosition } from '../../../entities/UserCard/model/types';

// const icon2 = L.divIcon({
//     className: "custom icon",
//     iconSize: [84, 84],
//     iconAnchor: [42, 84],
//     popupAnchor: [0, -60],
//     html: renderToString(<Icon />)
// })

interface MapProps {
    myPosition: UserPosition,
    positions: UserPosition[]
}

export const Map = ({ myPosition, positions }: MapProps) => {
    return (
        <MapContainer center={{ lat: myPosition.lat, lng: myPosition.lng }} zoomControl={false} zoom={13} style={{ height: '100vh' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MarkerClusterGroup>
                {positions && positions.map(pos =>
                    <Marker key={pos.user_id} position={{ lat: pos.lat, lng: pos.lng }} >
                        {/* <Marker position={{ lat: 59.831367, lng: 30.513092 }} > */}
                        <Popup>
                            A pretty CSS3 popup. <br /> {pos.username}
                        </Popup>
                    </Marker>
                )}
            </MarkerClusterGroup>
        </MapContainer>
    )
}

