import { useEffect, useState } from "react"
import { userApi } from "../../../entities/UserCard/api/userService";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { setUser } from "../../../entities/UserCard/model/userSlice";
import { useNavigate } from "react-router-dom";
import { UserPosition } from "../../../entities/UserCard/model/types";
import cl from './MainPage.module.scss'
import { InteractionButtons } from "../../../entities/interactionButtons";
import { socket } from "../../../app/main";
import { Map } from "../../../widgets/map";
import { ProfileWidget } from "../../../widgets/profileWidget";
import { FriendsWidget } from "../../../widgets/friendsWidget";

export const MainPage = () => {

  // TODO: add my position separately from others

  const dispatch = useAppDispatch()
  const { user } = useAppSelector(state => state.userSlice)

  useEffect(() => {
    console.log(user)
  }, [user])

  const [refresh] = userApi.useRefreshMutation()

  const [myPosition, setMyPosition] = useState<UserPosition>()

  const [positions, setPositions] = useState<UserPosition[]>([])

  // useEffect(() => {
  //   console.log('positions ', positions)
  // }, [positions])

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
    const successCallback = (position: GeolocationPosition) => {
      setMyPosition({ user_id: user.id, lat: position.coords.latitude, lng: position.coords.longitude })
    }

    const errorCallback = (error: GeolocationPositionError) => {
      console.log(error)
    }

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
  }, [user])

  useEffect(() => {
    // myPosition && socket.emit('send position', user.id, myPosition.lat.toString(), myPosition.lng.toString())
    const timeoutId = setInterval(() => {
      if (myPosition) {
        socket.emit('send position', user.id, myPosition.lat.toString(), myPosition.lng.toString())
      }
    }, 5000)

    return () => clearInterval(timeoutId)
  }, [myPosition])

  useEffect(() => {
    const timeoutId = setInterval(() => {
      socket.emit('get positions')
      socket.on('receive positions', (positions: UserPosition[]) => {
        // console.log('positions ', positions)
        setPositions(positions)
      })
    }, 5000)

    return () => clearInterval(timeoutId)
  }, [])

  return (
    myPosition &&
    <div className={cl.container}>
      <InteractionButtons />
      {/* <SettingsButton /> */}
      <ProfileWidget/>
      <FriendsWidget/>
      <Map myPosition={myPosition} />
    </div >
  )
}
