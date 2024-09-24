import { useEffect, useState } from "react"
import { userApi } from "../../../entities/UserCard"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../../app/store"
import { setUser } from "../../../entities/UserCard/model/userSlice"

export const Registration = () => {

  const dispatch = useAppDispatch()

  const [registration] = userApi.useRegistrationMutation()

  const [username, setUername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      registration({ username: username, email: email, password: password })
        .unwrap()
        .then(fulfilled => {
          console.log(fulfilled)
          localStorage.setItem('token', JSON.stringify(fulfilled.accessToken))
          dispatch(setUser(fulfilled.user))
          navigate('/')
        })
        .catch(rejected => console.error(rejected))

      setUername('')
      setPassword('')
      setEmail('')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      <h1>Registration</h1>
      <form onSubmit={(e) => handleRegistration(e)}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUername(e.target.value)}
        />
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

        <button type="submit">Registration</button>

      </form>

    </div>
  )
}
