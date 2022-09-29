import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { persistStore } from "redux-persist"
import store from "./redux/store"
import App from './App'
import "mdb-react-ui-kit/dist/css/mdb.min.css"
import 'font-awesome/css/font-awesome.min.css';
import './index.css'

const persistor = persistStore(store)


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <Provider store={store}>
          <PersistGate persistor={persistor}>
          <App />
          </PersistGate>
      </Provider>
  </React.StrictMode>
)
