import React, { useState} from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import { createGroup } from '../hook/createGroupHook';

export function CreateGroup() {

    const [groupName, setGroupName] = useState("");
    const [groupPassword, setGroupPassword] = useState("");

    let navigate = useNavigate(); 
    const superBowlSquares = () => { 
        let name = createGroup(groupName, groupPassword);
        setGroupName("");
        setGroupPassword("");
        navigate('/super-bowl-squares', {state: { groupName: name }});
    }

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
                        <Button style={blackButton()} onClick={superBowlSquares}>
                                Start a New Game
                        </Button>
                    </Col>
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
}