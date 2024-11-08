// CreateGroupPreferences.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
// import AutoSetNumbers from './components/AutoSetNumbers';
import AutoSetNumbers from './components/AutoSetNumbers';
import axios from 'axios';
import { api_url} from '../../../config';
import UpdatePassword from './components/UpdatePassword';
import AutoSetTeams from './components/AutoSetTeams';
import UpdateVenmoInfo from './components/UpdateVenmoInfo';
import Modal from 'react-bootstrap/Modal';
import { empty_row, emptyNameRow, emptySideNumbers, emptyTopNumbers, } from "../../common/data/EmptyBoardData";
import { fullHeight } from '../../common/style/CommonStyles';
import UpdatePaymentInfoAndLedger from './components/UpdatePaymentInfoAndLedger';
import ToggleButton from './components/ToggleButton';

export function EditGroupPreferences() {

    const location = useLocation();
    let groupName = location.state.groupName;

    const navigate = useNavigate();


    const [isLoading, setIsLoading] = useState(true);

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
    const [paymentAmount, setPaymentAmount] = useState(0);

    const [existingPassword, setExistingPassword] = useState('');
    const [existingVenmoUserName, setExistingVenmoUserName] = useState('');
    const [existingPricePerSquare, setExistingPricePerSquare] = useState(0.0);

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

    // TODO - add button for testing venmo link?

    const handleButtonClick2 = async () => {
        try {
            if (addGroupPassword && !groupPassword && existingPassword == '') {
                setError('Did you mean to add a password?');
                setShowErrorModal(true);
                return; // Exit the function early
            }

            // Check if addVenmoInfo is true and either venmoUsername or paymentAmount is empty
            if (addVenmoInfo && (!venmoUsername || !paymentAmount) && existingVenmoUserName != '' && !existingPricePerSquare) {
                setError('Did you mean to add Venmo info?');
                setShowErrorModal(true);
                return; // Exit the function early
            }
    

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

    // const handleSaveClick = 

    const updatePreferences = async (groupId, updatedPreferences) => {
        try {
            // Validate input
            if (!groupId || typeof updatedPreferences !== 'object' || Object.keys(updatedPreferences).length === 0) {
                console.error('Group ID and updated preferences data are required');
                return;
            }
    
            // Make the POST request to your Node.js API endpoint
            const response = await axios.post(api_url + `api/group/api/updatePreferences/${groupId}`, updatedPreferences);
    
            // Handle the success response
            console.log('Update successful:', response.data);
            alert('Preferences updated successfully!');
        } catch (error) {
            // Handle any errors that occur during the request
            console.error('Error updating preferences:', error);
            alert('Failed to update preferences. Please try again.');
        }
    };
    
    // Usage example
    // Call this function with appropriate arguments when needed (e.g., from a form submission handler)
    const handleUpdatePreferences = () => {
        const groupId = groupName; // Replace with the actual group ID
        const updatedPreferences = {
            groupPassword: groupPassword,
            venmoUsername: venmoUsername,
            paymentAmount: paymentAmount
        };
    
        updatePreferences(groupId, updatedPreferences);
    };

    const fetchData = async () => {
        try {
            const url = api_url + 'api/game/' + groupName;
            const response = await axios.get(url);
            const existingPasswordFromDB = response.data.preferences.groupPassword;
            setExistingPassword(existingPasswordFromDB);
            setGroupPassword(existingPasswordFromDB);
            const existingVenmoUserNameFromDB = response.data.preferences.venmoUsername;
            setExistingVenmoUserName(existingVenmoUserNameFromDB);
            setVenmoUserName(existingVenmoUserNameFromDB);
            const existingPricePerSquareFromDB = response.data.preferences.paymentAmount;
            setExistingPricePerSquare(existingPricePerSquareFromDB);
            setPaymentAmount(existingPricePerSquareFromDB);

            setIsLoading(false);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchData();
        if (existingPassword != '')
        {
            console.log('existing password not empty');
            setAddGroupPassword(true);
        }

        if (existingVenmoUserName != '' && existingPricePerSquare)
        {
            setAddVenmoInfo(true);
        }
      }, [isLoading]);

    return (
        <Container>
            <Row style={fullHeight()}>
                <Row style = {spacer()}/>
                <Row style = {pageTitleSection()}>
                    <Col style={center()}>
                        <h1>Update Settings</h1>
                        <p><b>Group</b>: {groupName}</p>
                    </Col>
                </Row>
                <Row style = {middleSection()}>
                    {/* Group Password Section */}
                    <Row style={{padding:0, margin:0, width:'75vw'}}>
                        <Col style={center()}>
                            <UpdatePassword 
                                addGroupPassword={addGroupPassword} 
                                handleAddPasswordToggleChange={handleAddPasswordToggleChange} 
                                handleSetGroupPassword={handleSetGroupPassword}
                                existingGroupPassword={existingPassword}/>
                        </Col>
                    </Row>


                    {/* Venmo Info Section */}
                    <Row style={{padding:0, margin:0, width:'75vw'}}>
                        <Col style={center()}>
                            <UpdateVenmoInfo
                                addVenmoInfo={addVenmoInfo} 
                                handleAddVenmoInfoToggleChange={handleAddVenmoInfoToggleChange} 
                                handleSetVenmoUsername={handleSetVenmoUsername}
                                handleSetVenmoPaymentInfo={handleSetVenmoPaymentInfo}
                                existingVenmoUserName={existingVenmoUserName}
                                existingPaymentAmount={existingPricePerSquare}/>
                        </Col>
                    </Row>


                    {/* Auto-set Teams and Numbers Section */}
                    {/* <Row style={{padding:0, margin:0, width:'75vw'}}>
                        <Col style={center()}>
                            <AutoSetNumbers 
                                autoSetNumbers={autoSetNumbers} 
                                handleToggleChange={handleAutoSetNumberChange} />
                        </Col>
                    </Row>
                    <Row style={{padding:0, margin:0, width:'75vw'}}>
                        <Col style={center()}>
                            <AutoSetTeams 
                                autoSetTeams={autoSetTeams} 
                                handleAutoSetTeamsChange={handleAutoSetTeamsChange} 
                                handleSetTeam1={handleSetTeam1} 
                                handleSetTeam2={handleSetTeam2}/>
                        </Col>
                    </Row> */}
                    <Row style={{padding:0, margin:0, width:'75vw'}}>
                        <ToggleButton/>
                    </Row>
                    



                    {/* Payment Info and Ledger Section */}
                    <Row style={{paddingLeft:0, paddingRight:0, margin:0, width:'75vw'}}>
                        <Col style={center2()}>
                            <UpdatePaymentInfoAndLedger groupId={groupName}/>
                        </Col>
                    </Row>
                    {/* <Row>
                        <Col style={center()}>
                            <Button style={backButton()} >Update Payout Info</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={center()}>
                        <Button style={backButton()} >Update Payment Ledger</Button>
                        </Col>
                    </Row> */}
                </Row>
                <Row style = {buttonSection()}>
                    <Row>
                        <Col style={center()}>
                            <Button 
                                style={blackButton()} 
                                onClick={handleUpdatePreferences}
                                >
                                    Save Changes
                            </Button>
                        </Col>
                    </Row>
                    {/* <br/> */}
                    <Row >
                        <Col style={center()}>
                            <Button 
                                style={backButton()} 
                                onClick={handleButtonClick2}>
                                    Go Back
                            </Button>
                        </Col>
                    </Row>
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

            <Modal show={isLoading} centered>
                    <Modal.Body>
                        Loading...
                    </Modal.Body>
            </Modal>
        </Container>
    )

    function buttonSection() {
        return {
            height: '15vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
    }

    function pageTitleSection() {
        return {
            height: '10vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }
    }

    function spacer() {
        return {
            height: '5vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }
    }

    function middleSection() {
        return {
            height: '60vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
    }

    function center() {
        return {
            textAlign: 'center',
            margin: 0,
            padding: 0,
            
        }
    }

    function center2() {
        return {
            // textAlign: 'center',
            margin: 0,
            padding: 0,
            // width: '75vw',
        }
    }

    function blackButton() {
        return {
            backgroundColor: "black",
            border: 'black',
            width: '75vw',
            padding: 15
        }
    }

    function backButton() {
        return {
            backgroundColor: "lightgray",
            color: 'black',
            border: 'black',
            width: '75vw',
            padding: 5
        }
    }
}
