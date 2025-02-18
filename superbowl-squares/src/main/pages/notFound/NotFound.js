import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export function NotFound() {

    return (
        <Container>
            <Row style={fullHeight()}>
                <Col style={center()}>
                    <p>
                        bad link. go back.
                    </p>
                    {/* TODO - Add a Button to go Home */}
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