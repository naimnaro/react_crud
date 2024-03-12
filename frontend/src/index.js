import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactModal from 'react-modal';

const root = createRoot(document.getElementById('root'));

ReactModal.setAppElement(root);


root.render(
   
  
    <App />

);
