//  import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import { AuthProvider } from './context/AuthContext.jsx';

// BOOTSWATCH DARKLY

import 'bootswatch/dist/lux/bootstrap.min.css'

import './index.css'


import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthProvider>
      <CartProvider>
          <App />
      </CartProvider>
  </AuthProvider>
  </BrowserRouter>
)
