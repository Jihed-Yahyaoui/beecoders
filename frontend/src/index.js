import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createTheme, ThemeProvider } from "@mui/material/styles"
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
const theme = createTheme({ typography: { fontFamily: "MontSerrat" } })

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);


