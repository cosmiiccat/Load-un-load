import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './screens/Home';
import Booking from './screens/Booking';
import 'leaflet/dist/leaflet.css';
import LocationPicker from './components/LocationPicker';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/users/book/",
    element: <Booking/>,
  },
  {
    path: "/test/",
    element: <LocationPicker/>,
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
