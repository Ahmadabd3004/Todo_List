import React from 'react'
import css from './Navbar.module.css'
function NavBar() {
  return (
    <div className={css.nav} data-cy="header-background">
        <h1 data-cy="header-title">TO DO LIST APP</h1>
    </div>
  )
}

export default NavBar