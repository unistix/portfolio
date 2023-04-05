import React from 'react'
import { useGlobalContext} from '../context/context'
import pdf from "../utils/cv.pdf"
import { Route, Routes, Link } from "react-router-dom"
import site_copy from '../utils/copy';

const Home = () => {
  console.log(site_copy.headline)
  const {handlers, darkMode} = useGlobalContext();
  return (
    <>
    <div className={darkMode?'main-area dark' :'main-area'}{...handlers}>
      <p><br/></p>
      <div className='home-section'> 
        {site_copy && <p>{site_copy.home.headline}</p>}
        {site_copy && <p>{site_copy.home.copy_text}</p>}
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