import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const today = new Date();
today.setHours(0,0,0,0);
if (localStorage.getItem('LaVille_isWin') && localStorage.getItem('LaVille_lastConn') < today) {
  localStorage.setItem('LaVille_lastConn', new Date().valueOf())
  localStorage.setItem('LaVille_isWin', false);
  localStorage.setItem('LaVille_guessToday', null);
}

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

/**
 * TODO: 
 * ajout des boutons tout en haut
 * debugger l'autocomplete
 * la carte avec les points (aucune idée de comment faire)
 * 
 */