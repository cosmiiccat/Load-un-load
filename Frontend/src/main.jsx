import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './screens/Home';
import Booking from './screens/Booking';
import Login from './components/Login';
import Register from './components/Register';
import Track from './screens/Track';
import Dashboard from './screens/Dashboard'

import 'leaflet/dist/leaflet.css';

import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";

import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/home/" />
  },
  {
    path: "/home/",
    element: <Home/>,
  },
  {
    path: "/users/booking/",
    element: <Booking/>,
  },
  {
    path: "/users/track/",
    element: <Track/>,
  },
  {
    path: "/login/",
    element: <Login/>,
  },
  {
    path: "/register/",
    element: <Register/>,
  },
  {
    path: "/admin/dashboard/",
    element: <Dashboard/>
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
