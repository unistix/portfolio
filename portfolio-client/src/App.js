
import './styles/App.css';
import { Route, Routes } from "react-router-dom"
import Home  from "./pages/home"
import Contact  from "./pages/contact"
import Portfolio  from "./pages/portfolio"
import Nav  from "./components/Nav"
import Sidebar  from "./components/Sidebar"
import Footer  from "./components/Footer"
import SwiperDots  from "./components/SwiperDots"
import { FaIcicles } from 'react-icons/fa';
import './styles/dark-light.css';

import SwipeHandleWrapper  from "./components/SwipeHandleWrapper"


// Import Swiper styles
//swiper which takes you to specific paths but once you reach the last one it loops back to the first 


function App() {
  //const _main = document.querySelector('main');
	const _body = document.querySelector('body');
  //_main.classList.add('dark')
	_body.classList.add('dark')


  return (
    <div className="App">
      
      <main className='dark'>
     
      <Sidebar />
      <Nav/>
      {/*<h1><FaIcicles/></h1>*/}
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/contact" element={<Contact />} />
      </Routes>
      <SwiperDots/>
     

      </main>
      <Footer/>
      
    </div>
    
  );
}

export default App;
