// CreateGroupPreferences.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import AutoSetNumbers from '../components/AutoSetNumbers';
import axios from 'axios';
import { api_url} from '../../../config';
import AddPassword from '../components/AddPassword';
import AutoSetTeams from '../components/AutoSetTeams';
import AddVenmoInfo from '../components/AddVenmoInfo';
import Modal from 'react-bootstrap/Modal';
import { empty_row, emptyNameRow, emptySideNumbers, emptyTopNumbers, } from "../data/EmptyBoardData";

function generateUUID() {
    var d = new Date().getTime();
    var d2 = (performance && performance.now && (performance.now()*1000)) || 0;
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;
        if(d > 0){
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r&0x7|0x8)).toString(16);
    });
    return uuid;
};

export function CreateGroupPreferences() {

    function generateUUID() {
        console.log('test2');
        var d = new Date().getTime();
        var d2 = (performance && performance.now && (performance.now()*1000)) || 0;
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16;
            if(d > 0){
                r = (d + r)%16 | 0;
                d = Math.floor(d/16);
            } else {
                r = (d2 + r)%16 | 0;
                d2 = Math.floor(d2/16);
            }
            return (c === 'x' ? r : (r&0x7|0x8)).toString(16);
        });
        return uuid;
    };

    const location = useLocation();
    let groupName = location.state.groupName;

    const navigate = useNavigate();

    const [autoSetNumbers, setAutoSetNumbers] = useState(false);
    const [addGroupPassword, setAddGroupPassword] = useState(false);
    const [autoSetTeams, setAutoSetTeams] = useState(false);
    const [groupPassword, setGroupPassword] = useState("");
    const [team1, setTeam1] = useState("");
    const [team2, setTeam2] = useState("");
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [error, setError] = useState(null);

    const [addVenmoInfo, setAddVenmoInfo] = useState(false);
    const [venmoUsername, setVenmoUserName] = useState("");

    // Function to handle AutoSetNumbers checkbox change
    const handleAutoSetNumberChange = (newValue) => {
        setAutoSetNumbers(newValue);
    };

    // Function to handle AutoSetTeams checkbox change
    const handleAutoSetTeamsChange = (newValue) => {
        setAutoSetTeams(newValue);
    }

    const handleSetTeam1 = (newValue) => {
        setTeam1(newValue);
    }

    const handleSetTeam2 = (newValue) => {
        setTeam2(newValue);
    }

    // Function to handle add password checkbox change
    const handleAddPasswordToggleChange = (newValue) => {
        setAddGroupPassword(newValue);
    }

    const handleSetGroupPassword = (newValue) => {
        setGroupPassword(newValue);
    }

    // Function to handle add Venmo info
    const handleAddVenmoInfoToggleChange = (newValue) => {
        setAddVenmoInfo(newValue);
    }

    const handleSetVenmoUsername = (newValue) => {
        setVenmoUserName(newValue);
    }

    const handleButtonClick2 = async () => {

        // if groupName is empty, create a group name
        if (groupName === "") {
            groupName = generateUUID().substring(0,6);
        }

        console.log('groupName: ' + groupName);

        try {
            const url = api_url + 'api/group/add/' + groupName;
            await axios.post(url, {
                name: groupName,
                password: groupPassword,
                gameData: {
                    row0: empty_row,
                    row0_players: emptyNameRow,
                    row1: empty_row,
                    row1_players: emptyNameRow,
                    row2: empty_row,
                    row2_players: emptyNameRow,
                    row3: empty_row,
                    row3_players: emptyNameRow,
                    row4: empty_row,
                    row4_players: emptyNameRow,
                    row5: empty_row,
                    row5_players: emptyNameRow,
                    row6: empty_row,
                    row6_players: emptyNameRow,
                    row7: empty_row,
                    row7_players: emptyNameRow,
                    row8: empty_row,
                    row8_players: emptyNameRow,
                    row9: empty_row,
                    row9_players: emptyNameRow
                },
                players: [],
                allSquaresClaimed: false,
                numbersSet: false,
                teamsSet: false,
                topNumbers: emptyTopNumbers,
                sideNumbers: emptySideNumbers,
                teams: {
                    top: '',
                    side: ''
                },
                preferences: {
                    groupPassword: groupPassword,
                    autoSetNumbers: autoSetNumbers,
                    autoSetTeams: autoSetTeams,
                    team1: team1,
                    team2: team2,
                    venmoUsername: venmoUsername
                },
                colorData: []
            });

            navigate('/super-bowl-squares', { state: { groupName: groupName } });
        } catch (error) {
            console.error('Error creating group:', error);
            if (error.response != null) {
                setError(error.response.data.error);
                setShowErrorModal(true);
            } else if (error.code == 'ERR_NETWORK') {
                setError('Network Error');
                setShowErrorModal(true);
            } else {
                setError('Unknown Error');
                setShowErrorModal(true);
            }
        }
    }

    return (
        <Container>
            <Row style={fullHeight()}>
                <Row style = {height15()}>
                    <Col style={center()}>
                        <h1>Set Group Preferences</h1>
                        <p>groupName: {groupName}</p>
                    </Col>
                </Row>
                <Row style = {height70()}>
                    <Row>
                        <Col style={center()}>
                            <AutoSetNumbers 
                                autoSetNumbers={autoSetNumbers} 
                                handleToggleChange={handleAutoSetNumberChange} />
                        </Col>
                    </Row>
                    <Row>
                        <Col style={center()}>
                            <AutoSetTeams 
                                autoSetTeams={autoSetTeams} 
                                handleAutoSetTeamsChange={handleAutoSetTeamsChange} 
                                handleSetTeam1={handleSetTeam1} 
                                handleSetTeam2={handleSetTeam2}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={center()}>
                            <AddPassword 
                                addGroupPassword={addGroupPassword} 
                                handleAddPasswordToggleChange={handleAddPasswordToggleChange} 
                                handleSetGroupPassword={handleSetGroupPassword}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={center()}>
                            <AddVenmoInfo
                                addVenmoInfo={addVenmoInfo} 
                                handleAddVenmoInfoToggleChange={handleAddVenmoInfoToggleChange} 
                                handleSetVenmoUsername={handleSetVenmoUsername}/>
                        </Col>
                    </Row>
                    {/* <Row>
                        <Col style={center()}>
                            {/* <AddVenmoInfo
                                addVenmoInfo={addVenmoInfo} 
                                handleAddVenmoInfoToggleChange={handleAddVenmoInfoToggleChange} 
                                handleSetVenmoUsername={handleSetVenmoUsername}/>
                        </Col>
                    </Row> */}
                </Row>
                <Row style = {height15()}>
                    <Col style={center()}>
                        <Button 
                            style={blackButton()} 
                            onClick={handleButtonClick2}>
                                Start a New Group
                        </Button>
                    </Col>
                </Row>
            </Row>

            {/* Error Modal for API Failure */}
            <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>{error}</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )

    function fullHeight() {
        return {
            height: '90vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
    }

    function height15() {
        return {
            height: '18vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
    }

    function height70() {
        return {
            height: '54vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
    }

    function center() {
        return {
            textAlign: 'center',
            margin: 0,
            padding: 0
        }
    }

    function blackButton() {
        return {
            backgroundColor: "black",
            border: 'black',
            width: '75vw',
            padding: 20
        }
    }


}
