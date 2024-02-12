import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import Login from "./Login.jsx"
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './Register.jsx'
import Home from "./Home.jsx"
const router = createBrowserRouter([
  {
    path:"/",
    element: <Login />
  },
  {
    path:"/register",
    element: <Register />
  },
  {
    path:"/home",
    element: <Home />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
)
