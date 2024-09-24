import React, { useState } from 'react'
import { userApi } from '../../../entities/UserCard'
import { useAppDispatch } from '../../../app/store'
import { setUser } from '../../../entities/UserCard/model/userSlice'

export const LoginForm = () => {

    const dispatch = useAppDispatch()

    const [registration] = userApi.useLoginMutation()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        registration({ email: email, password: password })
            .unwrap()
            .then(fulfilled => {
                localStorage.setItem('token', JSON.stringify(fulfilled.accessToken))
                dispatch(setUser(fulfilled.user))
            })
            .catch(rejected => console.error(rejected))

        setPassword('')
        setEmail('')
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={(e) => handleRegistration(e)}>

                <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">login</button>

            </form>

        </div>
    )
}

