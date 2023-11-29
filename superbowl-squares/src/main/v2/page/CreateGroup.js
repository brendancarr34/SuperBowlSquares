import React, { useState} from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { empty_row, emptyNameRow } from "../data/EmptyBoardData";
import '../style/Button.css'

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

export function CreateGroup() {

    let navigate = useNavigate(); 
    const [groupName, setGroupName] = useState("");
    const [groupPassword, setGroupPassword] = useState("");
    const [error, setError] = useState(null);

    const handleButtonClick = async () => {
        try {
            // TODO - review/fix logic for empty groupName
            // if groupName is empty, create a group name
            if (groupName === "") {
                groupName = generateUUID().substring(0,6);
            }

          // Make the API call using Axios
          const url = 'http://localhost:3001/api/group/add/' + groupName
          // TODO - handle error when unable to make API call
          const response = await axios.post(url, {
            name: groupName,
            password: groupPassword,
            gameData: {
                row0: empty_row,
                row0_players: emptyNameRow,
                row1: empty_row,
                row1_players: emptyNameRow,
                row2: empty_row,
                row2_players: emptyNameRow,
                row3: empty_row,
                row3_players: emptyNameRow,
                row4: empty_row,
                row4_players: emptyNameRow,
                row5: empty_row,
                row5_players: emptyNameRow,
                row6: empty_row,
                row6_players: emptyNameRow,
                row7: empty_row,
                row7_players: emptyNameRow,
                row8: empty_row,
                row8_players: emptyNameRow,
                row9: empty_row,
                row9_players: emptyNameRow
            },
            players: []
          });
          setError(null);
          navigate('/super-bowl-squares', {state: { groupName: groupName }});
        } catch (error) {
          console.error('Error fetching data:', error);
          if (error.response != null) {
            console.log(error.response.data.error);
            setError(error.response.data.error);
          } else if (error.code == 'ERR_NETWORK') {
            setError('Network Error');
          } else {
            setError('Unknown Error');
          }
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
                            <Form.Group className="mb-3" onChange={(e) => setGroupName(e.target.value)}>
                                <Form.Label>Group Name</Form.Label>
                                <Form.Control placeholder="Enter custom group name" />
                                <Form.Text className="text-muted">
                                    This is optional. If you leave this blank, 
                                    a group name will be generated for you.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" onChange={(e) => setGroupPassword(e.target.value)}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control placeholder="Enter custom password" />
                                <Form.Text className="text-muted">
                                    This is optional. If you leave this blank, 
                                    anyone with the link to your game will be able to edit squares.
                                </Form.Text>
                        </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col style={center()}>
                        <Button style={blackButton()} onClick={handleButtonClick}>
                                Start a New Game
                        </Button>
                    </Col>
                    {error && (
                                <div className="error-popup">
                                <p>{error}</p>
                                <button onClick={() => setError(null)}>X</button>
                                </div>
                            )}
                </Row>
            </Row>
        </Container>
    )

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
            backgroundColor:"black",
            border:'black',
            width:'75vw',
            padding:20
        }
    }

    function input() {
        return {
            color: error ? 'red' : 'black'
        }
    }
}