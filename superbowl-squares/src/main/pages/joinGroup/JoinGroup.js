import React, {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from "react-router-dom";
import { api_url} from '../../../config.js';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { fullHeight } from '../../common/style/CommonStyles';

export function JoinGroup() {

    const [groupName, setGroupName] = useState(useParams()['groupName']);
    const [groupPassword, setGroupPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [error, setError] = useState(null);

    // Check if the user is on a mobile device
    const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    let navigate = useNavigate();

    const handleGroupNameChange = (e) => {
        let value = e.target.value;
        // Convert spaces to hyphens
        value = value.replace(/\s+/g, '-');
        // Remove any punctuation other than spaces and hyphens
        value = value.replace(/[^\w\s-]/gi, '');
        // Convert input value to lowercase
        value = value.toLowerCase();
        setGroupName(value);
    };

    useEffect(() => {
        const url = api_url + 'api/group/api/hasPassword/' + groupName;
        axios.get(url)
        .then(response => {
            // Handle the response data
            // console.log(response.data);
            if (!response.data) {
                navigate(`/super-bowl-squares/${groupName}`, {state: { groupName: groupName, justJoined: true, authenticated: true }});
            }
          })
          .catch(error => {
            // Handle errors
            console.error('Error fetching data:', error);
          });
    }, [])

    useEffect(() => {
        // Listen for the popstate event
        const handlePopstate = () => {
            // Navigate back to ViewBoard3 if the user clicks the back button
            navigate('/join-group', { replace: true ,state: { groupName: groupName }});
        };

        window.addEventListener('popstate', handlePopstate);

        return () => {
            // Remove the event listener when the component unmounts
            window.removeEventListener('popstate', handlePopstate);
        };
    }, [navigate]);

    const superBowlSquares = async () => { 

        try {
            const url = api_url + 'api/group/api/joinGroup/' + groupName
            await axios.post(url, {submittedPassword: groupPassword});
    
            console.log("group: " + groupName + ", password: " + groupPassword)
            navigate(`/super-bowl-squares/${groupName}`, {state: { groupName: groupName, justJoined: true, authenticated: true }});
        }
        catch (error) {
            if (error.response.data.error == 'Document not found') {
                setError("Group with name '" + groupName + "' does not exist.")
                setShowErrorModal(true);
            }
            else if (error.response.data.error == 'Incorrect password') {
                setError("Password is incorrect.")
                setShowErrorModal(true);
            }
            else if (error.code == 'ERR_NETWORK') {
                setError('Network Error');
                setShowErrorModal(true);
            } else {
                setError('Unknown Error');
                setShowErrorModal(true);
            }
        }
        
    }

    const handleSubmit = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevents the default behavior of Enter key (e.g., adding a newline)
            superBowlSquares();
        }
    };

    const maskPassword = (password) => {
        return '•'.repeat(password.length);  // Replace with bullets (•) or any other masking character
    };

    return (
        <Container>
            <Row style={fullHeight()}>
                <Row>
                    <br/>
                </Row>
                <Row>
                    <Col style={center()}>
                        <h1>
                            Join a Group
                        </h1>
                    </Col>
                </Row>
                <Row style={wide()}>
                    <Col style={wide()}>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicInput">
                                <Form.Label>Group Code</Form.Label>
                                <Form.Control 
                                    type="text"
                                    placeholder=""
                                    onChange={handleGroupNameChange}
                                    value={groupName} 
                                    onKeyDown={handleSubmit}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword" onChange={(e) => setGroupPassword(e.target.value)}>
                                <Form.Label>Password</Form.Label>
                                <div style={{ position: 'relative', width: '100%' }}>
                                    {/* Password Input */}
                                    <Form.Control
                                        type={showPassword ? 'text' : 'text'} // Always text to prevent autofill, masking is done manually
                                        value={groupPassword}
                                        onChange={(e) => setGroupPassword(e.target.value)}
                                        placeholder=""
                                        autoComplete="off"
                                        style={{
                                            fontFamily: 'inherit',
                                            letterSpacing: '0.05em', // Adjust spacing when masked
                                            textIndent: '3px',  // Adds a small space before the text
                                            border: '1px solid #ccc',
                                            padding: '8px',
                                            width: '100%',
                                            backgroundColor: 'transparent',
                                            color: showPassword ? 'black' : 'transparent', // Hide text when masked
                                            caretColor: !isMobileDevice && 'black' ,
                                            borderRadius: '8px',  // Rounded edges
                                            position: 'relative',
                                            zIndex: 2
                                        }}
                                    />

                                    {
                                        !showPassword && 
                                        <div
                                            style={{
                                                fontFamily: 'inherit',
                                                letterSpacing: '0.1em',
                                                position: 'absolute',
                                                top: '50%', // Position at the middle
                                                transform: 'translateY(-68%)', // Move it slightly up
                                                left: 0,
                                                color: 'black',  // Color of the masked text
                                                zIndex: 1,
                                                paddingLeft: '12px',  // Align with the input text
                                                width: '100%',
                                                height: '100%',
                                                display: 'flex',
                                                alignItems: 'center',  // Vertically center the dots
                                                pointerEvents: 'none',  // Prevent interaction with the masked text div
                                                opacity: showPassword ? 0 : 1,
                                                textIndent: '3px',  // Adds a small space before the text
                                            }}
                                        >
                                            <b>{maskPassword(groupPassword)}</b>
                                        </div> 
                                    }

                                    {/* Show Password Toggle */}
                                    <div 
                                        style={{
                                            fontSize: '12px',
                                            color: '#4682b4',
                                            cursor: 'pointer',
                                            marginTop: '4px',
                                            textAlign: 'left'
                                        }}
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? 'Hide Password' : 'Show Password'}
                                    </div>
                                </div>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row style={width75()}>
                    <Col style={width75()}>
                        <Button style={black()} onClick={superBowlSquares}>
                            Join
                        </Button>
                        <br/>
                        <br/>
                        <Button style={grayButton()} onClick={() => {
                            navigate('/', { 
                                replace: true
                            });
                        }}>
                            Cancel
                        </Button>
                    </Col>
                </Row>
            </Row>

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

    function center() {
        return {
            textAlign:'center'
        }
    }

    function black() {
        return {
            backgroundColor:"#4682b4",
            border:'black',
            width:'100%',
            height:75
        }
    }

    function wide() {
        return {
            width:'75vw',
            margin:0,
            padding:0
        }
    }

    function grayButton() {
        return {
            backgroundColor:"lightgray",
            color:"black",
            border:'black',
            width: '100%'
        }
    }

    function width75() {
        return {
            width:'75vw',
            margin:0,
            padding:0
        }
    }
}