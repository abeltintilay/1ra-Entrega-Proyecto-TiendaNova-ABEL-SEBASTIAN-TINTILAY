//  import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";

import './index.css'

// BOOTSWATCH DARKLY
//import 'bootswatch/dist/darkly/bootstrap.min.css'
import 'bootswatch/dist/lux/bootstrap.min.css'
//import 'bootswatch/dist/slate/bootstrap.min.css'
//import 'bootswatch/dist/minty/bootstrap.min.css'
//import 'bootswatch/dist/vapor/bootstrap.min.css'
//import 'bootswatch/dist/flatly/bootstrap.min.css'


import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
