// CreateGroupPreferences.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { api_url} from '../../../config';
import Modal from 'react-bootstrap/Modal';
import { fullHeight } from '../../common/style/CommonStyles';
import { base_url } from '../../../config';

export function GroupMenu() {

    const location = useLocation();
    let groupName = location.state.groupName;

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/super-bowl-squares', { state: { groupName: groupName } });
    }

    const [showPaymentInfoModal, setShowPaymentInfoModal] = useState(false);
    const [showCopiedGameLinkModal, setShowCopiedGameLinkModal] = useState(false);

    const copyToClipboard = () => {
        // const gameLink = window.location.href;
        const gameLink = base_url + '#/join-group/' + groupName
    
        // Create a temporary textarea element
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = gameLink;
    
        // Append the textarea to the document body
        document.body.appendChild(tempTextArea);
    
        // Select the content of the textarea
        tempTextArea.select();
        
        // Copy the selected text
        document.execCommand('copy');
    
        // Remove the temporary textarea from the document body
        document.body.removeChild(tempTextArea);

        toggleModal();
    };

    const toggleModal = () => {
        setShowCopiedGameLinkModal(!showCopiedGameLinkModal);
    };


    return (
        <Container>
            <Row style={fullHeight()}>
                {/* <Col > */}
                
                <Row style = {heightTop()}/>
                <Row style = {height15_top()}>
                    <Col style={center()}>
                        <h1>Group Menu</h1>
                        <p style={{marginBottom:5}}>groupName: {groupName}</p>
                    </Col>
                </Row>
                <Row style = {height70()}>
                    <Row style={{height:'50%', padding:0}}>
                        <Col style={buttonLeft()}>
                            <Button style={buttons()} onClick={() => setShowPaymentInfoModal(true)}>
                            <h1>💲</h1> Payment Info
                            </Button>
                        </Col>
                        <Col style={buttonRight()}>
                            <Button style={buttons()} onClick={copyToClipboard}>
                            <h1>📲</h1> Share Game Link
                            </Button>
                        </Col>
                    </Row>
                    <Row style={{height:'50%', padding:0}}>
                        <Col style={buttonLeft()}>
                            <Button style={buttons()}>
                                <h1>👨‍💻</h1> Reach out to the Developer
                            </Button>
                        </Col>
                        <Col style={buttonRight()}>
                            <Button style={buttons()}>
                                <h1>ℹ️</h1> How to Play
                            </Button>
                        </Col>
                    </Row>
                </Row>
                <Row style = {height15_bottom()}>
                    <Col style={center()}>
                        <Button 
                            style={backButton()} 
                            onClick={handleGoBack}
                            >
                                Back
                        </Button>
                    </Col>
                </Row>
                {/* </Col> */}
            </Row>
            

            {/* Error Modal for API Failure */}
            {/* <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>{error}</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal> */}

            <Modal show={showPaymentInfoModal} onHide={() => setShowPaymentInfoModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Payment Info
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Venmo: 
                    <br/>
                    <br/>
                    Price per square:
                    <br/>
                    <br/>
                    <Button>
                        Send a Venmo
                    </Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowPaymentInfoModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>



            {/* Modal for Copied Link */}
            <Modal show={showCopiedGameLinkModal} onHide={() => {
                toggleModal(false); window.scrollTo({
                    top: -1,
                    behavior: "smooth", // Optional: smooth scrolling
                  });}} style={{width:'70%',transform: 'translate(22%, 0%)',}} centered>
                <Modal.Body style={{}}>Game link copied to clipboard.</Modal.Body>
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
            height: '15vh',
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
            height: '50vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '75vw',
            padding:0,
            margin:0
        }
    }

    function center() {
        return {
            textAlign: 'center',
            margin: 10,
            padding: 0
        }
    }

    function buttonLeft() {
        return {
            textAlign: 'center',
            margin: 10,
            padding: 0,
            marginLeft:0
        }
    }

    function buttonRight() {
        return {
            textAlign: 'center',
            margin: 10,
            padding: 0,
            marginRight:0
        }
    }

    function buttons() {
        return {
            backgroundColor: "#4682b4",
            color: 'white',
            border: 'black',
            width: '100%',
            height: '100%'
            // padding: 10
        }
    }

    function backButton() {
        return {
            backgroundColor: "lightgray",
            color: 'black',
            border: 'black',
            width: '75vw',
            padding: 10
        }
    }

    function fullHeight2() {
        return {
            height:'90vh',
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            width:'75vw'
        }
    }
}
