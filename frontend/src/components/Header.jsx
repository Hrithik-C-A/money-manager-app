import React from 'react'
import logo from '../assets/logo.png'

const Header = () => {
  return (
    <nav className='flex justify-between items-center px-4 bg-[#303030] text-white'>
        <a href="/">
            <img src={logo} className='p-2' width={'70px'} alt="logo" />
        </a>
        <ul className='flex gap-6 text-xl font-semibold'>
            <li><a href="#">Login</a></li>
            <li><a href="#">Register</a></li>
        </ul>
    </nav>
  )
}

export default Header