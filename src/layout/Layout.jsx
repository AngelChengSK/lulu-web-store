import React from 'react'
import Navbar from './navbar/Navbar'

export default function Layout(props) {
  return (
    <>
      <Navbar totalItems={props.totalItems}/>
      <main>{props.children}</main>
    </>
  )
}
