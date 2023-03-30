import React, {useState, useEffect} from 'react'
import { Route, Routes, Link } from "react-router-dom"
import Home  from "../pages/home"
import Contact  from "../pages/contact"
import Portfolio  from "../pages/portfolio"

import { useGlobalContext} from '../context/context'
import { FaBars, FaAngleLeft, FaAngleRight } from 'react-icons/fa'

const Nav = () => {
  const {toggleSidebar, navLeft, navRight, currentSection, setCurrentSection, getNextSectionName, getSectionId} = useGlobalContext();

  //const section = getSectionName(currentSection)
  //Something is wrong with maths for left and right, also add faint loading bar
  function handleLeft(){
    console.log('handleLeft clicked')
    console.log(getNextSectionName(currentSection))
    console.log(getNextSectionName(currentSection-1))
    console.log(currentSection)
    setCurrentSection(currentSection-1)
    //setCurrentSection(getSectionId())
    //etCurrentSection(currentSection-1)
    //return 

  }

  function handleRight(){
    console.log('handleright clicked')
    console.log(getNextSectionName(currentSection))
    //
    console.log(getNextSectionName(currentSection+1))
    console.log(currentSection)
    setCurrentSection(currentSection+1)
    //setCurrentSection(getSectionId())
  }
  useEffect(() => {
   setCurrentSection(getSectionId)
  }, [])
  

  
  

  return (
    <div> 
        <nav>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          <FaBars />
        </button>

        <Link to={ currentSection-1 < 0 ? getNextSectionName(2):getNextSectionName(currentSection-1)} className="nav-arrow"  onClick={handleLeft}>
       
            <FaAngleLeft />
      
        </Link>
        <Link to={currentSection+1 > 2 ? getNextSectionName(0):getNextSectionName(currentSection+1)} className="nav-arrow" onClick={handleRight}>
     
          <FaAngleRight />

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