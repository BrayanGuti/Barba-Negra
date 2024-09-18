import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HomePage } from './HomePage/HomePage.jsx'
import { ServicesMainFather } from './ServicesPage/ServicesMainFather.jsx'
import { Barbers } from './BarbersPage/BarbersMain.jsx'
import { SendPage } from './SendPage/SendPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage/>,
    errorElement: <div>404</div>
  },
  {
    path: '/Services',
    element: <ServicesMainFather/>
  },
  {
    path: '/Services/Barbers',
    element: <Barbers/>
  },
  {
    path: '/Services/Barbers/Send',
    element: <SendPage/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
