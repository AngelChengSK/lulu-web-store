import React from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './navbar/Navbar'

// import classes from './Layout.module.css'

export default function Layout(props) {
  const location = useLocation()

  return (
    <>
      {location.pathname !== '/checkout' && (
        <Navbar totalItems={props.totalItems} />
      )}
      <main>{props.children}</main>
    </>
  )
}
