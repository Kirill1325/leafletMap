import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { userApi } from "../../../entities/UserCard/api/userService";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { setUser } from "../../../entities/UserCard/model/userSlice";
import { useNavigate } from "react-router-dom";
import { UserPosition } from "../../../entities/UserCard/model/types";
import cl from './MainPage.module.scss'
import { InteractionButtons } from "../../../entities/interactionButtons";
import { SettingsButton } from "../../../entities/settinsButton/ui/SettingsButton";
import { socket } from "../../../app/main";

export const MainPage = () => {

  // TODO: fix marker blinking when refetching

  const dispatch = useAppDispatch()
  const { user } = useAppSelector(state => state.userSlice)

  useEffect(() => {
    console.log(user)
  }, [user])

  const [refresh] = userApi.useRefreshMutation()
  // const [logout] = userApi.useLogoutMutation()

  const [myPosition, setMyPosition] = useState<UserPosition>()

  // const [skip, setSkip] = useState(true)
  // const { data: positions, refetch } = userApi.useGetPositionsQuery(1, { skip: skip }) // TODO: remove it, messages must be fetched on websocket event

  const [positions, setPositions] = useState<UserPosition[]>([])

  useEffect(() => {
    console.log('positions ', positions)
  }, [positions])

  const navigate = useNavigate()

  const isLogged = localStorage.getItem('token')

  useEffect(() => {

    if (isLogged) {
      refresh().unwrap().then(userFetced => {
        dispatch(setUser(userFetced.user))
      })
      // setSkip(false)
    } else {
      navigate('/registration')
    }

  }, [])

  // useEffect(() => {
  //   if (isLogged && user.id) {
  //     connect()
  //   }
  // }, [user])

  useEffect(() => {
    const successCallback = (position: GeolocationPosition) => {
      setMyPosition({ user_id: user.id, lat: position.coords.latitude, lng: position.coords.longitude })
    }

    const errorCallback = (error: GeolocationPositionError) => {
      console.log(error)
    }

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
  }, [user])

  // const socket = useRef<WebSocket>()

  // function connect() {

  //   socket.current = new WebSocket(import.meta.env.VITE_SERVER_URL)

  //   socket.current.onopen = () => {
  //     console.log(`${user.username} Connected`)
  //   }

  //   socket.current.onmessage = (event) => {
  //     console.log(JSON.parse(event.data))
  //     // refetch()
  //   }

  //   socket.current.onclose = () => {
  //     console.log(`${user.username} Disconnected`)
  //   }
  //   socket.current.onerror = () => {
  //     console.log('Socket произошла ошибка')
  //   }
  // }

  useEffect(() => {
    const timeoutId = setInterval(() => {
      // socket.current && socket.current.send(JSON.stringify(myPosition))
      if (myPosition) {
        socket.emit('send position', user.id, myPosition.lat.toString(), myPosition.lng.toString())
      }
    }, 5000)

    return () => clearInterval(timeoutId)
  }, [myPosition])

  useEffect(() => {
    const timeoutId = setInterval(() => {
      // console.log('get positions')
      socket.emit('get positions')
      socket.on('receive positions', (positions: UserPosition[]) => {
        console.log('positions ', positions)
        setPositions(positions)
      })
    }, 5000)

    return () => clearInterval(timeoutId)
  }, [])

  // const handleLogout = () => {
  //   logout()
  //   socket.current && socket.current.close()
  //   localStorage.removeItem('token')
  //   navigate('/registration')
  // }

  return (
    myPosition &&
    <div className={cl.container}>
      {/* <InteractionButton icon={userIcon} onClick={() => handleLogout()}>logout</InteractionButton> */}
      <InteractionButtons />
      <SettingsButton />
      <MapContainer center={{ lat: myPosition.lat, lng: myPosition.lng }} zoomControl={false} zoom={13} style={{ height: '100vh' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MarkerClusterGroup>
          {positions && positions.map(pos =>
            <Marker key={pos.user_id} position={{ lat: pos.lat, lng: pos.lng }}>
              <Popup>
                A pretty CSS3 popup. <br /> {pos.username}
              </Popup>
            </Marker>
          )}
        </MarkerClusterGroup>
      </MapContainer>


    </div>
  )
}
