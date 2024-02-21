// SetNumbers.js
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useNavigate, useLocation } from "react-router-dom";
import NumberInputBoxes from '../component/NumberInputBoxes';
import axios from 'axios';

export function SetNumbers() {
    const location = useLocation();
    let navigate = useNavigate();
    let groupName =  location.state.groupName;

    // State to hold inputsTop and inputsBottom
    const [inputsState, setInputsState] = useState({
        inputsTop: Array(10).fill(''),
        inputsBottom: Array(10).fill('')
    });

    // Function to handle input changes
    const handleInputChange = (inputs) => {
        setInputsState(inputs);
    };

    // Function to handle button click
    const handleSetNumbersClick = async () => {
        try {
            await axios.post(`http://10.0.0.65:3001/api/game/api/setNumbers/${groupName}`, 
                { topNumbers: inputsState.inputsTop, sideNumbers: inputsState.inputsBottom });

            navigate('/super-bowl-squares', {
                replace: true,
                state: { groupName: groupName }
            });
        } catch (error) {
            console.error('Error fetching data:', error);
            if (error.response != null) {
              console.log(error.response.data.error);
            //   setError(error.response.data.error);
            } else if (error.code == 'ERR_NETWORK') {
                console.log('Network Error');
            //   setError('Network Error');
            } else {
                console.log('Unknown Error');
            //   setError('Unknown Error');
            }
        }
    };

    return (
        <Container>
            <Row style={fullHeight()}>
                <Col style={center()}>
                    <Row>
                        <Col>
                            <h1>Set Numbers</h1>
                            <h6>Group: {groupName}</h6>
                            <br/>
                            <br/>
                            {/* Pass handleInputChange function as a prop */}
                            <NumberInputBoxes onInputChange={handleInputChange} />
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
                            {/* Attach event handler to the button */}
                            <Button style={blackButton()} onClick={handleSetNumbersClick}>
                                Set Numbers
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )

    // Remaining functions remain the same
}

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
        textAlign:'center',
        // height: '30vh'
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
