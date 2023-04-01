import React from 'react'
import { useGlobalContext} from '../context/context'
import { useSwipeable } from 'react-swipeable';

const SwipeHandleWrapper = () => {
    const handlers = useSwipeable({
		onSwipedLeft: () => console.log("left swipe"),
		onSwipedRight: () => console.log("right swipe"),
		swipeDuration: 500,
		preventScrollOnSwipe: true,
		trackMouse: true
	  });

 

  return (
    
    <div {...handlers}><p>swipe handle wrapperr</p></div>
  )
}

export default SwipeHandleWrapper