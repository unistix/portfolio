import React from 'react'
import { Route, Routes, Link } from "react-router-dom"
import Home  from "../pages/home"
import Contact  from "../pages/contact"
import Portfolio  from "../pages/portfolio"

import { useGlobalContext} from '../context/context'
import { FaBars, FaAngleLeft, FaAngleRight } from 'react-icons/fa'

const Nav = () => {
  const {toggleSidebar, navLeft, navRight, currentSection, getSectionName} = useGlobalContext();

  //const section = getSectionName(currentSection)

  return (
    <div> 
        <nav>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          <FaBars />
        </button>

        <Link to={getSectionName(0)}>
          <button className="nav-left" onClick={navLeft}>
            <FaAngleLeft />
          </button>
        </Link>
        <Link to={getSectionName(1)}>
        <button className="nav-right" onClick={navRight}>
          <FaAngleRight />
        </button>
        </Link>
        {/*
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/portfolio">Portfolio</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to={`/component/${post.id}`}/></li>
        </ul>
        * */}
        </nav>
  </div>
  )
}

export default Nav