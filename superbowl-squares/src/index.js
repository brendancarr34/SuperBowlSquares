import React from 'react';
import ReactDOM from 'react-dom/client';
import { Home } from './components/v2/Home.js'
import { Grid } from './components/v1/Grid.js';
import { FlexGrid } from './components/v2/FlexGrid.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/super-bowl-squares" element={<FlexGrid />} />
                <Route path="v1" element={<Grid />} />
                <Route path="v2" element={<FlexGrid />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);