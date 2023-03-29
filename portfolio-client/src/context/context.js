import React, { useState, useContext } from 'react'



const AppContext = React.createContext();


const AppProvider = ({children}) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [currentSection, setCurrentSection] = useState(0);
	

	const openSidebar =() => {
		setIsSidebarOpen(true)
		console.log("open side bar clicked")
		//console.log(isSideBarOpen)
	}


	const closeSidebar =() => {
		setIsSidebarOpen(false)
		console.log("open side bar clicked")
	}

	const navLeft = () => {
		console.log("nav left clicked")
		let cSIndex = currentSection //currenrt section index
		cSIndex--
		
		if(cSIndex<0){
			setCurrentSection(2) //better to use a full list rather than hardcode but only 3 so save time 
		}else{
			setCurrentSection(cSIndex)
		}
		//increment index unless last
	}

	const navRight = () => {
		console.log("nav right clicked")
		let cSIndex = currentSection //currenrt section index
		cSIndex++
		
		if(cSIndex>2){
			setCurrentSection(0) //better to use a full list rather than hardcode but only 3 so save time 
		}else{
			setCurrentSection(cSIndex)
		}
		//decrement index unless last
	}

	const toggleSidebar =() => {
		if(isSidebarOpen){
			setIsSidebarOpen(false)

		}else{
			setIsSidebarOpen(true)
		}
		
		console.log("toggle side bar clicked")
	}

	const getSectionName = (section_id) => {
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

	
	return( 
	<AppContext.Provider value={{
        isSidebarOpen, 
        openSidebar, 
        closeSidebar,
		toggleSidebar,
		navLeft,
		navRight,
		getSectionName,
		currentSection}}>{children}</ AppContext.Provider>
	)

}

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };