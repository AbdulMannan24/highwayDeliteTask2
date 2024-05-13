import { useState } from 'react'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import SignUp from './pages/SignUp';
import Verify from './pages/Verify';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import View from './pages/View';
import Edit from './pages/Edit';
import Add from './pages/Add';
import './App.css'

function App() {
  
  return (
    <Router>
      <Routes> 
        <Route path="/" element = { <SignUp/> } ></Route>
        <Route path="/SignIn" element = { <SignIn/> }></Route>
        <Route path="/home" element = { <Home/> } ></Route>
        <Route path="/view/:title" element = { <View/> } ></Route>
        <Route path="/add" element = { <Add/> } ></Route>
        <Route path="/edit/:id" element = { <Edit/> } ></Route>
        <Route path="/verify/:email" element = { <Verify/> }></Route>
      </Routes>
    </Router>
  )
}

export default App
