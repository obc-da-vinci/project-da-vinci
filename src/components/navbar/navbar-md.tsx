import { actions } from '@/actions'
import { Button, Link } from '@nextui-org/react'
import Logotipo from '../logotipo'
import NavbarItem from './navbar-item'

export default function NavbarMedium({
  authenticated,
}: {
  authenticated: boolean
}) {
  return (
    <>
      {authenticated ? (
        <nav className="hidden justify-between border-b p-5 md:flex">
          <Logotipo href="/dashboard" />
          <ul className="flex max-w-[600px] items-center space-x-3 overflow-x-auto font-medium lg:space-x-5">
            <NavbarItem href="/services" label="Services" />
            <NavbarItem href="/availability" label="Availability" />
            <NavbarItem href="/appointments" label="Appointments" />
          </ul>
          <Button
            onClick={() => actions.auth.endSession()}
            className="hover:bg-red-500 hover:text-white"
          >
            Sing out
          </Button>
        </nav>
      ) : (
        <nav className="hidden justify-between border-b p-5 md:flex">
          <Logotipo href="/" />
          <ul className="flex max-w-[600px] items-center space-x-3 overflow-x-auto font-medium lg:space-x-5">
            <NavbarItem href="/solutions" label="Solutions for You" />
            <NavbarItem href="/professionals" label="Find Professionals" />
          </ul>
          <Link href="/sign-in">
            <Button color="primary">Get started</Button>
          </Link>
        </nav>
      )}
    </>
  )
}
