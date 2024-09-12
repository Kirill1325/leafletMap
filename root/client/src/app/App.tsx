import { useEffect, useRef, useState } from "react"
import { LatLngLiteral } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import './App.css'
import MarkerClusterGroup from "react-leaflet-cluster";
import { userApi } from "./userService";

interface User {
  userId: number,
  position: LatLngLiteral
}

function App() {

  const [myPosition, setMyPosition] = useState<User>()

  const [users, setUsers] = useState<User[]>([
    // { userId: 3, position: { lat: 58.8312342, lng: 30.5326685 } },
    // { userId: 4, position: { lat: 58.8312242, lng: 30.5328685 } },
  ])

  // const positions: User[] = [
  //   { userId: 3, position: [58.8312342, 30.5326685] },
  //   { userId: 4, position: [57.8312342, 30.5326685] },
  // ]

  const [connected, setConnected] = useState(false);

  const successCallback = (position: GeolocationPosition) => {
    setMyPosition({ userId: Date.now(), position: { lat: position.coords.latitude, lng: position.coords.longitude } })
  };

  const errorCallback = (error: GeolocationPositionError) => {
    console.log(error);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
  }, [])

  useEffect(() => {
    console.log(users)
  }, [users])

  const socket = useRef<WebSocket>()

  function connect() {

    socket.current = new WebSocket('https://leafletmap-glmu.onrender.com/')
    // socket.current = new WebSocket('ws://localhost:8080')

    socket.current.onopen = () => {
      console.log('Connected')
      // socket.current?.send(JSON.stringify(myPosition?.userId + ' connected'))
      setConnected(true)
    }

    socket.current.onmessage = (event) => {
      // console.log('message received')
      console.log(JSON.parse(event.data))

      const data: User = JSON.parse(event.data)

      // setUsers([...users, data])
      // setUsers(prevPositions => [...prevPositions, data])
      const set = new Set(users.map(user => JSON.stringify(user)));
      const arr = Array.from(set).map(item => JSON.parse(item));

      setUsers([...arr, data])
    }

    socket.current.onclose = () => {
      console.log('Socket закрыт')
    }
    socket.current.onerror = () => {
      console.log('Socket произошла ошибка')
    }
  }

  const [createUser] = userApi.useCreateUserMutation()

  useEffect(() => {
    const timeoutId = setInterval(() => {
      socket.current && socket.current.send(JSON.stringify(myPosition))
    }, 2500)

    return () => clearInterval(timeoutId)
  }, [myPosition])

  if (!connected) return (
    <div className="container">
      <button onClick={connect}>Connect</button>
      <button onClick={() => createUser({ username: 'test' })}>ccreate</button>
    </div>
  )



  return (
    myPosition &&
    <MapContainer center={myPosition.position} zoom={13} style={{ height: '100vh' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MarkerClusterGroup>
        <Marker position={myPosition.position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>

        {/* TODO: change key to id */}
        {users && users.map((user, idx) =>
          <Marker key={user.userId} position={user.position}>
            <Popup>
              A pretty CSS3 popup. <br /> {users.indexOf(user)}
            </Popup>
          </Marker>
        )}
      </MarkerClusterGroup>
    </MapContainer>
  )
}

export default App
