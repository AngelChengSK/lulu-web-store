import React from 'react'
import Navbar from './navbar/Navbar'

import classes from './Layout.module.css'

export default function Layout(props) {
  return (
    <>
      <Navbar totalItems={props.totalItems} />
      <main>{props.children}</main>
    </>
  )
}
