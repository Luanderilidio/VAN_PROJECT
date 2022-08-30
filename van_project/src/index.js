import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createGlobalStyle } from 'styled-components';
import App from './App';
import '@fontsource/roboto/500.css';
import '@fontsource/poppins/';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', 'Poppins';
    background-color: "#E5E5E5",
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
