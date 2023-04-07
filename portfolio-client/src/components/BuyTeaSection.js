import React, {useState, useEffect} from 'react'
import SignCard  from "./SignCard"
import { useGlobalContext} from '../context/context'
import '../styles/buyTea.css';
import site_copy from '../utils/copy';

const BuyTeaSection = () => {
    const {currentAccount, checkChainID, currentChainId, networkError, setNetworkError, networkErrorHelper, networkSuccess,  requestAccount, buyTea, memos, networkLoading, darkMode} = useGlobalContext()
    
    const delay = ms => new Promise(res => setTimeout(res, ms)); 

    //Use the data from the form to set the values for buy tea 
    //Quick instructions so that people don't end up as anon with no message by filling contact us form 

    useEffect(() => {
        
     }, [networkSuccess, networkLoading]);
    

    const chainChangedHandler = async () => {
        
        requestAccount()
        console.log(checkChainID()) //this is shows the new chain 
		//make sure no errors when chain or account changed
        setNetworkError("network has been changed")

		// reload the page to avoid any errors with chain change mid use of application
		console.log(`change handler called`)
        //await delay(5000);
        //setNetworkError("")

	}

	const accountChangedHandler = async () => {
		console.log(`account changed handler called `)
        requestAccount()
		//call request account and set all the variables again
        setNetworkError("account has been changed")

		// reload the page to avoid any errors with chain change mid use of application
		console.log(`change handler called`)
        //await delay(5000);
        //setNetworkError("")

	}
	// listen for account changes
	//new account into account change handler and re-render
    if(window.ethereum){
        window.ethereum.on('accountsChanged', accountChangedHandler);
    
        window.ethereum.on('chainChanged', chainChangedHandler);
    }

   
    
    
    
    
    
  return (
    <div className="">
        <p> {site_copy && site_copy.contact.tea_section.intro}</p>

    
        <SignCard/>
        {currentAccount ? (
          /*<p>You can buy Tea</p> */
          /*If not <p>You need to switch to polygon network buy tea</p>*/
          parseInt(currentChainId) === 137 ? (
            <>
            <p>You can buy Tea</p>
            <p>If you would like to leave a message with your tea, fill out the name and message sections of the contact us form. Leave blank for anonymous tea.</p>
           
            
            <button className={darkMode?'btn-nice dark' :'btn-nice'} id="button-not-connected" onClick={() => buyTea("peppermint")}> Buy Peppermint Tea </button>
            <button className={darkMode?'btn-nice dark' :'btn-nice'} id="button-not-connected" onClick={() => buyTea("ginger")}> Buy Ginger Tea </button>
            <button className={darkMode?'btn-nice dark' :'btn-nice'} id="button-not-connected" onClick={() => buyTea("chamomile")}> Buy Chamomile Tea </button>
            {currentAccount && (<h1>Memos received</h1>)}
            
            <p className="warning" ></p>
            <p className="success" >{networkSuccess}</p>
            <p className="warning" >{networkLoading}</p>

         {currentAccount && (memos.slice(-3).reverse().map((memo, idx) => {
            {/*Scroll Box for memos instead of showing first 3 */}
            return (
                    <div key={idx} style={{border:"2px solid", "borderRadius":"5px", padding: "2px", margin: "5px"}}>
                        <p style={{"fontWeight":"bold"}}>"{memo.message}"</p>
                        <p>From: {memo.name} at {memo.timestamp.toString()}</p> {/*convert epoch to Data time */}
                    </div>
                    )
            }))}
            
            </>
          
          
          
          
          ) 
          : setNetworkError("you need to switch to the polygon testnet")

        ) : (
            <p>Connect <a href='https://metamask.io/download/' target='_blank' className={darkMode?'dark' :''}>metamask</a> to buy tea</p>
        )}
        <p className="error" >{networkError}</p>
        <>
        
        </>
    </div>
  )
}

export default BuyTeaSection