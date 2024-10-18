import cl from './Icon.module.scss'
import pic from '../../../assets/profile.jpg'
export const Icon = () => {
    return (
        <div className={cl.icon}>

            <svg fill="#000000" width="800px" height="800px" viewBox="0 0 15 15" id="marker-stroked" xmlns="http://www.w3.org/2000/svg">
                <path id="Layer_7" d="M 7.5 14.941 L 7.1 14.446 C 6.127 13.257 2.2 7.89 2.2 5.286 C 2.076 2.491 4.241 0.124 7.036 0 C 7.184 -0.007 7.332 -0.007 7.481 0 C 10.276 -0.124 12.643 2.041 12.767 4.836 C 12.774 4.986 12.774 5.136 12.767 5.286 C 12.767 7.499 10.098 11.397 8.089 14.137 L 7.5 14.941 Z M 7.481 0.986 C 5.052 0.849 3.044 2.857 3.181 5.286 C 3.181 7.118 4.983 9.806 7.434 9.888 C 10.433 9.63 11.782 7.331 11.782 5.286 C 11.919 2.857 9.911 0.849 7.482 0.986 L 7.481 0.986 Z" />
            </svg>

            <img src={pic} alt='pic' />

        </div>
    )
}
