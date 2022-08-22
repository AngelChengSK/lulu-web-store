import React from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout(props) {
  const location = useLocation()

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      {location.pathname !== '/checkout' && (
        <Navbar totalItems={props.totalItems} />
      )}
      <main style={{ flex: 1 }}>{props.children}</main>
      <Footer />
    </div>
  )
}
