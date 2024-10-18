import { useAppDispatch, useAppSelector } from "../../../app/store"
import { useClickOutside } from "../../../shared/useOutsideClick"
import { closeProfileWidget } from "../model/profileWidgetSlice"
import cl from './ProfileWidget.module.scss'
import pic from '../../../assets/profile.jpg'
import { userApi } from "../../../entities/UserCard"
import { useNavigate } from "react-router-dom"
import { skipToken } from "@reduxjs/toolkit/query"

export const ProfileWidget = () => {

  // TODO: create a modal with portal
  const { user } = useAppSelector(state => state.userSlice)
  const { isProfileWidgetOpen } = useAppSelector(state => state.profileWidgetSlice)
  const dispatch = useAppDispatch()

  const {data: friends} = userApi.useGetFriendsQuery(user.id ?? skipToken)
  const [logout] = userApi.useLogoutMutation()

  const navigate = useNavigate()

  const handleProfileWidgetClose = () => {
    isProfileWidgetOpen && dispatch(closeProfileWidget())
  }

  const handleLogout = () => {
    logout()
    localStorage.removeItem('token')
    navigate('/registration')
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    console.log('files ', files)
  }

  const ref = useClickOutside(handleProfileWidgetClose)

  return (
    <div className={`${cl.profileWidget} ${isProfileWidgetOpen ? cl.open : ''}`}>
      <div className={cl.profileWidgetContent} ref={ref}>

        <button className={cl.close} onClick={() => dispatch(closeProfileWidget())}>X</button>

        {user &&
          <div className={cl.profileWidgetInfo}>
            <div className={cl.profileWidgetRow}>
              <p>Profile picture</p>
              <img src={pic} alt="profile picture" />
            </div>

            <div className={cl.profileWidgetRow}>
              <p>Username</p>
              <p>{user.username}</p>
            </div>

            <div className={cl.profileWidgetRow}>
              <p>Friends</p>
              <p>{friends?.length} friends</p>
            </div>
          </div>
        }

        <button onClick={handleLogout}>Logout</button>
        <form encType="multipart/form-data">
          <input type="file" onChange={(e) => handleFileSelect(e)} />
        </form>

      </div>
    </div>
  )
}
