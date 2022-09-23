import React from 'react'
import {Route, Routes} from "react-router-dom"
import Home from "./pages/index"
import SingleCoctail from "./pages/SingleCoctail"
import './App.css'
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
        <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/cocktail/:id" element={<SingleCoctail/>}/>
      </Routes>
    </div>
  );
}

export default App;
