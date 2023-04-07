import React, { useState, useContext, useEffect } from 'react'

import abi from '../utils/BuyMeATea.json';
import { ethers } from "ethers";
import { useSwipeable } from 'react-swipeable';




const AppContext = React.createContext();



const AppProvider = ({children}) => {
	const delay = ms => new Promise(res => setTimeout(res, ms)); 
	

	/*Metamask and buy me a tea contract */
	const contractAddress = "0x2d6b4449124f3f269d62101A3C31E5ed6C60f7D0";
	//
	//npx hardhat verify --network mainnet 0x2d6b4449124f3f269d62101A3C31E5ed6C60f7D0
  	const contractABI = abi.abi;

  	const [currentAccount, setCurrentAccount] = useState("");
  	const [balance, setBalance] = useState(0);
	const [currentChainId, setcurrentChainId] = useState(null);
	const [networkError, setNetworkError] = useState(""); //make sure to cange from test net to main net 
	const [networkSuccess, setNetworkSuccess] = useState("");
	const [networkLoading, setNetworkLoading] = useState("");
	const [name, setName] = useState("");
  	const [message, setMessage] = useState("");
	const [memos, setMemos] = useState([]);
	const [darkMode, setDarkMode] = useState(true);

	const sectionArray = ["/","/portfolio","/contact"] //use this instead of get section name and hard indexing long term
	

	const getSectionId = () => {

		let section_name = window.location.href.replace("http://localhost:3000","")
		
		let section_id = sectionArray.indexOf(section_name)
		return section_id

	}


	  async function requestAccount() {
		console.log('Requesting account...');
		if(window.ethereum) {
		  console.log('detected');
		  
		  try {
			const accounts = await window.ethereum.request({
			  method: "eth_requestAccounts",
			});
			console.log(accounts)
			//setWalletAddress(accounts[0]);
			setCurrentAccount(accounts[0]);

			const chainID = window.ethereum.networkVersion
			//console.log(chainID)
			setcurrentChainId(chainID)
			
	
			const balance = await window.ethereum.request({
			  method: 'eth_getBalance', 
			  params: [accounts[0], 'latest']
			});
		
			setBalance(ethers.utils.formatEther(balance));
			
		  } catch (error) {
			console.log('Error connecting...');
			setNetworkError('Error connecting...')
		  }
	
		} else {
		  alert('Meta Mask not detected');
		}
	  }
	
	  async function connectWallet() {
		if(typeof window.ethereum !== 'undefined') {
		  await requestAccount();
	
		  const provider = new ethers.providers.Web3Provider(window.ethereum);
		}
		else{
		  console.log('Meta Mask not detected');
		  setNetworkError('Meta Mask not detected')
		}
	  } 

	


	  //Check network and only enable buy button if the network is also correct otherwise ask them to change network 

	  const checkChainID = () =>{
			return window.ethereum.networkVersion
			
	  }

	  const networkErrorHelper = async () =>{
		await delay(5000);
        setNetworkError("")
		setNetworkSuccess("")
		//setNetworkLoading("")
		
  	  }
	  
	
	useEffect(() => {
        //account and chain change handler 
        //console.log(`network error has been changed ${networkError}`)
        let buyMeATea;
        networkErrorHelper()
		//if memos is not empty
		//if signed in get memos otherwise wait till signed in
		if(currentAccount){
			getMemos();
		}
		

    // Create an event handler function for when someone sends
    // us a new memo.

    // Create an event handler function for when someone sends
    // us a new memo.
    	const onNewMemo = (from, timestamp, name, message) => {
      	console.log("Memo received: ", from, timestamp, name, message);
      	setMemos((prevState) => [
        ...prevState,
        {
          address: from,
          timestamp: new Date(timestamp * 1000),
          message,
          name
        }
      ]);
    };

    const {ethereum} = window;

    // Listen for new memo events.
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum, "any");
      const signer = provider.getSigner();
      buyMeATea = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      buyMeATea.on("NewMemo", onNewMemo);
    }

    return () => {
      if (buyMeATea) {
        buyMeATea.off("NewMemo", onNewMemo);
      }
    }


       
        //matic 5
        //mumbai 80081
     }, [networkError,networkSuccess]);

	const buyTea = async (tea) => {
		let _value = "0.1"

		let teaPriceMap = {  peppermint: "0.1",
						ginger: "0.5",
						chamomile: "1"
		
		
		}

		//map for price and tea 
		try {
		  const { ethereum } = window;
		  
		  if(typeof window.ethereum !== 'undefined') {
		  //await requestAccount();
	
		  const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const buyMeATea= new ethers.Contract(
			  contractAddress,
			  contractABI,
			  signer
			);
	
			console.log("buying tea..")
			setNetworkLoading("buying tea..");
			//Create a state variable and show these steps on page
			const teaTxn = await buyMeATea.buyTea(
			  name ? name : "anon",
			  message ? message : "Enjoy your tea!",
			  {value: ethers.utils.parseEther(teaPriceMap[tea])}
			);
	
			await teaTxn.wait();
	
			console.log("mined ", teaTxn.hash);
	
			console.log("coffee purchased!");
			setNetworkSuccess("tea purchased!");
			setNetworkLoading("")
		
	
			// Clear the form fields.
			setName("");
			setMessage("");
		  }
		} catch (error) {
		  console.log(error);
		  setNetworkError(error.data.message.substring(4,23))
		}
	
	
	}

	  const getMemos = async () => {
		try {
		  const { ethereum } = window;
		  if(typeof window.ethereum !== 'undefined') {
		  //await requestAccount();
			if( currentChainId==1371){ //remember to switch for mainnet
	
		  const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const buyMeACoffee = new ethers.Contract(
			  contractAddress,
			  contractABI,
			  signer
			);
			
			console.log("fetching memos from the blockchain..");
			const memos = await buyMeACoffee.getMemos();
			console.log("fetched!");
			setMemos(memos);
			}else	{
				console.log("Can't fetch memos from incorect chain");
				setNetworkError("Swap to polygon testnet to buy tea")
			}
		  } else {
			console.log("Metamask is not connected");
			
		  }
		  
		} catch (error) {
		  console.log(error);
		}
	  };



	/*Sidebar and Navigation */
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [currentSection, setCurrentSection] = useState(getSectionId());
	


	const openSidebar =() => {
		setIsSidebarOpen(true)
		console.log("open side bar clicked")
		//console.log(isSideBarOpen)
	}


	const closeSidebar =() => {
		setIsSidebarOpen(false)
		console.log("open side bar clicked")
	}

	
	const handlers = useSwipeable({
		onSwipedLeft: () => {document.getElementById("swipe-left").click();
		},
		onSwipedRight: () =>  {document.getElementById("swipe-right").click();},
		swipeDuration: 500,
		preventScrollOnSwipe: true,
		trackMouse: true
	  });

	
	  function handleLeft(){
		console.log('handleLeft clicked')
		/*
		console.log(getNextSectionName(currentSection))
		console.log(getNextSectionName(currentSection-1))
		console.log(currentSection)*/
	
		if(currentSection-1<0){
		  setCurrentSection(2)
		}else{
		  setCurrentSection(currentSection-1)
		}
		
		//setCurrentSection(getSectionId())
		//etCurrentSection(currentSection-1)
		//return 
	
	  }
	
	  function handleRight(){
		console.log('handleright clicked')
		/*
		console.log(getNextSectionName(currentSection))
		//
		console.log(getNextSectionName(currentSection+1))
		console.log(currentSection)*/
		setCurrentSection(currentSection+1)
		if(currentSection+1>2){
		  setCurrentSection(0)
		}else{
		  setCurrentSection(currentSection+1)
		}
		//setCurrentSection(getSectionId())
	  }

	const toggleSidebar =() => {
		if(isSidebarOpen){
			setIsSidebarOpen(false)

		}else{
			setIsSidebarOpen(true)
		}
		
		console.log("toggle side bar clicked")

		console.log(currentSection)
	}

	const _getSectionName = (section_id) => {
		let section;
		switch (section_id) {
			case 0:
			  section = "/";
			  break;
			case 1:
			  section = "/portfolio";
			  break;
			case 2:
				section = "/contact";
		}
			
		return section 


	}

	const getNextSectionName = (current_section_id) => {
		let sectionName = sectionArray[current_section_id]
		
		return sectionName 


	}

	const darkLightToggle = () =>{
		const _main = document.querySelector('main');
		const _body = document.querySelector('body');
		//const _toggle_button = document.querySelector('.slider.round:before');
		
		if(_main.classList.contains('dark') && _body.classList.contains('dark') && darkMode===true){
			_main.classList.remove('dark')
			_body.classList.remove('dark')
			//_toggle_button.classList.remove('dark')
			setDarkMode(false)
			
		}else{
			_main.classList.add('dark')
			_body.classList.add('dark')
			//_toggle_button.classList.add('dark')
			setDarkMode(true)
		
		}
		/*
		if(_buttons!==[]){
			/*if(_button.classList.contains('dark')){
		
				_button.classList.remove('dark')
			}else{
	
				_button.classList.add('dark')
			}*
			console.log(_buttons)
			_buttons.forEach(_button => {
				if(_button.classList.contains('dark')){
		
					_button.classList.remove('dark')
				}else{
		
					_button.classList.add('dark')
				}


			})*/

		

		
	


		
		console.log("dark light toggle called")

	}

	

	//0 http://localhost:3000/portfolio for removing
	

	
	return( 
	<AppContext.Provider value={{
        isSidebarOpen, 
        openSidebar, 
        closeSidebar,
		toggleSidebar,
		handleLeft,
		handleRight,
		getNextSectionName,
		currentSection,
		setCurrentSection,
		connectWallet,
		currentAccount,
		checkChainID,
		currentChainId,
		getSectionId,
		requestAccount,
		networkError,
		setNetworkError,
		networkErrorHelper,
		networkSuccess,
		networkLoading,
		setName,
		name,
		setMessage,
		message,
		buyTea,
		memos,
		handlers,
		darkLightToggle,
		darkMode}}>{children}</ AppContext.Provider>
	)

}

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };