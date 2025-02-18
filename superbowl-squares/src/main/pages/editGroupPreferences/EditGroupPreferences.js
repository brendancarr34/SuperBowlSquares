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
import { api_url} from '../../../config.js';
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

    const [existingPaymentBreakdown, setExistingPaymentBreakdown] = useState({});

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
    

            navigate(`/super-bowl-squares/${groupName}`, { state: { groupName: groupName, authenticated: true } });
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
    
    const handleUpdatePreferences = () => {
        // TODO - add confirmation modal for changed values
        const groupId = groupName;
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

            const existingQ1PayoutFromDB = response.data.q1Payout;
            const existingQ2PayoutFromDB = response.data.q2Payout;
            const existingQ3PayoutFromDB = response.data.q3Payout;
            const existingQ4PayoutFromDB = response.data.q4Payout;

            const existingQ1WinnerFromDB = response.data.q1Winner;
            const existingQ2WinnerFromDB = response.data.q2Winner;
            const existingQ3WinnerFromDB = response.data.q3Winner;
            const existingQ4WinnerFromDB = response.data.q4Winner;

            setExistingPaymentBreakdown({
                q1Payout: existingQ1PayoutFromDB,
                q2Payout: existingQ2PayoutFromDB,
                q3Payout: existingQ3PayoutFromDB,
                q4Payout: existingQ4PayoutFromDB,
                q1Winner: existingQ1WinnerFromDB,
                q2Winner: existingQ2WinnerFromDB,
                q3Winner: existingQ3WinnerFromDB,
                q4Winner: existingQ4WinnerFromDB,
            })

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

    const setNumbersNav = () => {
        if (!isLoading)
        {
            navigate('/set-numbers', { 
                replace: true, 
                state: {
                    groupName: groupName
                } 
            });

            // navigate('/set-numbers', 
            //     {replace: true, 
            //         state: {
            //             groupName: groupName,
            //             venmoUsername: venmoUsername,
            //             pricePerSquare: pricePerSquare,
            //             q1Payout: quarter1Payout,
            //             q1Winner: quarter1Winner,
            //             q2Payout: quarter2Payout,
            //             q2Winner: quarter2Winner,
            //             q3Payout: quarter3Payout,
            //             q3Winner: quarter3Winner,
            //             q4Payout: quarter4Payout,
            //             q4Winner: quarter4Winner
            //         } 
            //     });
        }
    }

    const setTeamsNav = () => {
        if (!isLoading)
        {
            navigate('/set-teams', { 
                replace: true, 
                state: {
                    groupName: groupName
                } 
            });
        }
    }

    return (
        <Container>
            {!isLoading && <Row style={height85()}>
                <Row style = {spacer()}/>
                <Row style = {pageTitleSection()}>
                    <Col style={center()}>
                        <h1>Update Settings</h1>
                        <p><b>Group</b>: {groupName}</p>
                        <br/>
                        <br/> 
                    </Col>
                </Row>
                <Row style = {middleSection()}>
                    {/* Group Password Section */}
                    <Row style={{padding:0, margin:0, width:'75vw', height:'18%'}}>
                        <Col style={center()}>
                            <UpdatePassword 
                                addGroupPassword={addGroupPassword} 
                                handleAddPasswordToggleChange={handleAddPasswordToggleChange} 
                                handleSetGroupPassword={handleSetGroupPassword}
                                existingGroupPassword={existingPassword}/>
                        </Col>
                    </Row>


                    {/* Venmo Info Section */}
                    <Row style={{padding:0, margin:0, width:'75vw', height: '30%'}}>
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
                    {/* Board Number and Team Settings */}
                    <Row style={{padding:0, margin:0, width:'75vw', height: '18%'}}>
                        <Col style={{padding:0, margin:0, width:'100%', height:'100%', display: 'flex', paddingRight:7}}>
                            <Button 
                                style={{
                                    padding:0, margin:0, 
                                    width:'100%', height:'100%', 
                                    backgroundColor:'black', color:'white',
                                    border:'none'
                                }}
                                onClick={setNumbersNav}
                            >
                                Board Number<br/>Settings 
                            </Button>
                        </Col>
                        <Col style={{padding:0, margin:0, width:'100%', height:'100%', display: 'flex', paddingLeft:7}}>
                            <Button 
                                style={{
                                    padding:0, margin:0, 
                                    width:'100%', height:'100%', 
                                    backgroundColor:'black', color:'white',
                                    border:'none'
                                }}
                                onClick={setTeamsNav}
                            >
                                Board Team<br/>Settings 
                            </Button>
                        </Col>
                    </Row>             
                    {/* Payment Info and Ledger Section */}
                    <Row style={{paddingLeft:0, paddingRight:0, margin:0, width:'75vw', height: '18%'}}>
                        <Col style={center2()}>
                            <UpdatePaymentInfoAndLedger groupId={groupName} existingPaymentBreakdown={existingPaymentBreakdown}/>
                        </Col>
                    </Row>
                </Row>
                <Row style = {buttonSection()}>
                    <Row style={{padding:0, margin:0}}>
                        <Col style={center()}>
                            <Button 
                                style={blackButton()} 
                                onClick={handleUpdatePreferences}
                                >
                                    Save Changes
                            </Button>
                        </Col>
                    </Row>
                    <Row style={{padding:0, margin:0}}>
                        <Col style={center()}>
                            <Button 
                                style={backButton()} 
                                onClick={handleButtonClick2}
                            >
                                    Go Back
                            </Button>
                        </Col>
                    </Row>
                </Row>
            </Row>}

            {
                isLoading 
                && 
                <Row style={height85()}>
                        <p>
                            Loading...
                        </p>
                </Row>
            }

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

    function buttonSection() {
        return {
            height: '18vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin:0
        }
    }

    function pageTitleSection() {
        return {
            height: '11vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }
    }

    function spacer() {
        return {
            height: '2vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }
    }

    function middleSection() {
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
            backgroundColor: "#4682b4",
            border: 'none',
            width: '75vw',
            padding: 20,
            marginTop: 5
        }
    }

    function backButton() {
        return {
            backgroundColor: "lightgray",
            color: 'black',
            border: 'black',
            width: '75vw',
            padding: 6,
            margin: 0
        }
    }

    function height85() {
        return {
            height: '85vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
        }
    }
}
