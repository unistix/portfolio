import React from 'react'
import { useGlobalContext} from '../context/context'
import pdf from "../utils/cv.pdf"
import { Route, Routes, Link } from "react-router-dom"

const Home = () => {
  const {handlers, darkMode} = useGlobalContext();
  return (
    <>
    <div className='main-area'{...handlers}>
      <p>Home</p>
      <div className='home-section'> <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        <p>Full Stack Web3 Developer</p>
          {darkMode? 
     
            <>
              <Link to="/contact"><button className='btn-nice dark'>
                Get In Touch
              </button></Link>
          
              <a href={pdf} target="_blank"><button className='btn-nice dark'>
                Download CV
              </button></a> 
            </>:
            <>
          <Link to="/contact"><button className='btn-nice'>
            Get In Touch
          </button></Link>
        
        <a href={pdf} target="_blank"><button className='btn-nice'>
          Download CV
        </button></a>
           </>}
        
        </div>
    
    </div>
    </>


  )
}

export default Home