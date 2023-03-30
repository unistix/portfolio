import React, { useState, useContext, useEffect } from 'react'
import abi from '../utils/BuyMeATea.json';
import { ethers } from "ethers";



const AppContext = React.createContext();



const AppProvider = ({children}) => {
	/*Metamask and buy me a tea contract */
	const contractAddress = "0xEd957ba375dc66A1f8ABAba947985922105ae0Af";
  	const contractABI = abi.abi;

  	const [currentAccount, setCurrentAccount] = useState("");
  	const [balance, setBalance] = useState(0);
	const [currentChainId, setcurrentChainId] = useState(null);
	const [networkError, setnetworkError] = useState(""); //make sure to cange from test net to main net 

	const sectionArray = ["/","/portfolio","/contact"] //use this instead of get section name and hard indexing long term

	const getSectionId = () => {

		let section_name = window.location.href.replace("http://localhost:3000","")
		console.log(section_name)
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
			setcurrentChainId(window.ethereum.networkVersion)
	
			const balance = await window.ethereum.request({
			  method: 'eth_getBalance', 
			  params: [accounts[0], 'latest']
			});
			console.log(ethers.utils.formatEther(balance))
			setBalance(ethers.utils.formatEther(balance));
			
		  } catch (error) {
			console.log('Error connecting...');
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
		}
	  } 

	


	  //Check network and only enable buy button if the network is also correct otherwise ask them to change network 

	  const checkChainID = () =>{
			console.log(window.ethereum.networkVersion)
			
	  }
	
	/*

	const buyCoffee = async () => {
		try {
		  const { ethereum } = window;
		  
		  if(typeof window.ethereum !== 'undefined') {
		  //await requestAccount();
	
		  const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const buyMeACoffee = new ethers.Contract(
			  contractAddress,
			  contractABI,
			  signer
			);
	
			console.log("buying coffee..")
			const coffeeTxn = await buyMeACoffee.buyCoffee(
			  name ? name : "anon",
			  message ? message : "Enjoy your coffee!",
			  {value: ethers.utils.parseEther("0.001")}
			);
	
			await coffeeTxn.wait();
	
			console.log("mined ", coffeeTxn.hash);
	
			console.log("coffee purchased!");
	
			// Clear the form fields.
			setName("");
			setMessage("");
		  }
		} catch (error) {
		  console.log(error);
		}
	
	
	  }*/



	/*Sidebar and Navigation */
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [currentSection, setCurrentSection] = useState(getSectionId());
	
	/*
	useEffect(() => {
		setCurrentSection(getSectionId())
	}, [currentSection])
	*/

	const openSidebar =() => {
		setIsSidebarOpen(true)
		console.log("open side bar clicked")
		//console.log(isSideBarOpen)
	}


	const closeSidebar =() => {
		setIsSidebarOpen(false)
		console.log("open side bar clicked")
	}

	console.log('shown current' + currentSection)

	const navLeft = () => {
		console.log("nav left clicked")
		
		//let cSIndex = currentSection //currenrt section index
		//console.log(currentSection)
		let cSIndex = getSectionId()
		
		cSIndex--
		
		if(cSIndex<0){
			setCurrentSection(sectionArray.length-1) //better to use a full list rather than hardcode but only 3 so save time 
			//incase wierd thing happen this clears out the indexing
		}else{
			
			setCurrentSection(cSIndex)
			
		}
		
		//increment index unless last
		/*console.log(window.location.href)
		console.log(cSIndex)
		console.log(currentSection)*/
	}

	const navRight = () => {
		console.log("nav right clicked")
		//let cSIndex = currentSection //currenrt section index
		
		let cSIndex = getSectionId()
		cSIndex++

		
		
		
		if(cSIndex>sectionArray.length-1){
			setCurrentSection(0) //better to use a full list rather than hardcode but only 3 so save time 
			
		}
		else{
			setCurrentSection(cSIndex)

		
		}
		/*
		//decrement index unless last
		console.log(window.location.href)
		console.log(cSIndex)
		console.log(currentSection)
		*/
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

	

	//0 http://localhost:3000/portfolio for removing
	

	
	return( 
	<AppContext.Provider value={{
        isSidebarOpen, 
        openSidebar, 
        closeSidebar,
		toggleSidebar,
		navLeft,
		navRight,
		getNextSectionName,
		currentSection,
		setCurrentSection,
		connectWallet,
		currentAccount,
		checkChainID,
		currentChainId,
		getSectionId}}>{children}</ AppContext.Provider>
	)

}

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };