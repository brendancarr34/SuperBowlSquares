// CreateGroupPreferences.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import AutoSetNumbers from './components/AutoSetNumbers';
import axios from 'axios';
import { api_url} from '../../../config';
import AddPassword from './components/AddPassword';
import AutoSetTeams from './components/AutoSetTeams';
import AddVenmoInfo from './components/AddVenmoInfo';
import Modal from 'react-bootstrap/Modal';
import { empty_row, emptyNameRow, emptySideNumbers, emptyTopNumbers, } from "../../common/data/EmptyBoardData";
import { fullHeight } from '../../common/style/CommonStyles';
import AddAdminPassword from './components/AddAdminPassword';

export function CreateGroupPreferences() {

    const location = useLocation();
    let groupName = location.state.groupName;

    const navigate = useNavigate();

    const [autoSetNumbers, setAutoSetNumbers] = useState(false);
    const [addGroupPassword, setAddGroupPassword] = useState(true);
    const [addAdminPassword, setAddAdminPassword] = useState(true);
    const [autoSetTeams, setAutoSetTeams] = useState(false);
    const [groupPassword, setGroupPassword] = useState("");
    const [adminPassword, setAdminPassword] = useState("");
    const [team1, setTeam1] = useState("");
    const [team2, setTeam2] = useState("");
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [error, setError] = useState(null);
    const [addVenmoInfo, setAddVenmoInfo] = useState(true);
    const [venmoUsername, setVenmoUserName] = useState("");
    const [paymentAmount, setPaymentAmount] = useState(0);

    // Function to handle AutoSetNumbers checkbox change
    const handleAutoSetNumberChange = (newValue) => {
        setAutoSetNumbers(newValue);
    };

    // Add teams functions
    const handleAutoSetTeamsChange = (newValue) => {
        setAutoSetTeams(newValue);
    }
    const handleSetTeam1 = (newValue) => {
        setTeam1(newValue);
    }
    const handleSetTeam2 = (newValue) => {
        setTeam2(newValue);
    }

    // Add password function
    const handleAddPasswordToggleChange = (newValue) => {
        setAddGroupPassword(newValue);
    }
    const handleSetGroupPassword = (newValue) => {
        setGroupPassword(newValue);
    }

    // Add admin password function
    const handleAddAdminPasswordToggleChange = (newValue) => {
        setAddAdminPassword(newValue);
    }
    const handleSetAdminPassword = (newValue) => {
        setAdminPassword(newValue);
    }

    // Add Venmo info function
    const handleAddVenmoInfoToggleChange = (newValue) => {
        setAddVenmoInfo(newValue);
    }
    const handleSetVenmoUsername = (newValue) => {
        setVenmoUserName(newValue);
    }
    const handleSetVenmoPaymentInfo = (newValue) => {
        setPaymentAmount(newValue);
    }

    const handleButtonClick2 = async () => {
        try {
            if (addGroupPassword && !groupPassword) {
                setError('Did you mean to add a group password? If not, deselect this option.');
                setShowErrorModal(true);
                return; // Exit the function early
            }

            if (addAdminPassword && !adminPassword) {
                setError('Did you mean to add an admin password? If not, deselect this option.');
                setShowErrorModal(true);
                return; // Exit the function early
            }

            // Check if addVenmoInfo is true and either venmoUsername or paymentAmount is empty
            if (addVenmoInfo && (!venmoUsername || !paymentAmount)) {
                setError('Did you mean to add Venmo info?');
                setShowErrorModal(true);
                return; // Exit the function early
            }
    
            const url = api_url + 'api/group/add/' + groupName;
            await axios.post(url, {
                name: groupName,
                password: groupPassword,
                adminPassword: adminPassword,
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
                    venmoUsername: venmoUsername,
                    paymentAmount: paymentAmount
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
                <Row style = {heightTop()}/>
                <Row style = {height15_top()}>
                    <Col style={center()}>
                        <h1>Create Settings</h1>
                        <p><b>Group</b>: {groupName}</p>
                    </Col>
                </Row>
                <Row style = {height70()}>
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
                            <AddAdminPassword
                                addAdminPassword={addAdminPassword}
                                handleAddAdminPasswordToggleChange={handleAddAdminPasswordToggleChange}
                                handleSetAdminPassword={handleSetAdminPassword}/>
                        </Col>
                    </Row>
                    {/* <Row>
                        <Col style={center()}>
                            <p>TODO - "add payment breakdown?"</p>
                        </Col>
                    </Row>
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
                    </Row> */}

                    <Row>
                        <Col style={center()}>
                            <AddVenmoInfo
                                addVenmoInfo={addVenmoInfo} 
                                handleAddVenmoInfoToggleChange={handleAddVenmoInfoToggleChange} 
                                handleSetVenmoUsername={handleSetVenmoUsername}
                                handleSetVenmoPaymentInfo={handleSetVenmoPaymentInfo}/>
                        </Col>
                    </Row>
                </Row>
                <Row style = {height15_bottom()}>
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

    function height15_bottom() {
        return {
            height: '16vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
    }

    function height15_top() {
        return {
            height: '10vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }
    }

    function heightTop() {
        return {
            height: '6vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
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
