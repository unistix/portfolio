import React from 'react'
import { useGlobalContext} from '../context/context'

const Portfolio = () => {
  const {handlers} = useGlobalContext();
  return (
    <>
    <div className='main-area'{...handlers}><p>Portfolio</p></div>
    </>


  )
}

export default Portfolio