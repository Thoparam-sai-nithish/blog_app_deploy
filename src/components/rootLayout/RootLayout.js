import React from 'react'
import './RootLayout.css'
import { Outlet } from 'react-router-dom'
import NavigationBar from '../navigationBar/NavigationBar'
// import Footer from '../footer/Footer'

function RootLayout() {
  return (
    <div className='RootLayout'>
      <div className="rootNav"><NavigationBar/></div>
      <div className="rootOut"><Outlet/></div>
    </div>
  )
}

export default RootLayout