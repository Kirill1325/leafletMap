import { useEffect, useRef, useState } from "react"
import { LatLngLiteral } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { userApi } from "../../../entities/UserCard/api/userService";
import { redirect, useNavigate } from "react-router-dom";
import { LoginForm } from "../../../widgets/LoginForm";
import { UserDto } from "../../../entities/UserCard/model/types";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { setUser } from "../../../entities/UserCard/model/userSlice";

interface User {
  userId: number,
  position: LatLngLiteral
}

export const MainPage = () => {

  const navigate = useNavigate()

  const dispatch = useAppDispatch()


  const [refresh] = userApi.useRefreshMutation()

  const [logout] = userApi.useLogoutMutation()

  const { user } = useAppSelector(state => state.userSlice)

  useEffect(() => {
    const isLogged = localStorage.getItem('token')
    console.log(isLogged)
    if (isLogged) {
      refresh().unwrap().then(userFetced => {
        console.log(userFetced.user)
        dispatch(setUser(userFetced.user))
      })
    } 

  }, [])

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

  // useEffect(() => {
  //   console.log(users)
  // }, [users])

  const socket = useRef<WebSocket>()

  function connect() {

    // socket.current = new WebSocket('https://leafletmap-glmu.onrender.com/')
    socket.current = new WebSocket('ws://localhost:8082/api')

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

  useEffect(() => {
    const timeoutId = setInterval(() => {
      socket.current && socket.current.send(JSON.stringify(myPosition))
    }, 2500)

    return () => clearInterval(timeoutId)
  }, [myPosition])

  const handleLogout = () => {
    logout()
    localStorage.clear()
    dispatch(setUser({} as UserDto))
  }

  if (!connected) return (
    <div className="container">
      <button onClick={connect}>Connect</button>
      <button onClick={handleLogout}>logout</button>
      {user.email
        ?
        <div>
          <p>you're logged in</p>
          <p>{user.email}</p>
        </div>
        :
        <LoginForm />
      }
    </div>
  )

  return (
    // <>
    //   <p>map here</p>
    //   <button onClick={() => handleLogout()}>logout</button>
    // </>
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
        {users && users.map(user =>
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
