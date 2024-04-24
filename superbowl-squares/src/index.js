import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HashRouter as Router } from 'react-router-dom';
import { Home } from './main/v2/page/Home.js'
import { Grid } from './main/v1/Grid.js';
import { ViewBoard } from './main/v2/page/ViewBoard.js';
import { CreateGroup } from './main/v2/page/CreateGroup.js';
import { JoinGroup } from './main/v2/page/JoinGroup.js';
import { NotFound } from './main/v2/page/NotFound.js';
import { EditBoard } from './main/v2/page/EditBoard.js';
import { SetNumbersAndTeams } from './main/v2/page/SetNumbersAndTeams.js';
import { SetNumbers } from './main/v2/page/SetNumbers.js';
import { CreateGroupPreferences } from './main/v2/page/CreateGroupPreferences.js';
import { VerticalTextComponent } from './main/v2/components/VerticalTextComponent.js';
import { SetTeams } from './main/v2/page/SetTeams.js';
import VenmoPaymentLink from './main/v2/components/VenmoPaymentLink.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Router >
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/super-bowl-squares" element={<ViewBoard />} />
                <Route path="/create-group" element={<CreateGroup />} />
                <Route path="/create-group-preferences" element={<CreateGroupPreferences />} />
                <Route path="/join-group" element={<JoinGroup groupNameProp=""/>} />
                <Route path='/claim-squares' element={<EditBoard />} />
                <Route path="/*" element={<NotFound />} />
                <Route path='/set-number-and-teams' element={<SetNumbersAndTeams />} />
                <Route path='/set-numbers' element={<SetNumbers />} />
                <Route path='/set-teams' element={<SetTeams />}/>
                <Route path='/test-venmo' element={<VenmoPaymentLink recipient="Brendan-Carr-9" amount="10.00"/>}/>
                <Route path='/join-group/:groupName' element={<JoinGroup groupNameProp="test" />} />
            </Routes>
        </Router>
    </React.StrictMode>
);