import cl from './InteractionButtons.module.scss'
import { userIcon,  chatIcon, friendsIcon } from '../../../shared/icons'
import { useAppDispatch } from '../../../app/store'
import { openProfileWidget } from '../../../widgets/profileWidget/model/profileWidgetSlice'
import { openFriendsWidget } from '../../../widgets/friendsWidget/model/friendsWidgetSlice'

export const InteractionButtons = () => {

    const dispatch = useAppDispatch()

    return (
        <div className={cl.buttonGroup}>
            <button className={cl.button} onClick={() => dispatch(openProfileWidget())}>{userIcon}</button>
            <button className={cl.button}>{chatIcon}</button>
            <button className={cl.button} onClick={() => dispatch(openFriendsWidget())}>{friendsIcon}</button>
        </div>
    )
}