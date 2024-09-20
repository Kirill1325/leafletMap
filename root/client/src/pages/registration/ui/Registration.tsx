import { useEffect, useState } from "react"
import { userApi } from "../../../entities/UserCard"
import { useNavigate } from "react-router-dom"

export const Registration = () => {

  const [registration, result] = userApi.useRegistrationMutation()

  const [username, setUername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleRegistration = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    registration({ username: username, email: email, password: password })
    setUername('')
    setPassword('')
    setEmail('')
    localStorage.setItem('isLogged', 'true')
    navigate('/')
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
