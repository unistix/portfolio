import React, { useRef,useState, useEffect} from 'react'
import { useSwipeable } from 'react-swipeable';
import { Route, Routes, Link } from "react-router-dom"
import Home  from "../pages/home"
import Contact  from "../pages/contact"
import Portfolio  from "../pages/portfolio"


import { useGlobalContext} from '../context/context'
import { FaBars, FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { BsFillMoonFill, BsFillSunFill} from 'react-icons/bs'

const Nav = () => {
  const {toggleSidebar, handleLeft, handleRight, currentSection, setCurrentSection, getNextSectionName, getSectionId, darkLightToggle, darkMode, handler} = useGlobalContext();
  
  
  //const section = getSectionName(currentSection)
  //Something is wrong with maths for left and right, also add faint loading bar
  //const swipeL = React.useRef(null);
  //const swipeR = React.useRef(null);
 
  useEffect(() => {
   setCurrentSection(getSectionId)
  }, [])
  /*
  //Mobile swipe controll
  let touchstartX = 0
  let touchendX = 0
    
  
  function checkDirection() {
    if (touchendX < touchstartX) {
      console.log("left swipe")
      /*const swipeL = document.getElementById("swipe-left");
      swipeL.click()
      //handleLeft()
    
    }
    if (touchendX > touchstartX) {
      console.log("right swipe")
      /*const swipeR = document.getElementById("swipe-right");
      swipeR.click()*
      //handleRight()
    }
  }

  document.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX
  })

  document.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX
    checkDirection()
  })*/
    
  

  return (
    <div> 
        <nav {...handler} >
        <div className="sidebar-toggle" onClick={toggleSidebar}>
          <FaBars />
        </div>
        <div className="switch-container"></div>
        <label className="switch">
          <input type="checkbox" onChange={darkLightToggle}/>
          <span className="slider round"></span>
          <span className="labels" data-on="Dark" data-off="Light"></span>
        </label>

       
        <Link to={ currentSection-1 < 0 ? getNextSectionName(2):getNextSectionName(currentSection-1)} className={darkMode?'nav-arrow dark' :'nav-arrow '} onClick={handleLeft} id="swipe-left">
       
            <FaAngleLeft className='nav-arrow-left' />
      
        </Link>
        <Link to={currentSection+1 > 2 ? getNextSectionName(0):getNextSectionName(currentSection+1)} className={darkMode?'nav-arrow dark' :'nav-arrow '} onClick={handleRight}  id="swipe-right">
     
          <FaAngleRight className='nav-arrow-right'/>

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