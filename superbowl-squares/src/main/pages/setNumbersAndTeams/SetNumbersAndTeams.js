import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useNavigate, useLocation } from "react-router-dom";
import { fullHeight } from '../../common/style/CommonStyles';

export function SetNumbersAndTeams() {

    const location = useLocation();
    let groupName =  location.state.groupName;

    let navigate = useNavigate(); 
    const handleSetNumbers = () => {
        navigate('/set-numbers', { 
            replace: true, 
            state: {
                groupName: groupName
            } 
        });
    }

    const handleSetTeams = () => {
        navigate('/set-teams', { 
            replace: true, 
            state: {
                groupName: groupName
            } 
        });
    }

    const handleGoBackClick = () => {
        navigate('/super-bowl-squares', {
            replace: true,
            state: { groupName: groupName }
          });
    }

    return (
        <Container>
            <Row style={fullHeight()}>
                <Col style={center()}>
                    <Row style={center2()}>
                        <h1>
                            Set Numbers & Teams
                        </h1>
                        <p>
                            group: {groupName}
                        </p>
                    </Row>
                    <Row>
                        <Col>
                            <Button style={blackButton()} onClick={handleSetTeams}>
                                Set Teams
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <br/>
                    </Row>
                    <Row>
                        <Col>
                            <Button style={blackButton()} onClick={handleSetNumbers}>
                                Set Numbers
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <br/>
                    </Row>
                    <Row>
                        <Col>
                            <Button style={grayButton()} onClick={handleGoBackClick}>
                                Cancel
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )

    function center() {
        return {
            textAlign:'center',
            height: '30vh'
        }
    }

    function center2() {
        return {
            textAlign:'center',
            height: '20vh'
        }
    }

    function blackButton() {
        return {
            backgroundColor: 'black',
            padding: 20,
            border: 'black',
            width: 155
        }
    }

    function grayButton() {
        return {
            backgroundColor: 'lightgray',
            color: 'black',
            padding: 20,
            border: 'black',
            width: 155
        }
    }
}