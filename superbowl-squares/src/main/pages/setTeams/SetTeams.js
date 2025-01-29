import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import { host , api_url} from '../../../config';

export function SetTeams() {
    const location = useLocation();
    let navigate = useNavigate();
    let groupName =  location.state.groupName;

    // State to hold team names
    const [teamNames, setTeamNames] = useState({
        topTeam: '',
        leftTeam: ''
    });

    // State for modal visibility and error message
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Function to handle input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setTeamNames(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Function to handle button click
    const handleSetTeamsClick = async () => {
        try {
            // const url = `http://${host}:3001/api/game/api/setTeams/${groupName}`;
            const url = api_url + 'api/game/api/setTeams/' + groupName;
            await axios.post(url, 
                { topTeam: teamNames.topTeam, sideTeam: teamNames.leftTeam });

            navigate(`/super-bowl-squares/${groupName}`, {
                replace: true,
                state: { groupName: groupName, authenticated: true }
            });
        } catch (error) {
            console.error('Error setting teams:', error);
            if (error.response != null) {
                const errorMessage = error.response.data.message;
                setErrorMessage(errorMessage);
                setShowModal(true);
            } else if (error.code === 'ERR_NETWORK') {
                setErrorMessage('Network Error');
                setShowModal(true);
            } else {
                setErrorMessage('Unknown Error');
                setShowModal(true);
            }
        }
    };

    const handleGoBackClick = () => {
        navigate('/set-number-and-teams', {
            replace: true,
            state: { groupName: groupName }
          });
    }

    // Function to close the modal
    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <Container>
            <Row style={fullHeight()}>
                <Col style={{'textAlign':'center'}}>
                    <Row>
                        <Col>
                            <h1>Set Teams</h1>
                            <h6>Group: {groupName}</h6>
                            <br/>
                            <br/>
                            <Row>
                                <Col>
                                    <Row>
                                        <label htmlFor="topTeam">Top Team</label>
                                    </Row>
                                    <Row>
                                        <input type="text" id="topTeam" name="topTeam" value={teamNames.topTeam} onChange={handleInputChange} />
                                    </Row>
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col>
                                    <Row>
                                        <label htmlFor="leftTeam">Left-Side Team</label>
                                    </Row>
                                    <Row>
                                        <input type="text" id="leftTeam" name="leftTeam" value={teamNames.leftTeam} onChange={handleInputChange} />
                                    </Row>
                                </Col>
                            </Row>
                            <br/>
                        </Col>
                    </Row>
                    <Row>
                        <br/>
                        <br/>
                        <br/>
                    </Row>
                    <Row>
                        <Col>
                            <Button style={blackButton()} onClick={handleSetTeamsClick}>
                                Set Teams
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <br/>
                    </Row>
                    <Row>
                        <Col>
                            <Button style={grayButton()} onClick={handleGoBackClick}>
                                Cancel
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            {/* Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>{errorMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

function fullHeight() {
    return {
        height:'90vh',
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center'
    }
}

function blackButton() {
    return {
        backgroundColor: 'black',
        padding: 20,
        border: 'black',
        width: 155
    }
}

function grayButton() {
    return {
        backgroundColor: 'gray',
        padding: 20,
        border: 'black',
        width: 155
    }
}
