import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import { HashRouter as Router } from 'react-router-dom';
// import { Home } from './main/v2/page/Home.js'
import { Home } from './main/pages/home/Home.js';
// import { ViewBoard } from './main/v2/page/ViewBoard.js';
import { ViewBoard } from './main/pages/viewBoard/ViewBoard.js';
// import { CreateGroup } from './main/v2/page/CreateGroup.js';
import { CreateGroup } from './main/pages/createGroup/CreateGroup.js';
// import { JoinGroup } from './main/v2/page/JoinGroup.js';
import { JoinGroup } from './main/pages/joinGroup/JoinGroup.js';
// import { NotFound } from './main/v2/page/NotFound.js';
import { NotFound } from './main/pages/notFound/NotFound.js';
// import { EditBoard } from './main/v2/page/EditBoard.js';
import { EditBoard } from './main/pages/editBoard/EditBoard.js'
// import { SetNumbersAndTeams } from './main/v2/page/SetNumbersAndTeams.js';
import { SetNumbersAndTeams } from './main/pages/setNumbersAndTeams/SetNumbersAndTeams.js';
// import { SetNumbers } from './main/v2/page/SetNumbers.js';
import { SetNumbers } from './main/pages/setNumbers/SetNumbers.js';
// import { CreateGroupPreferences } from './main/v2/page/CreateGroupPreferences.js';
import { CreateGroupPreferences } from './main/pages/createGroupPreferences/CreateGroupPreferences.js';
// import { SetTeams } from './main/v2/page/SetTeams.js';
import { SetTeams } from './main/pages/setTeams/SetTeams.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Router >
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/super-bowl-squares" element={<ViewBoard />} />
                <Route path="/create-group" element={<CreateGroup />} />
                <Route path="/create-group-preferences" element={<CreateGroupPreferences />} />
                <Route path="/join-group" element={<JoinGroup />} />
                <Route path='/claim-squares' element={<EditBoard />} />
                <Route path="/*" element={<NotFound />} />
                <Route path='/set-number-and-teams' element={<SetNumbersAndTeams />} />
                <Route path='/set-numbers' element={<SetNumbers />} />
                <Route path='/set-teams' element={<SetTeams />}/>
                <Route path='/join-group/:groupName' element={<JoinGroup />} />
            </Routes>
        </Router>
    </React.StrictMode>
);