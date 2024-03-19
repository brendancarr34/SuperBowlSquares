// CreateGroupPreferences.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import AutoSetNumbers from '../component/AutoSetNumbers';
import axios from 'axios';
import { host } from '../../../config';

export function CreateGroupPreferences() {

    const location = useLocation();
    const groupName = location.state.groupName;

    const navigate = useNavigate();

    // State to store autoSetNumbers
    const [autoSetNumbers, setAutoSetNumbers] = useState(false);

    // Function to handle checkbox change
    const handleToggleChange = (newValue) => {
        setAutoSetNumbers(newValue);
    };

    const handleButtonClick = async () => {
        try {
            // Make the POST request to the API endpoint
            const url = 'http://' + host + ':3001/api/game/api/setPreferences/' + groupName;
            const response = await axios.post(url, {
                autoSetNumbers: autoSetNumbers
            });

            // Handle success response
            console.log(response.data.message);
        } catch (error) {
            // Handle error
            console.error('Error:', error.response.data.error);
        }

        navigate('/super-bowl-squares', { state: { groupName: groupName } });
    }

    return (
        <Container>
            <Row style={fullHeight()}>
                <Row>
                    <Col style={center()}>
                        <h1>Set Group Preferences</h1>
                        <p>groupName: {groupName}</p>
                    </Col>
                </Row>
                <Row>
                    <Col style={center()}>
                        {/* Pass autoSetNumbers state and handleToggleChange function as props */}
                        <AutoSetNumbers autoSetNumbers={autoSetNumbers} handleToggleChange={handleToggleChange} />
                    </Col>
                </Row>
                <Row>
                    <Col style={center()}>
                        <Button style={blackButton()} onClick={handleButtonClick}>
                            Start a New Group
                        </Button>
                    </Col>
                </Row>
            </Row>
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
