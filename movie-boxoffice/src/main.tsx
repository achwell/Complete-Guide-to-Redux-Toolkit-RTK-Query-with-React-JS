import React from "react"
import {createRoot} from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import {ReactQueryProvider} from "./Provider"
import {PersistGate} from "redux-persist/integration/react"
import {persistStore} from "redux-persist"
import App from "./App"
import 'bootstrap/dist/css/bootstrap.min.css'
import "./index.css"

const container = document.getElementById("root")!
const root = createRoot(container)
const persistor = persistStore(store)

root.render(
  <React.StrictMode>
    <Provider store={store}>
        <ReactQueryProvider>
            <PersistGate persistor={persistor}>
                <App />
            </PersistGate>
        </ReactQueryProvider>
    </Provider>
  </React.StrictMode>
)
