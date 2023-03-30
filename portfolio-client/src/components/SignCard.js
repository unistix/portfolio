import React, {useState, useEffect} from 'react'
import { useGlobalContext} from '../context/context'

const SignCard = () => {
    const {connectWallet, currentAccount} = useGlobalContext()

    
	

  return (

    
    <div className='sign-in-card-container'>
        
        {/* When wallet connects make sure that button is no longer clickable and text is replace with wallet address */}
        {/* Check to make sure network is polygon and ask them to resign if not */}

        {currentAccount ? (
          <button id="button-connected"> {`${currentAccount.substring(0,6)}... Connected`} </button>
         
        ) : (
          <button id="button-not-connected" onClick={connectWallet}> Connect your wallet </button>
        )}


    </div>
  )
}

export default SignCard