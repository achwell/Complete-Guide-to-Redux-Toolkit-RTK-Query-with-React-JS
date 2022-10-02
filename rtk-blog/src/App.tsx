import React from 'react'
import {ToastContainer} from "react-toastify"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import AddEditBlog from "./pages/AddEditBlog"
import Detail from "./pages/Detail"
import "react-toastify/dist/ReactToastify.css"
import './App.css'

function App() {

    return (
        <BrowserRouter>
            <div className="App">
                <Navbar/>
                <ToastContainer position="top-center"/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/create" element={<AddEditBlog/>}/>
                    <Route path="/update/:id" element={<AddEditBlog/>}/>
                    <Route path="/detail/:id" element={<Detail/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
