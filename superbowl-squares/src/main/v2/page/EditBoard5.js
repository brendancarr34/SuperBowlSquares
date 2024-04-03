import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import GridComponent3 from './GridComponent3';
import { host , api_url} from '../../../config';

export function EditBoard5() {
  
  const location = useLocation();
  let groupName =  location.state.groupName;
  
  const [playerName, setPlayerName] = useState("");
  const [playerInitials, setPlayerInitials] = useState("");
  const [clickedButtons, setClickedButtons] = useState([]);
  const [showErrorModal, setShowErrorModal] = useState(false); // State for showing error modal
  const [showApiErrorModal, setShowApiErrorModal] = useState(false); // State for showing API error modal
  const [showTakenInitialsModal, setShowTakenInitialsModal] = useState(false);
  const [showClickedButtonsTakenModal, setShowClickedButtonsTakenModal] = useState(false);

  let navigate = useNavigate();

  const handleSubmit = async () => {
    try {

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
        console.log('MAKING API POST game/api/validateAndClaimSquaresV3/${groupName}');
        const url = api_url + 'api/game/api/validateAndClaimSquaresV3/' + groupName;
        // const response = await axios.post(`http://${host}:3001/api/game/api/validateAndClaimSquaresV3/${groupName}`, 
        //       { maps: clickedButtons, initials: playerInitials, playerName: playerName });
        const response = await axios.post(url, 
              { maps: clickedButtons, initials: playerInitials, playerName: playerName });
        console.log('Submit successful:', response.data);
      }

      // Successful submission logic
      navigate('/super-bowl-squares', { 
        replace: true, 
        state: { name: playerName, initials: playerInitials, groupName: groupName } 
      });
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
          <Button disabled={false} style={black()} onClick={handleSubmit}>
            Submit
          </Button>
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
    margin:0,
    // textAlign: 'center',
    // width: '100%',
    // paddingTop: 50
  }
}

function black() {
  return {
    backgroundColor: "black",
    border: 'black',
    padding: 0,
    width: '100%',
    height: '85%',
    // marginLeft: 5,
    // marginRight: 5,
    // paddingLeft:5
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
      // paddingTop: 15,
      // paddingBottom: 15,
      paddingBottom: 15,
      paddingRight: 15,
      paddingLeft:15
  }
}

export default EditBoard5;