import { useEffect, useRef, useState } from "react"
import { LatLngLiteral } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import './App.css'

interface Position extends LatLngLiteral {
  userId: number
}

function App() {

  const [myPosition, setMyPosition] = useState<Position>()
  const [connected, setConnected] = useState(false);

  const successCallback = (position: GeolocationPosition) => {
    setMyPosition({ userId: Date.now(), lat: position.coords.latitude, lng: position.coords.longitude })
  };

  const errorCallback = (error: GeolocationPositionError) => {
    console.log(error);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
  }, [])


  const socket = useRef<WebSocket>()

  function connect() {

    socket.current = new WebSocket('https://leafletmap-glmu.onrender.com/')
    // socket.current = new WebSocket('ws://localhost:8080')

    socket.current.onopen = () => {
      console.log('Connected')
      socket.current?.send(JSON.stringify(myPosition?.userId + ' connected'))
      setConnected(true)
    }

    socket.current.onmessage = (event) => {
      console.log('message received')
      console.log(JSON.parse(event.data))
    }

    socket.current.onclose = () => {
      console.log('Socket закрыт')
    }
    socket.current.onerror = () => {
      console.log('Socket произошла ошибка')
    }
  }

  useEffect(() => {
    const timeoutId = setInterval(() => {
      socket.current && socket.current.send(JSON.stringify(myPosition))
    }, 2500)

    return () => clearInterval(timeoutId)
  }, [myPosition])

  if (!connected) return (
    <div className="container">
      <button onClick={connect}>Connect</button>
    </div>
  )

  return (
    myPosition &&
    <MapContainer center={myPosition} zoom={13} style={{ height: '100vh' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={myPosition}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      {/* {positions && positions.map(position =>
        <Marker key={position.id} position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      )} */}
    </MapContainer>
  )
}

export default App
