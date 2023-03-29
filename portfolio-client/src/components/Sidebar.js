import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { Route, Routes, Link } from "react-router-dom"
import { useGlobalContext} from '../context/context'

const Sidebar = () => {
  const {isSidebarOpen, closeSidebar} = useGlobalContext()
  //console.log(isSidebarOpen)
  return (
    //<aside className='sidebar show-sidebar' >
    <aside className={`${isSidebarOpen ? 'sidebar show-sidebar' : 'sidebar'}`}>

        <div className="sidebar-header">
         {/*
          <button className="close-btn" onClick={closeSidebar}>
            <FaTimes />
          </button>* */}
        </div>
        <ul className="links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/portfolio">Portfolio</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            
        </ul>
        {/*
        <ul className="social-icons">
            {social.map((link)=>{
                const {id, url, icon} = link
                return (
                  <li key={id}>
                    <a href={url}>
                        {icon}

                    </a>
                  </li>
                )


            })}

        </ul>*/}
    </aside>

  )
}

export default Sidebar
