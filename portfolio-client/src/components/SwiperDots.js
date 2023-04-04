import React, { useEffect } from 'react'
import { useGlobalContext} from '../context/context'
import { BsCircleFill, BsCircle} from 'react-icons/bs'

const SwiperDots = () => {
  const {currentSection} = useGlobalContext();
  const swiperDotsHelperArr = Array.from(Array(3).keys())

  useEffect(() => {
    //account and chain change handler 
    //console.log(currentSection)
    //does this need to be here ?
 




   
    //matic 5
    //mumbai 80081
 }, [currentSection]);
  return (
    <div className='swiper-dot-container'>

        {swiperDotsHelperArr.map(section=> 
          {
            if(section===currentSection){
              return(


                <BsCircleFill key={section}/>
              )


            }else{
              return(
              <BsCircle key={section}/>
              )
            }
            }
          
        )}
        
       
    </div>
  )
}

export default SwiperDots