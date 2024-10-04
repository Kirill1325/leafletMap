import { useEffect, useRef, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { userApi } from "../../../entities/UserCard/api/userService";
// import { UserDto } from "../../../entities/UserCard/model/types";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { setUser } from "../../../entities/UserCard/model/userSlice";
// import cl from './MainPage.module.scss'
import { useNavigate } from "react-router-dom";
import { UserPosition } from "../../../entities/UserCard/model/types";

export const MainPage = () => {

  const dispatch = useAppDispatch()
  const { user } = useAppSelector(state => state.userSlice)

  useEffect(() => {
    console.log(user)
  }, [user])

  const [refresh] = userApi.useRefreshMutation()
  const [logout] = userApi.useLogoutMutation()

  const [myPosition, setMyPosition] = useState<UserPosition>()

  const navigate = useNavigate()

  const isLogged = localStorage.getItem('token')

  useEffect(() => {

    if (isLogged) {
      refresh().unwrap().then(userFetced => {
        dispatch(setUser(userFetced.user))
      })

    } else {
      navigate('/registration')
    }

  }, [])

  useEffect(() => {
    if (isLogged && user.id) {
      connect()
    }
  }, [user])

  useEffect(() => {
    const successCallback = (position: GeolocationPosition) => {
      setMyPosition({ userId: parseInt(user.id), position: { lat: position.coords.latitude, lng: position.coords.longitude } })
    };

    const errorCallback = (error: GeolocationPositionError) => {
      console.log(error);
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
  }, [user])

  const socket = useRef<WebSocket>()

  function connect() {

    // socket.current = new WebSocket('https://leafletmap-glmu.onrender.com/')
    // socket.current = new WebSocket('ws://localhost:8080/')
    socket.current = new WebSocket(import.meta.env.VITE_SERVER_URL)

    socket.current.onopen = () => {
      console.log(`${user.username} Connected`)
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

  const handleLogout = () => {
    logout()
    localStorage.removeItem('token')
    navigate('/registration')
  }

  return (
    myPosition &&
    <div>
      <button onClick={() => handleLogout()}>logout</button>
      <MapContainer center={myPosition.position} zoom={13} style={{ height: '100vh' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MarkerClusterGroup>
          <Marker position={myPosition.position}>
            <Popup>
              {user.username}
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
