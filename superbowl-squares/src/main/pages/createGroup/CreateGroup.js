import React, { useState} from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import axios from 'axios';
import { api_url} from '../../../config.js';

import { fullHeight } from '../../common/style/CommonStyles';
import '../../common/style/Button.css'

export function CreateGroup() {

    const location = useLocation();

    let betaPasswordInput = '';
    if (location.state.betaPasswordInput) {
        betaPasswordInput = location.state.betaPasswordInput;
    }

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

    let navigate = useNavigate(); 
    const [groupName, setGroupName] = useState("");
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [error, setError] = useState(null);

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

    const handleButtonClick2 = async () => {
        try {
            if (groupName == '') {
                let uuid = generateUUID().substring(0,8);
                navigate('/create-group-preferences', {state: { groupName: uuid, betaPasswordInput: betaPasswordInput }});
            }
            else {
                const url = api_url + 'api/game/' + groupName
                await axios.get(url);
    
                // If group is found, show error modal
                setError("Group with name '" + groupName + "' already exists");
                setShowErrorModal(true);
            }

        } catch (error) {
            // if groupName is not found, navigate to group preferences with new groupName
            if (error.response != null && 
                    error.response.data.error == 'Document not found') {

                if (groupName === "") {
                    setGroupName(generateUUID().substring(0,6));
                }

                navigate('/create-group-preferences', {state: { groupName: groupName, betaPasswordInput: betaPasswordInput }});
            }
            else if (error.response != null) {
                setError(error.response.data.error);
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
    };

    const handleSubmit = (event) => {
        if (event.key === 'Enter') {
          event.preventDefault(); // Prevents the default behavior of Enter key (e.g., adding a newline)
          handleButtonClick2();
        }
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
                            Create a Group
                        </h1>
                    </Col>
                </Row>
                <Row style={width75()}>
                    <Col style={width75()}>
                        <Form>
                            <Form.Group className="mb-3" >
                                <Form.Label>Group Name</Form.Label>
                                <Form.Control 
                                    placeholder="Enter custom group name" 
                                    onChange={handleGroupNameChange}
                                    value={groupName}
                                    onKeyDown={handleSubmit}/>
                                <Form.Text className="text-muted">
                                    This is optional. If you leave this blank, 
                                    a group name will be generated for you. Your 
                                    group name should have only lowercase letters and 
                                    dashes.
                                </Form.Text>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row style={width75()}>
                    <Col style={center()}>
                        <Button style={blackButton()} onClick={handleButtonClick2}>
                            Next
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

            {/* Error Modal for Taken Group Name */}
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
            textAlign:'center',
            margin:0,
            padding:0
        }
    }

    function width75() {
        return {
            width:'75vw',
            margin:0,
            padding:0
        }
    }

    function blackButton() {
        return {
            backgroundColor:"#4682b4",
            border:'black',
            width:'100%',
            height:75
        }
    }

    function grayButton() {
        return {
            backgroundColor:"lightgray",
            color:"black",
            border:'lightgray',
            width: '100%'
        }
    }
}