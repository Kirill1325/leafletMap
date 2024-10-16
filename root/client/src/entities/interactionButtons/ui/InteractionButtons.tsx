import cl from './InteractionButtons.module.scss'
import { userIcon,  chatIcon, friendsIcon } from '../../../shared/icons'

export const InteractionButtons = () => {
    return (
        <div className={cl.buttonGroup}>
            <button className={cl.button}>{userIcon}</button>
            {/* <button className={cl.button}>{settingsIcon}</button> */}
            <button className={cl.button}>{chatIcon}</button>
            <button className={cl.button}>{friendsIcon}</button>
        </div>
    )
}