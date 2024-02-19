import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import GridComponent2 from './GridComponent2';

export function EditBoard3() {
  const location = useLocation();
  let groupName =  location.state.groupName;
  const [playerName, setPlayerName] = useState("");
  const [playerInitials, setPlayerInitials] = useState("");
  const [clickedButtons, setClickedButtons] = useState([]);
  // let [activeButtonData, setActiveButtonData] = useState(emptyBoard);

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

      const response = await axios.post(`http://10.0.0.65:3001/api/game/api/validateAndClaimSquaresV2/${groupName}`, { maps: clickedButtons, initials: playerInitials, playerName: playerName });

      console.log('Submit successful:', response.data);

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
          <GridComponent2 groupId={groupName} setClickedButtons={setClickedButtons} />
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

export default EditBoard3;
