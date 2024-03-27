import {
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@nextui-org/react'
import { FcMenu } from 'react-icons/fc'
import Logotipo from '../logotipo'
import NavbarItem from './navbar-item'
import { GoSignOut } from 'react-icons/go'
import { actions } from '@/actions'

export default function NavbarSmall({
  authenticated,
}: {
  authenticated: boolean
}) {
  return (
    <>
      {authenticated ? (
        <nav className="flex justify-between border-b p-2 md:hidden">
          <Logotipo href="/" />
          <Popover placement="bottom" showArrow offset={10}>
            <PopoverTrigger>
              <button className="mr-2">
                <FcMenu size={26} />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-[240px]">
              <div className="w-full px-1 py-2">
                <NavbarItem href="/services" label="Services" small />
                <NavbarItem href="/availability" label="Availability" small />
                <NavbarItem href="/appointments" label="Appointments" small />
                <button
                  onClick={() => actions.auth.endSession()}
                  className="flex w-full items-center justify-center gap-1.5 rounded-lg p-1.5 font-medium text-red-600 transition-colors duration-300 hover:bg-red-500 hover:text-white"
                  style={{ listStyle: 'none' }}
                >
                  <GoSignOut /> Sign out
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </nav>
      ) : (
        <nav className="flex justify-between border-b p-2 md:hidden">
          <Logotipo href="/" />
          <Popover placement="bottom" offset={10}>
            <PopoverTrigger>
              <button className="mr-2">
                <FcMenu size={26} />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-[240px]">
              <div className="w-full px-1 py-2">
                <NavbarItem href="/solutions" label="Solutions for You" small />
                <NavbarItem
                  href="/professionals"
                  label="Find Professionals"
                  small
                />
                <Link href="/sign-in" className="flex">
                  <li
                    className="flex-1 rounded-lg bg-blue-500 p-1.5 text-center font-medium text-white transition-colors duration-300"
                    style={{ listStyle: 'none' }}
                  >
                    Get started
                  </li>
                </Link>
              </div>
            </PopoverContent>
          </Popover>
        </nav>
      )}
    </>
  )
}
