import { useState } from 'react'
import { NavBar } from './components/Navbar';

// import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Mos } from './pages/Mos';



function App() {

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/mos' element={<Mos />} />
      </Routes>
    </Router>
  )
}

export default App
