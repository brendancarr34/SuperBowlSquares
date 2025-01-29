import React, { useState, useEffect } from 'react';
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
import VenmoPaymentButton from '../editBoard/components/VenmoPaymentButton';

export function GroupMenu() {
    const navigate = useNavigate(); // Ensure this is top-level and accessible
    const location = useLocation();

    const [venmoUsername, setVenmoUserName] = useState('');
    const [q1Payout, setQ1Payout] = useState('');
    const [q2Payout, setQ2Payout] = useState('');
    const [q3Payout, setQ3Payout] = useState('');
    const [q4Payout, setQ4Payout] = useState('');
    const [groupName, setGroupName] = useState(null);
    const [pricePerSquare, setPricePerSquare] = useState(0);
    // let groupName = null;

    useEffect(() => {
        console.log(q1Payout);
        if (location.state) {
            setVenmoUserName(location.state.venmoUsername);
            setPricePerSquare(location.state.pricePerSquare);
            setQ1Payout(location.state.q1Payout);
            setQ2Payout(location.state.q2Payout);
            setQ3Payout(location.state.q3Payout);
            setQ4Payout(location.state.q4Payout);
            setGroupName(location.state.groupName);
        } else {
            navigate('/', { replace: true });
        }
    }, [location.state, navigate]);

    const handleGoBack = () => {
        navigate(`/super-bowl-squares/${groupName}`, { state: { groupName: groupName, authenticated: true } });
    }

    const [showPaymentInfoModal, setShowPaymentInfoModal] = useState(false);
    const [showCopiedGameLinkModal, setShowCopiedGameLinkModal] = useState(false);
    const [showUnderConstruction, setShowUnderConstruction] = useState(false);

    const copyToClipboard = () => {
        const gameLink = base_url + '#/join-group/' + groupName;

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

    const toggleConstructionModal = () => {
        setShowUnderConstruction(!showUnderConstruction);
    }

    return (
        <Container>
            <Row style={fullHeight()}>                
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
                            <Button style={buttons()} onClick={() => setShowUnderConstruction(true)}>
                                <h1>👨‍💻</h1> Reach out to the Developer
                            </Button>
                        </Col>
                        <Col style={buttonRight()}>
                            <Button style={buttons()} onClick={() => setShowUnderConstruction(true)}>
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
            </Row>

            <Modal show={showPaymentInfoModal} onHide={() => setShowPaymentInfoModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Payment Info
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        (!venmoUsername && !pricePerSquare && !q1Payout && !q2Payout && !q3Payout && !q4Payout) 
                        && 
                        <h3>No payment info for your group!</h3>
                    }
                    {
                        venmoUsername && <h3>Venmo: <b style={{color:"#4682b4"}}>@{venmoUsername}</b><br/></h3>
                    }
                    {
                        (pricePerSquare > 0) && <h3>Price per square: <b style={{color:"#4682b4"}}>${pricePerSquare}</b><br/></h3>
                    }
                    {
                        (venmoUsername && pricePerSquare) && 
                        <div>
                            <br/>
                            <VenmoPaymentButton recipient={venmoUsername} amount={0} groupName={groupName}/>
                            
                        </div>
                    }
                    {
                        (q1Payout || q2Payout || q3Payout || q4Payout) &&
                        <div>
                            <br/>
                            <br/>
                            <br/>
                        </div>
                    }
                    {
                        q1Payout && <h3>Q1 - <b style={{color:"green"}}>${q1Payout}</b></h3>
                    }
                    {
                        q2Payout && <h3>Q2 - <b style={{color:"green"}}>${q2Payout}</b></h3>
                    }
                    {
                        q3Payout && <h3>Q3 - <b style={{color:"green"}}>${q3Payout}</b></h3>
                    }
                    {
                        q4Payout && <h3>Q4 - <b style={{color:"green"}}>${q4Payout}</b></h3>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowPaymentInfoModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showCopiedGameLinkModal} onHide={toggleModal} centered>
                <Modal.Body>Game link copied to clipboard.</Modal.Body>
            </Modal>

            <Modal show={showUnderConstruction} 
            onHide={toggleConstructionModal} 
            centered>
                <Modal.Body>
                    Under construction...
                </Modal.Body>
            </Modal>
        </Container>
    );

    function height15_bottom() {
        return {
            height: '16vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        };
    }

    function height15_top() {
        return {
            height: '15vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        };
    }

    function heightTop() {
        return {
            height: '6vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        };
    }

    function height70() {
        return {
            height: '50vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '75vw',
            padding: 0,
            margin: 0
        };
    }

    function center() {
        return {
            textAlign: 'center',
            margin: 10,
            padding: 0
        };
    }

    function buttonLeft() {
        return {
            textAlign: 'center',
            margin: 10,
            padding: 0,
            marginLeft: 0
        };
    }

    function buttonRight() {
        return {
            textAlign: 'center',
            margin: 10,
            padding: 0,
            marginRight: 0
        };
    }

    function buttons() {
        return {
            backgroundColor: "#4682b4",
            color: 'white',
            border: 'black',
            width: '100%',
            height: '100%'
        };
    }

    function backButton() {
        return {
            backgroundColor: "lightgray",
            color: 'black',
            border: 'black',
            width: '75vw',
            padding: 10
        };
    }
}
