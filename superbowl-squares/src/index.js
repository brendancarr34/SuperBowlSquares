import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route } from "react-router-dom";
import { HashRouter as Router } from 'react-router-dom';

import { AddBetaPassword } from './main/pages/addBetaPassword/AddBetaPassword.js';
import { CreateGroup } from './main/pages/createGroup/CreateGroup.js';
import { CreateGroupPreferences } from './main/pages/createGroupPreferences/CreateGroupPreferences.js';
import { EditBoard } from './main/pages/editBoard/EditBoard.js'
import { EditGroupPreferences } from './main/pages/editGroupPreferences/EditGroupPreferences.js';
import { EditPaymentBreakdown } from './main/pages/editPaymentBreakdown/EditPaymentBreakdown.js';
import { GroupMenu } from './main/pages/groupMenu/GroupMenu.js';
import { Home } from './main/pages/home/Home.js';
import { JoinGroup } from './main/pages/joinGroup/JoinGroup.js';
import { Ledger } from './main/pages/ledger/Ledger.js';
import { NotFound } from './main/pages/notFound/NotFound.js';
import { SetNumbers } from './main/pages/setNumbers/SetNumbers.js';
import { SetTeams } from './main/pages/setTeams/SetTeams.js';
import { ViewBoard } from './main/pages/viewBoard/ViewBoard.js';

import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path='/add-beta-password' element={<AddBetaPassword/>} />
                <Route path='/claim-squares' element={<EditBoard/>} />
                <Route path="/create-group" element={<CreateGroup/>} />
                <Route path="/create-group-preferences" element={<CreateGroupPreferences/>} />
                <Route path='/edit-group-preferences' element={<EditGroupPreferences/>} />
                <Route path='/edit-payment-breakdown' element={<EditPaymentBreakdown/>} />
                <Route path='/group-menu' element={<GroupMenu/>} />
                <Route path="/join-group" element={<JoinGroup/>} />
                <Route path='/join-group/:groupName' element={<JoinGroup/>} />
                <Route path='/ledger' element={<Ledger/>} />
                <Route path='/set-numbers' element={<SetNumbers/>} />
                <Route path='/set-teams' element={<SetTeams/>} />
                <Route path="/super-bowl-squares" element={<ViewBoard/>} />
                <Route path="/super-bowl-squares/:groupName" element={<ViewBoard/>} />
                <Route path="/*" element={<NotFound/>} />
            </Routes>
        </Router>
    </React.StrictMode>
);