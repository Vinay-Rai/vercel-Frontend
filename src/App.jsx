
import "prismjs/themes/prism-tomorrow.css"
import "highlight.js/styles/github-dark.css";
import './App.css'
import Home from "./components/Home"
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HistoryPage from './components/HistoryPage'

function App() {

  return (
    <>
    
      <Navbar />
      <div className="container">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/show-history' element={<HistoryPage />} />
        </Routes>

      </div>
    </>
  )
}




export default App
