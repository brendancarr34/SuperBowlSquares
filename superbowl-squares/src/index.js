import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './main/v2/page/Home.js'
import { Grid } from './main/v1/Grid.js';
import { ViewBoard2 } from './main/v2/page/ViewBoard2.js';
import { CreateGroup } from './main/v2/page/CreateGroup.js';
import { JoinGroup } from './main/v2/page/JoinGroup.js';
import { NotFound } from './main/v2/page/NotFound.js';
import { EditBoard5 } from './main/v2/page/EditBoard5.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/super-bowl-squares" element={<ViewBoard2 />} />
                <Route path="/v1" element={<Grid />} />
                <Route path="/create-group" element={<CreateGroup />} />
                <Route path="/join-group" element={<JoinGroup />} />
                <Route path='/claim-squares' element={<EditBoard5 />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);