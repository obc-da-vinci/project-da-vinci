'use client'

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react'
import Link from 'next/link'
import { FcMenu } from 'react-icons/fc'
import Logotipo from './logotipo'
import { endSession } from '@/actions'

export default function Navbar({ authenticated }: { authenticated?: boolean }) {
  const Item = ({
    label,
    href,
    small,
  }: {
    label: string
    href: string
    small?: boolean
  }) => (
    <li
      className={`transition-colors duration-300 
      ${
        small
          ? 'w-full rounded-lg p-1.5 text-center transition-colors duration-300 hover:bg-blue-500 hover:text-white'
          : 'hover:text-blue-500'
      }`}
    >
      <Link href={href}>{label}</Link>
    </li>
  )

  return (
    <>
      {authenticated ? (
        <>
          {/* Small */}
          <nav className="flex justify-between border-b p-2 md:hidden">
            <Logotipo href="/" />
            {/* <Dropdown>
              <DropdownTrigger>
                <button className="mr-2">
                  <FcMenu size={26} />
                </button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Menu Actions">
                <DropdownItem className="p-0">
                  <Item href="/services" label="Services" small />
                </DropdownItem>
                <DropdownItem className="p-0">
                  <Item href="/availability" label="Availability" small />
                </DropdownItem>
                <DropdownItem className="p-0">
                  <Item href="/appointments" label="Appointments" small />
                </DropdownItem>
                <DropdownItem className="p-0">
                  <button
                    onClick={() => endSession()}
                    className="w-full rounded-lg p-1.5 text-red-600 transition-colors duration-300 hover:bg-red-500 hover:text-white"
                  >
                    Sign out
                  </button>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown> */}
          </nav>

          {/* Medium */}
          <nav className="hidden justify-between border-b p-5 md:flex">
            <Logotipo href="/dashboard" />
            <ul className="flex max-w-[600px] items-center space-x-3 overflow-x-auto font-medium lg:space-x-5">
              <Item href="/services" label="Services" />
              <Item href="/availability" label="Availability" />
              <Item href="/appointments" label="Appointments" />
            </ul>
            <Button
              onClick={() => endSession()}
              className="hover:bg-red-500 hover:text-white"
            >
              Sing out
            </Button>
          </nav>
        </>
      ) : (
        <>
          {/* Small */}
          <nav className="flex justify-between border-b p-2 md:hidden">
            <Logotipo href="/" />
            {/* <Dropdown>
              <DropdownTrigger>
                <button className="mr-2">
                  <FcMenu size={26} />
                </button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Menu Actions">
                <DropdownItem className="p-0">
                  <Item href="/solutions" label="Solutions for You" small />
                </DropdownItem>
                <DropdownItem className="p-0">
                  <Item
                    href="/professionals"
                    label="Find Professionals"
                    small
                  />
                </DropdownItem>
                <DropdownItem className="p-0">
                  <Link href="/sign-in">
                    <li className="w-full rounded-lg bg-blue-500 p-1.5 text-center font-medium text-white transition-colors duration-300">
                      Get started
                    </li>
                  </Link>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown> */}
          </nav>

          {/* Medium */}
          <nav className="hidden justify-between border-b p-5 md:flex">
            <Logotipo href="/" />
            <ul className="flex max-w-[600px] items-center space-x-3 overflow-x-auto font-medium lg:space-x-5">
              <Item href="/solutions" label="Solutions for You" />
              <Item href="/professionals" label="Find Professionals" />
            </ul>
            <Link href="/sign-in">
              <Button color="primary">Get started</Button>
            </Link>
          </nav>
        </>
      )}
    </>
  )
}
