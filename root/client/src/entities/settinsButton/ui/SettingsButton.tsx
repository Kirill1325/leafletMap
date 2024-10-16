import cl from './SettingsButton.module.scss'
import { settingsIcon } from '../../../shared/icons'

export const SettingsButton = () => {
    return (
        <button className={cl.button}>{settingsIcon}</button>
    )
}
