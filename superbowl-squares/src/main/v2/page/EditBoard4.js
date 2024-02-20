import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal'; // Import Modal
import axios from 'axios';
import GridComponent3 from './GridComponent3';

export function EditBoard4() {
  const location = useLocation();
  let groupName =  location.state.groupName;
  const [playerName, setPlayerName] = useState("");
  const [playerInitials, setPlayerInitials] = useState("");
  const [clickedButtons, setClickedButtons] = useState([]);
  const [showErrorModal, setShowErrorModal] = useState(false); // State for showing error modal
  const [showApiErrorModal, setShowApiErrorModal] = useState(false); // State for showing API error modal

  let navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [clickedButtons]);

  const fetchData = async () => {
    try {
      console.log('Fetching data from API...');
      // Fetch data logic goes here...
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      console.log('Submit button clicked');
      console.log('Clicked buttons:', clickedButtons);

      // Check if playerName and playerInitials are not empty
      if ((!playerName.trim() || !playerInitials.trim()) && (clickedButtons.length > 0)) {
        setShowErrorModal(true); // Show error modal if fields are empty
        return; // Exit early if fields are empty
      }

      // // Check if clickedButtons is empty
      // if (clickedButtons.length === 0) {
      //   setShowApiErrorModal(true); // Show API error modal if clickedButtons is empty
      //   return; // Exit early if clickedButtons is empty
      // }

      if (clickedButtons.length > 0) {
        const response = await axios.post(`http://10.0.0.65:3001/api/game/api/validateAndClaimSquaresV3/${groupName}`, { maps: clickedButtons, initials: playerInitials, playerName: playerName });

        console.log('Submit successful:', response.data);
      }

      // Handle successful submission logic...
      navigate('/super-bowl-squares', { 
        replace: true, 
        state: { name: playerName, initials: playerInitials, groupName: groupName } 
      });
    } catch (error) {
      console.error('Error submitting data:', error);
      if (error.response && error.response.data && error.response.data.validMaps) {
        // Set the clicked buttons and update the grid
        // setActiveButtonData(error.response.data.validSquares);
        setClickedButtons(error.response.data.validMaps);
      } else {
        // Handle other error scenarios...
      }
    }
  };

  return (
    <Container>
      <Row>
        <Col style={center()}>
          <h1 style={{ padding: 15 }}>Claim Squares</h1>
        </Col>
      </Row>
      <Row>
        <Col/>
        <Col/>
        <Col style={board()}>
          <GridComponent3 groupId={groupName} setClickedButtons={setClickedButtons} />
        </Col>
        <Col/>
        <Col/>
      </Row>
      <Row>
        <Col>
          <Form>
            <Form.Group className="mb-3" onChange={(e) => setPlayerName(e.target.value)}>
              <Form.Control placeholder="First & Last Name" />
            </Form.Group>
            <Form.Group className="mb-3" onChange={(e) => setPlayerInitials(e.target.value)}>
              <Form.Control placeholder="Initials" />
            </Form.Group>
          </Form>
        </Col>
        <Col>
          <Button disabled={false} style={black()} onClick={handleSubmit}>
            Submit
          </Button>
        </Col>
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

function black() {
  return {
    backgroundColor: "black",
    border: 'black',
    padding: 0,
    width: '100%',
    height: '85%'
  }
}

export default EditBoard4;