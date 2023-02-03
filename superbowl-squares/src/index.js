import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Grid } from './Grid.js';
import reportWebVitals from './reportWebVitals';
import { FlexGrid } from './FlexGrid.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
  
// V1
// root.render(
//   <React.StrictMode>
//     <h1>Super Bowl Squares</h1>
//     <Grid />
//   </React.StrictMode>
// );

// V2
root.render(
    <React.StrictMode>
        <FlexGrid />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
