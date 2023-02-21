import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { readSingleDocument } from '../../../firebase/firebase';

export function NotFound() {

    // const [data3,setData3] = useState("");
    // readSingleDocument().then(result => setData3(result));

    return (
        <Container>
            <Row style={fullHeight()}>
                <Col style={center()}>
                    <p>
                        bad link. go back.
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