import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store.ts'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { MainPage } from '../pages/main/index.ts'
import './App.scss'
import { RegisterPage } from '../pages/register/index.ts'
import { LoginPage } from '../pages/login/index.ts'
import { io } from 'socket.io-client'

export const socket = io(import.meta.env.VITE_SERVER_URL, {
  extraHeaders: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': import.meta.env.VITE_CLIENT_URL,
  }
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/registration",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
