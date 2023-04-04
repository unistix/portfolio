import React, {useState, useEffect} from 'react'
import { useGlobalContext} from '../context/context'

const SignCard = () => {
    const {connectWallet, currentAccount, darkMode} = useGlobalContext()

    
	

  return (

    
    <div className='sign-in-card-container'>
        
        {/* When wallet connects make sure that button is no longer clickable and text is replace with wallet address */}
        {/* Check to make sure network is polygon and ask them to resign if not */}
        
        {currentAccount ? (
          darkMode ?
          <button id="button-connected" className='btn-nice dark'> {`${currentAccount.substring(0,6)}... Connected`} </button>
          :
          <button id="button-connected" className='btn-nice'> {`${currentAccount.substring(0,6)}... Connected`} </button>
         
        ) : (
          darkMode ?
          <button id="button-not-connected" className='btn-nice dark' onClick={connectWallet}> Connect your wallet to buy tea </button>
          :
          <button id="button-not-connected" className='btn-nice' onClick={connectWallet}> Connect your wallet to buy tea </button>
        )}


    </div>
  )
}

export default SignCard