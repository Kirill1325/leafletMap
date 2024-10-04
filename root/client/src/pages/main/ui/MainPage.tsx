import { useEffect, useRef, useState } from "react"
import { LatLngLiteral } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { userApi } from "../../../entities/UserCard/api/userService";
// import { UserDto } from "../../../entities/UserCard/model/types";
import { useAppDispatch } from "../../../app/store";
import { setUser } from "../../../entities/UserCard/model/userSlice";
// import cl from './MainPage.module.scss'
import { useNavigate } from "react-router-dom";

interface User {
  userId: number,
  position: LatLngLiteral
}

export const MainPage = () => {

  const dispatch = useAppDispatch()

  const [refresh] = userApi.useRefreshMutation()
  const [logout] = userApi.useLogoutMutation()

  const [myPosition, setMyPosition] = useState<User>()

  const navigate = useNavigate()

  const successCallback = (position: GeolocationPosition) => {
    setMyPosition({ userId: Date.now(), position: { lat: position.coords.latitude, lng: position.coords.longitude } })
  };

  const errorCallback = (error: GeolocationPositionError) => {
    console.log(error);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
  }, [])

  const socket = useRef<WebSocket>()

  function connect() {

    // socket.current = new WebSocket('https://leafletmap-glmu.onrender.com/')
    // socket.current = new WebSocket('ws://localhost:8080/')
    socket.current = new WebSocket(import.meta.env.VITE_SERVER_URL)

    socket.current.onopen = () => {
      console.log('Connected')
    }

    socket.current.onmessage = (event) => {
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
    }, 5000)

    return () => clearInterval(timeoutId)
  }, [myPosition])

  useEffect(() => {
    const isLogged = localStorage.getItem('token')
    if (isLogged) {
      refresh().unwrap().then(userFetced => {
        dispatch(setUser(userFetced.user))
      })
      connect()
    }else{
      navigate('/registration')
    }

  }, [])

  const handleLogout = () => {
    logout()
    localStorage.removeItem('token')
    navigate('/registration')
  }

  return (
    myPosition &&
    <div>
      <button onClick={() => handleLogout()}>bifffffffffba</button>
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

          {/* {users && users.map(user =>
            <Marker key={user.userId} position={user.position}>
              <Popup>
                A pretty CSS3 popup. <br /> {users.indexOf(user)}
              </Popup>
            </Marker>
          )} */}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  )
}
