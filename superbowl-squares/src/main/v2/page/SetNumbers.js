import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate, useLocation } from "react-router-dom";
import NumberInputBoxes from '../component/NumberInputBoxes';
import axios from 'axios';
import { emptyTopNumbers } from '../data/EmptyBoardData';
import { host } from '../../../config';

export function SetNumbers() {
    const location = useLocation();
    let navigate = useNavigate();
    let groupName = location.state.groupName;

    // State to hold inputsTop and inputsBottom
    const [inputsState, setInputsState] = useState({
        inputsTop: Array(10).fill(''),
        inputsBottom: Array(10).fill('')
    });

    useEffect(() => {
        // Function to fetch data from the API
        const fetchData = async () => {
            try {
                const response = await axios.get('http://' + host + ':3001/api/game/' + groupName);
                if (response.data.topNumbers !== emptyTopNumbers && response.data.sideNumbers !== emptyTopNumbers) {
                    setInputsState({
                        inputsTop: response.data.topNumbers,
                        inputsBottom: response.data.sideNumbers
                    });
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // State for modal visibility and error message
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Function to handle input changes
    const handleInputChange = (inputs) => {
        setInputsState(inputs);
    };

    // Function to handle button click to set random numbers
    const handleRandomNumbersClick = async () => {
        const getRandomNumbers = () => {
            const randomNumbers = [];
            while (randomNumbers.length < 10) {
                const randomNumber = Math.floor(Math.random() * 10);
                if (!randomNumbers.includes(randomNumber)) {
                    randomNumbers.push(randomNumber);
                }
            }
            return randomNumbers;
        };

        const randomNumbersTop = getRandomNumbers();
        const randomNumbersBottom = getRandomNumbers();

        // console.log('randomNumbersTop: ' + randomNumbersTop);
        // console.log('randomNumbersBottom: ' + randomNumbersBottom);

        // setInputsState({
        //     inputsTop: randomNumbersTop,
        //     inputsBottom: randomNumbersBottom
        // });

        // console.log('inputsState.inputsTop: ' + inputsState.inputsTop);
        // console.log('inputsState.inputsBottom: ' + inputsState.inputsBottom);

        // setInputsState(prevState => ({
        //     inputsTop: getRandomNumbers(),
        //     inputsBottom: getRandomNumbers()
        // }));

        // console.log('inputsState.inputsTop: ' + inputsState.inputsTop);
        // console.log('inputsState.inputsBottom: ' + inputsState.inputsBottom);

        try {
            await axios.post(`http://${host}:3001/api/game/api/setNumbers/${groupName}`,
                { topNumbers: randomNumbersTop, sideNumbers: randomNumbersBottom });

            navigate('/super-bowl-squares', {
                replace: true,
                state: { groupName: groupName }
            });
        } catch (error) {
            console.error('Error fetching data:', error);
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

    // Function to handle button click to set numbers
    const handleSetNumbersClick = async () => {
        try {
            await axios.post(`http://${host}:3001/api/game/api/setNumbers/${groupName}`,
                { topNumbers: inputsState.inputsTop, sideNumbers: inputsState.inputsBottom });

            navigate('/super-bowl-squares', {
                replace: true,
                state: { groupName: groupName }
            });
        } catch (error) {
            console.error('Error fetching data:', error);
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
        navigate('/super-bowl-squares', {
            replace: true,
            state: { groupName: groupName }
        });
    };

    // Function to close the modal
    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <Container>
            <Row style={fullHeight()}>
                <Col style={{ textAlign: 'center' }}>
                    <Row>
                        <Col>
                            <h1>Set Numbers</h1>
                            <h6>Group: {groupName}</h6>
                            <br />
                            <br />
                            {/* Pass handleInputChange function as a prop */}
                            <NumberInputBoxes onInputChange={handleInputChange} inputsTop={inputsState.inputsTop} inputsBottom={inputsState.inputsBottom} />
                            <br />
                        </Col>
                    </Row>
                    <Row>
                        <br />
                        <br />
                        <br />
                    </Row>
                    <Row>
                        <Col>
                            {/* Attach event handler to the button */}
                            <Button style={blackButton()} onClick={handleRandomNumbersClick}>
                                Generate Random Numbers
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <br />
                    </Row>
                    <Row>
                        <Col>
                            {/* Attach event handler to the button */}
                            <Button style={blackButton()} onClick={handleSetNumbersClick}>
                                Set Numbers
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <br />
                    </Row>
                    <Row>
                        <Col>
                            {/* Attach event handler to the button */}
                            <Button style={blackButton()} onClick={handleGoBackClick}>
                                Go Back
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
    );
}

function fullHeight() {
    return {
        height: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };
}

function blackButton() {
    return {
        backgroundColor: 'black',
        padding: 20,
        border: 'black',
        width: 200
    };
}
