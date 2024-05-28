import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import GridComponent3 from './components/GridComponent3';
import { api_url} from '../../../config';
import ColorSelector from './components/ColorSelector';
import VenmoPaymentLink from './components/VenmoPaymentLink';

export function EditBoard() {
  
  const location = useLocation();
  let groupName =  location.state.groupName;
  
  const [playerName, setPlayerName] = useState('');
  const [playerInitials, setPlayerInitials] = useState('');
  const [clickedButtons, setClickedButtons] = useState([]);
  const [showErrorModal, setShowErrorModal] = useState(false); // State for showing error modal
  const [showApiErrorModal, setShowApiErrorModal] = useState(false); // State for showing API error modal
  const [showTakenInitialsModal, setShowTakenInitialsModal] = useState(false);
  const [showClickedButtonsTakenModal, setShowClickedButtonsTakenModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');
  const [showVenmoModal, setShowVenmoModal] = useState(false);
  const [venmoUsername, setVenmoUsername] = useState('');
  const [totalPayment, setTotalPayment] = useState('');

  let navigate = useNavigate();

  const viewBoard = () => {
    // Successful submission logic
    navigate('/super-bowl-squares', { 
      replace: true, 
      state: { name: playerName, initials: playerInitials, groupName: groupName } 
    });
  }

  const handleSubmit = async () => {
    try {
      // If nothing is clicked or typed, go back to the main page
      if (!playerName.trim() && !playerInitials.trim() && clickedButtons.length == 0) {
        navigate('/super-bowl-squares', { 
          replace: true, 
          state: { name: playerName, initials: playerInitials, groupName: groupName } 
        });
      }

      // Check if playerName and playerInitials are not empty
      if ((!playerName.trim() || !playerInitials.trim()) && (clickedButtons.length > 0)) {
        setShowErrorModal(true); // Show error modal if fields are empty
        return; // Exit early if fields are empty
      }

      // Check if clickedButtons is empty
      if (clickedButtons.length === 0) {
        setShowApiErrorModal(true); // Show API error modal if clickedButtons is empty
        return; // Exit early if clickedButtons is empty
      }

      if (clickedButtons.length > 0) {
        const url = api_url + 'api/game/api/validateAndClaimSquaresV4/' + groupName;
        const response = await axios.post(url, 
              { maps: clickedButtons, initials: playerInitials, playerName: playerName, color: selectedColor });
      }

      const url = api_url + 'api/group/api/getVenmoInfo/' + groupName;
      const response = await axios.get(url);

      console.log(response.data);
      const hasVenmoInfo = response.data.hasVenmoInfo;
      if (hasVenmoInfo) {
        setVenmoUsername(response.data.venmoUsername);
        const paymentAmount = response.data.paymentAmount;
        setTotalPayment(parseFloat(paymentAmount) * clickedButtons.length);
        setShowVenmoModal(true);
      } else {
        // Successful submission logic
        viewBoard();
      }
      
    } catch (error) {
      console.error('Error submitting data:', error);
      if (error.response && error.response.data && error.response.data.validMaps) {
        // Set the clicked buttons and update the grid
        setShowClickedButtonsTakenModal(true);
        setClickedButtons(error.response.data.validMaps);
      } else {
        // Handle initials already exist scenario
        if (error.response && error.response.data 
              && error.response.data.error 
              && error.response.data.error == 'initials already exist') {
          console.log(error.response.data.error)
          setShowTakenInitialsModal(true);
        }
      }
    }
  };

  // Function to handle going back
  const handleGoBack = () => {
    navigate('/super-bowl-squares', {
      replace: true,
      state: { name: playerName, initials: playerInitials, groupName: groupName }
    });
  };

  return (
    <Container>
      <Row>
        <Col style={center2()}>
          <h1 style={{'padding':15, 'paddingTop':50}}>Claim Squares</h1>
        </Col>
      </Row>
      <Row style={center()}>
          <p>Group Name: {groupName}</p>
      </Row>
      <Row>
        <Col style={board()}>
          <GridComponent3 groupId={groupName} setClickedButtons={setClickedButtons} clickedButtons={clickedButtons}/>
        </Col>
      </Row>
      <Row style={pad()}>
        <Col style={{'padding':0, 'margin':0, 'paddingRight':5}}>
          <Form>
            <Form.Group className="mb-3" onChange={(e) => setPlayerName(e.target.value)}>
              <Form.Control placeholder="First & Last Name" />
            </Form.Group>
            <Form.Group className="mb-3" onChange={(e) => setPlayerInitials(e.target.value)}>
              <Form.Control placeholder="Initials" maxLength={3}/>
            </Form.Group>
          </Form>
        </Col>
        <Col style={{'padding':0, 'margin':0, 'paddingLeft':5}}>
          <Row style={{'padding':0, 'margin':0, height: '100%'}} >
            <Col style={{'padding':0, 'margin':0, 'paddingRight':5}}>
              <div style={{ height: '100%' }}>
                <ColorSelector setColor={setSelectedColor} />
              </div>
            </Col>
            <Col style={{'padding':0, 'margin':0, 'paddingLeft':5}}>
              <div style ={{height: '100%'}}>
                <Button disabled={false} style={black()} onClick={handleSubmit}>
                  Submit
                </Button>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row style={pad2()}>
        <Button onClick={handleGoBack} style={blackPad()}>Cancel</Button>
      </Row>

      {/* Error Modal for Empty Fields */}
      <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please enter both your name and initials.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Error Modal for Empty Clicked Buttons */}
      <Modal show={showApiErrorModal} onHide={() => setShowApiErrorModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>No squares have been selected.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowApiErrorModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Error Modal for Empty Clicked Buttons */}
      <Modal show={showTakenInitialsModal} onHide={() => setShowTakenInitialsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>These initials are taken.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTakenInitialsModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Error Modal for Clicked Buttons Taken */}
      <Modal show={showClickedButtonsTakenModal} onHide={() => setShowClickedButtonsTakenModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>Oh no! Someone took one or more of your squares! Please review your selected squares.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowClickedButtonsTakenModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Venmo Modal */}
      <Modal show={showVenmoModal} onHide={() => viewBoard()}>
        <Modal.Header closeButton>
          <Modal.Title>Squares Claimed!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You successfully claimed {clickedButtons.length} square{clickedButtons.length > 1 && 's'}!
          <br/>
          <br/>
          Your group has Venmo info... open Venmo now?
          <br/>
          <br/>
          <VenmoPaymentLink recipient={venmoUsername} amount={totalPayment}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => viewBoard()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
    
  );
}

function board() {
  return {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
    color: 'black',
    padding: 15
  }
}

function center() {
  return {
    textAlign: 'center',
    width: '100%'
  }
}

function center2() {
  return {
    display: 'flex', 
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    padding:0,
    margin:0
  }
}

function black() {
  return {
    backgroundColor: "black",
    border: 'black',
    padding: 0,
    width: '100%',
    height: '85%'
  }
}

function blackPad() {
  return {
    backgroundColor: "grey",
    color: 'black',
    border: 'black',
    padding: 10,
    width: '100%',
    height: '85%'
  }
}

function pad() {
  return {
      display: 'flex', 
      justifyContent: 'center', 
      paddingTop: 15,
      paddingRight: 15,
      paddingLeft:15
  }
}

function pad2() {
  return {
      display: 'flex', 
      justifyContent: 'center',
      paddingBottom: 15,
      paddingRight: 15,
      paddingLeft:15
  }
}

export default EditBoard;