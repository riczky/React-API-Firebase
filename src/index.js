import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/pages/App';
import reportWebVitals from './reportWebVitals';
import firebase from './config/firebase';

console.log(firebase);


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// 1. Membuat Project Web di Firebase
// 2. Integrasi Firebase dengan Atomic Design
// 3. Proses Registrasi Signup Menggunakan Firebase
// 4. Setup Redux Pada Project
// 5. Redux Thunk
// 5. Create Read Update Delete