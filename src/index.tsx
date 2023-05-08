import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './components/login/Login';
import { BrowserRouter } from "react-router-dom";
// import {run} from './server.js'
//
//
// run().catch(console.dir);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <Login/>
      </BrowserRouter>
  </React.StrictMode>
);