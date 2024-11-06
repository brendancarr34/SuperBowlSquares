import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import { HashRouter as Router } from 'react-router-dom';
import { Home } from './main/pages/home/Home.js';
import { CreateGroup } from './main/pages/createGroup/CreateGroup.js';
import { JoinGroup } from './main/pages/joinGroup/JoinGroup.js';
import { ViewBoard } from './main/pages/viewBoard/ViewBoard.js';
import { NotFound } from './main/pages/notFound/NotFound.js';
import { EditBoard } from './main/pages/editBoard/EditBoard.js'
import { SetNumbersAndTeams } from './main/pages/setNumbersAndTeams/SetNumbersAndTeams.js';
import { SetNumbers } from './main/pages/setNumbers/SetNumbers.js';
import { CreateGroupPreferences } from './main/pages/createGroupPreferences/CreateGroupPreferences.js';
import { SetTeams } from './main/pages/setTeams/SetTeams.js';
import { GroupMenu } from './main/pages/groupMenu/GroupMenu.js';
import { EditGroupPreferences } from './main/pages/editGroupPreferences/EditGroupPreferences.js';
import RealTimeComponent from './main/pages/RealTimeComponent.js';
import { ViewBoardV2 } from './main/pages/ViewBoardV2.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create-group" element={<CreateGroup />} />
                <Route path="/create-group-preferences" element={<CreateGroupPreferences />} />
                <Route path="/join-group" element={<JoinGroup />} />
                <Route path='/join-group/:groupName' element={<JoinGroup />} />
                <Route path="/super-bowl-squares" element={<ViewBoardV2 />} />
                <Route path='/claim-squares' element={<EditBoard />} />
                <Route path='/set-number-and-teams' element={<SetNumbersAndTeams />} />
                <Route path='/set-numbers' element={<SetNumbers />} />
                <Route path='/set-teams' element={<SetTeams />}/>
                <Route path='/group-menu' element={<GroupMenu />} />
                <Route path='/edit-group-preferences' element={<EditGroupPreferences />} />
                <Route path='/real-time' element={<RealTimeComponent/>} />
                <Route path='view-board-v2' element={<ViewBoardV2/>}/>
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </Router>
    </React.StrictMode>
);