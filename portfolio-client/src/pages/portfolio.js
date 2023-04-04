import React from 'react'
import { useGlobalContext} from '../context/context'
import projects from '../utils/data';

const Portfolio = () => {
  const {handlers, darkMode} = useGlobalContext();
  console.log(projects)
  
  return (
    <>
    <div className='main-area'{...handlers}>
      <p>Portfolio</p>
      <div className='portfolio-item-container'>
      {projects.map((item,id)=>{

        const {title,category,img, src_link, demo_link, description} = item;

        return (<div key={id} className="portfolio-item">

          <p className="portfolio-title">{title}</p>
          <p className="portfolio-category">{category}</p>
          <p className="portfolio-description">{description}</p>
          <img src={img} className="portfolio-image"/>

          <div className="btn-container">
          {darkMode? 
            <>
            <button className='btn-nice dark'><a href={src_link} target="_blank"> Source </a> </button>
            <button className='btn-nice dark'><a href={demo_link} target="_blank"> Demo </a> </button>
            </>:
            <>
            <button className='btn-nice'><a href={src_link} target="_blank"> Source </a> </button>
            <button className='btn-nice'><a href={demo_link} target="_blank"> Demo </a> </button>
            </>
          }

          </div>

      </div>)})}
      
      </div>
    </div>
    </>


  )
}

export default Portfolio