//  import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";

// BOOTSWATCH DARKLY

import 'bootswatch/dist/lux/bootstrap.min.css'

import './index.css'


import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <CartProvider>
          <App />
      </CartProvider>
  </BrowserRouter>
)
