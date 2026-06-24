import React from 'react'
import { useRoutes, Link } from 'react-router-dom'
import Locations from "./pages/Locations.jsx"
import LocationEvents from "./pages/LocationEvents.jsx"
import './App.css'

const App = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <Locations />
    },
    {
      path: '/locations/:id',
      element: <LocationEvents />
    }
  ])

  return (
    <div className='app'>
      <header className='main-header'>
        <h1>Stitch & Gather</h1>
        <div className='header-buttons'>
          <Link to='/' role='button'>Home</Link>
        </div>
      </header>
      <main>
        {element}
      </main>
    </div>
  )
}

export default App