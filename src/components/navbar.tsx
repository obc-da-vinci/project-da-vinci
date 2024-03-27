'use client'

import NavbarSmall from './navbar/navbar-sm'
import NavbarMedium from './navbar/navbar-md'

export default function Navbar({ authenticated }: { authenticated: boolean }) {
  return (
    <>
      <NavbarSmall authenticated={authenticated} />
      <NavbarMedium authenticated={authenticated} />
    </>
  )
}
