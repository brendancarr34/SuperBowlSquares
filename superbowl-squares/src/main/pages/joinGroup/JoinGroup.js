import React, {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from "react-router-dom";
import { api_url} from '../../common/config';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';

export function JoinGroup() {

    const [groupName, setGroupName] = useState(useParams()['groupName']);
    const [groupPassword, setGroupPassword] = useState("");
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [error, setError] = useState(null);

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
            console.log(response.data);
            if (!response.data) {
                navigate('/super-bowl-squares', {state: { groupName: groupName }});
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
            navigate('/super-bowl-squares', {state: { groupName: groupName }});
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
                            <Form.Group className="mb-3" >
                                <Form.Label>Group Code</Form.Label>
                                <Form.Control placeholder=""
                                onChange={handleGroupNameChange}
                                value={groupName} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword" onChange={(e) => setGroupPassword(e.target.value)}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="" />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col style={center()}>
                        <Button style={black()} onClick={superBowlSquares}>
                            Join a Game
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

    function fullHeight() {
        return {
            height:'90vh',
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center'
        }
    }

    function center() {
        return {
            textAlign:'center'
        }
    }

    function black() {
        return {
            backgroundColor:"black",
            border:'black',
            width:'75vw',
            padding:20
        }
    }

    function wide() {
        return {
            width:'75vw',
            margin:0,
            padding:0
        }
    }
}