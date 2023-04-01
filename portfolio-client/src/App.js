
import './styles/App.css';
import { Route, Routes } from "react-router-dom"
import Home  from "./pages/home"
import Contact  from "./pages/contact"
import Portfolio  from "./pages/portfolio"
import Nav  from "./components/Nav"
import Sidebar  from "./components/Sidebar"
import SwiperDots  from "./components/SwiperDots"

import SwipeHandleWrapper  from "./components/SwipeHandleWrapper"


// Import Swiper styles
//swiper which takes you to specific paths but once you reach the last one it loops back to the first 


function App() {
  return (
    <div className="App">
      
      <main>
     
      <Sidebar />
      <Nav/>
      <h1>Portfolio Site</h1>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/contact" element={<Contact />} />
      </Routes>
      <SwiperDots/>

      </main>
      
    </div>
    
  );
}

export default App;
