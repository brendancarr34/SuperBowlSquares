import React, {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";

export function JoinGroup() {

    const [groupName, setGroupName] = useState("");
    const [groupPassword, setGroupPassword] = useState("");

    let navigate = useNavigate(); 

    useEffect(() => {
        // Listen for the popstate event
        const handlePopstate = () => {
            // Navigate back to ViewBoard3 if the user clicks the back button
            navigate('/join-group', { replace: true ,state: { groupName: groupName }});
        };

        window.addEventListener('popstate', handlePopstate);

        return () => {
            // Remove the event listener when the component unmounts
            window.removeEventListener('popstate', handlePopstate);
        };
    }, [navigate]);

    const superBowlSquares = () => { 
        console.log("group: " + groupName + ", password: " + groupPassword)
        navigate('/SuperBowlSquares/super-bowl-squares', {state: { groupName: groupName }});
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
                            Join a Group
                        </h1>
                    </Col>
                </Row>
                <Row style={wide()}>
                    <Col style={wide()}>
                        <Form>
                            <Form.Group className="mb-3" onChange={(e) => setGroupName(e.target.value)}>
                                <Form.Label>Group Code</Form.Label>
                                <Form.Control placeholder="" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword" onChange={(e) => setGroupPassword(e.target.value)}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="" />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col style={center()}>
                        <Button style={black()} onClick={superBowlSquares}>
                            Join a Game
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
            textAlign:'center'
        }
    }

    function black() {
        return {
            backgroundColor:"black",
            border:'black',
            width:'75vw',
            padding:20
        }
    }

    function wide() {
        return {
            width:'75vw',
            margin:0,
            padding:0
        }
    }
}