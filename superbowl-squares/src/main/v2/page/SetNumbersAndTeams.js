import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate, useLocation } from "react-router-dom";

export function SetNumbersAndTeams() {

    const location = useLocation();
    let groupName =  location.state.groupName;

    return (
        <Container>
            <Row style={fullHeight()}>
                <Col style={center()}>
                    <p>
                        SetNumbersAndTeams - {groupName}
                    </p>
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
            height: '30vh'
        }
    }
}