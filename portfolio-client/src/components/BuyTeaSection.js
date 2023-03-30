import React, {useState, useEffect} from 'react'
import SignCard  from "./SignCard"
import { useGlobalContext} from '../context/context'

const BuyTeaSection = () => {
    const {currentAccount, checkChainID, currentChainID, networkError} = useGlobalContext()

    const chainChangedHandler = () => {
        checkChainID()
		//make sure no errors when chain or account changed

		// reload the page to avoid any errors with chain change mid use of application
		console.log(`change handler called`)
	}

	const accountChangedHandler = (newAccount) => {
		console.log(`account changed handler called `)
		//whenever an account is changed we want to show the new account but also show updated balance
		/*setDefaultAccount(newAccount)
		getUserBalance(newAccount.toString())
		getCurrentChainId(newAccount)*/

		//when we change accounts no idea something is different.

	}
	// listen for account changes
	//new account into account change handler and re-render
    if(window.ethereum){
        window.ethereum.on('accountsChanged', accountChangedHandler);
    
        window.ethereum.on('chainChanged', chainChangedHandler);
    }

    useEffect(() => {
        //account and chain change handler 

        
        


       
        //matic 5
        //mumbai 80081
     }, []);
    
    
  return (
    <div>
        <h3>BuyTeaSection</h3>

    
        <SignCard/>
        {currentAccount ? (
          /*If connected to polygon*/<p>You can buy Tea</p>
          /*If not <p>You need to switch to polygon network buy tea</p>*/

        ) : (
            <p>You need to connect metamask to buy tea</p>
        )}
    </div>
  )
}

export default BuyTeaSection