import React from 'react'
import { FaTimes } from 'react-icons/fa'
import site_copy from '../utils/copy';
import { Route, Routes, Link } from "react-router-dom"
import { useGlobalContext} from '../context/context'
import { AiFillLinkedin, AiFillGithub,AiOutlineMail } from 'react-icons/ai';

const Sidebar = () => {
  const {isSidebarOpen, closeSidebar, darkMode} = useGlobalContext()
  //console.log(isSidebarOpen)
  return (
    //<aside className='sidebar show-sidebar' >
    <aside className={darkMode?`${isSidebarOpen ? 'sidebar show-sidebar dark' : 'sidebar dark'}` :`${isSidebarOpen ? 'sidebar show-sidebar' : 'sidebar'}`}>

        <div className="sidebar-header">
         {/*
          <button className="close-btn" onClick={closeSidebar}>
            <FaTimes />
          </button>* */}
        </div>
        <ul className={darkMode?'links dark' :'links'}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/portfolio">Portfolio</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <div className={darkMode?'sidebar-icons socials dark' :'sidebar-icons socials'}>
            <a href={site_copy.social_links.linkedIn} target="_blank">
              <AiFillLinkedin/>
            </a>
            <a href={site_copy.social_links.github} target="_blank">
              <AiFillGithub/>
            </a>
            <a href={site_copy.social_links.email_mailto} target="_blank">
              <AiOutlineMail/>
            </a>
        </div>
            
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
