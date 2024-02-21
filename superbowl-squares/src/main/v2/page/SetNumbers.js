import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useNavigate, useLocation } from "react-router-dom";
import NumberInputBoxes from '../component/NumberInputBoxes';

export function SetNumbers() {

    const location = useLocation();
    let groupName =  location.state.groupName;

    return (
        <Container>
            <Row style={fullHeight()}>
                <Col style={center()}>
                    <Row>
                        <Col>
                            <h1>
                                Set Numbers
                            </h1>
                            <p>
                                group: {groupName}
                            </p>
                            <br/>
                            <br/>
                            <NumberInputBoxes/>
                            <br/>
                        </Col>
                    </Row>
                    <Row>
                        <br/>
                        <br/>
                        <br/>
                    </Row>
                    <Row>
                        <Col>
                            <Button style={blackButton()}>
                                Set Numbers
                            </Button>
                        </Col>
                    </Row>
                </Col>
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
            // height: '30vh'
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
}