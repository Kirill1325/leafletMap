import { useEffect, useRef, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { userApi } from "../../../entities/UserCard/api/userService";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { setUser } from "../../../entities/UserCard/model/userSlice";
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

  const [skip, setSkip] = useState(false)
  const { data: positions } = userApi.useGetPositionsQuery(1, {skip: skip})

  useEffect(() => {
    console.log(positions)
  }, [positions])

  const navigate = useNavigate()

  const isLogged = localStorage.getItem('token')

  useEffect(() => {

    if (isLogged) {
      refresh().unwrap().then(userFetced => {
        dispatch(setUser(userFetced.user))
        setSkip(true)
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
      setMyPosition({ user_id: user.id, lat: position.coords.latitude, lng: position.coords.longitude })
      // dispatch(setUserPosition({ lat: position.coords.latitude, lng: position.coords.longitude }))
    }

    const errorCallback = (error: GeolocationPositionError) => {
      console.log(error)
    }

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
  }, [user])

  const socket = useRef<WebSocket>()

  function connect() {

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
      <MapContainer center={{ lat: myPosition.lat, lng: myPosition.lng }} zoom={13} style={{ height: '100vh' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MarkerClusterGroup>
          {/* <Marker position={{ lat: myPosition.lat, lng: myPosition.lng }} >
            <Popup >
              {user.username}
            </Popup>
          </Marker> */}

          {positions && positions.map(pos =>
            <Marker key={pos.user_id} position={{ lat: pos.lat, lng: pos.lng }}>
              <Popup>
                A pretty CSS3 popup. <br /> {pos.user_id}
              </Popup>
            </Marker>
          )}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  )
}
