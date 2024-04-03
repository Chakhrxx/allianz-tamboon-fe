import React from 'react'
import { Link } from 'react-router-dom'

import ProfileIcon from '@/assets/svgs/profile.svg?react'
// import TownHallIcon from '@/assets/svgs/townhall.svg?react'

type MenuItem = {
  label: string
  path: string
  IconComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
}

const menuItems: MenuItem[] = [
  // {
  //   path: '/',
  //   label: 'Scoreboard',
  //   IconComponent: GraphIcon
  // },
  // {
  //   path: '/townhall',
  //   label: 'Town Hall',
  //   IconComponent: TownHallIcon
  // },
  // {
  //   path: '/sports',
  //   label: 'Sport game',
  //   IconComponent: SportIcon
  // },
  // {
  //   path: '/activities',
  //   label: 'Quiz',
  //   IconComponent: ActivityIcon
  // },
  // {
  //   path: '/lucky-draw',
  //   label: 'Super Lotto',
  //   IconComponent: DiceIcon
  // },
  {
    path: '/profile',
    label: 'Profile',
    IconComponent: ProfileIcon
  }
]

function MenuBar() {
  return (
    <nav className="bg-primary px-3 py-2 text-white">
      <ul className="flex justify-center gap-14 items-end h-full">
        {menuItems.map(({ label, path, IconComponent }) => (
          <li key={path}>
            <Link to={path}>
              <IconComponent className="mx-auto" />
              <small>{label}</small>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default MenuBar
