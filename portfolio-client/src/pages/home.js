import React from 'react'
import { useGlobalContext} from '../context/context'

const Home = () => {
  const {handlers} = useGlobalContext();
  return (
    <>
    <div className='main-area'{...handlers}><p>Home</p></div>
    </>


  )
}

export default Home