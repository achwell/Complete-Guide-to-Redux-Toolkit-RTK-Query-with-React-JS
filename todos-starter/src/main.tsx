import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {ApiProvider} from "@reduxjs/toolkit/query/react"
import {apiSlice} from "./feature/api/apiSlice"

import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <ApiProvider api={apiSlice}>
          <App />
      </ApiProvider>
  </React.StrictMode>
)
