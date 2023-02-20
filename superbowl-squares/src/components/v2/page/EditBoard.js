import React, {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { EditBoardRow } from '../component/EditBoardRow.js';
import { NumberRow } from '../component/NumberRow.js';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { topNumbers, sideNumbers, emptyBoard } from '../data/EmptyBoardData.js';

export function EditBoard() {
    let [boardData, setBoardData] = useState(emptyBoard);

    useEffect(() => {
        const firestore = getFirestore();
        const docRef = doc(firestore, 'group/group1');
        async function readGameData() {
            const mySnapshot = await getDoc(docRef);
            if (mySnapshot.exists()) {
                const docData = mySnapshot.data();
                const row0 = docData.row0;
                const row1 = docData.row1;
                const row2 = docData.row2;
                const row3 = docData.row3;
                const row4 = docData.row4;
                const row5 = docData.row5;
                const row6 = docData.row6;
                const row7 = docData.row7;
                const row8 = docData.row8;
                const row9 = docData.row9;
                var game = [row0, row1, row2, row3, row4, row5, row6, row7, row8, row9];
                var gameData = [];
    
                for (let i in game) {
                    var row = game[i];
                    var zero = row.charAt(1) === '1';
                    var one = row.charAt(3) === '1';
                    var two = row.charAt(5) === '1';
                    var three = row.charAt(7) === '1';
                    var four = row.charAt(9) === '1';
                    var five = row.charAt(11) === '1';
                    var six = row.charAt(13) === '1';
                    var seven = row.charAt(15) === '1';
                    var eight = row.charAt(17) === '1';
                    var nine = row.charAt(19) === '1';
                    gameData.push([zero, one, two, three, four, five, six, seven, eight, nine]);
                };
                setBoardData(gameData);
            };
        };
        readGameData();
    }, []);

    let navigate = useNavigate();
    const viewSquares = () => { 
        navigate('/super-bowl-squares', { replace: true });
    };

    return (
        <Container>
            <Row style={fullHeight()}>
                <Row>
                    <Col style={center()}>
                        <h1 style={{'padding':15}}>Claim Squares</h1>
                    </Col>
                </Row>
                <Row>
                    <Col/>
                    <Col/>
                    <Col style={board()}>
                        <Table style={{'padding':0, 'margin':0}}>
                            <tbody>
                                <NumberRow numbers={topNumbers}/>
                                <p/>
                                <EditBoardRow number={sideNumbers[0]} active={boardData[0]}/>
                                <EditBoardRow number={sideNumbers[1]} active={boardData[1]}/>
                                <EditBoardRow number={sideNumbers[2]} active={boardData[2]}/>
                                <EditBoardRow number={sideNumbers[3]} active={boardData[3]}/>
                                <EditBoardRow number={sideNumbers[4]} active={boardData[4]}/>
                                <EditBoardRow number={sideNumbers[5]} active={boardData[5]}/>
                                <EditBoardRow number={sideNumbers[6]} active={boardData[6]}/>
                                <EditBoardRow number={sideNumbers[7]} active={boardData[7]}/>
                                <EditBoardRow number={sideNumbers[8]} active={boardData[8]}/>
                                <EditBoardRow number={sideNumbers[9]} active={boardData[9]}/>
                            </tbody>
                        </Table>
                    </Col>
                    <Col/>
                    <Col/>
                </Row>
                <Row>
                    <br/>
                </Row>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Control placeholder="First & Last Name" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control placeholder="Initials" />
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col>
                        <Button disabled={false} style={black()} onClick={viewSquares}>
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Row>
        </Container>
    );
};

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

function fullHeight() {
    return {
        height:'85vh',
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center'
    }
}

function center() {
    return {
        textAlign:'center',
        width:'100%'
    }
}

function black() {
    return {
        backgroundColor:"black",
        border:'black',
        padding: 0,
        width:'100%',
        height:'85%'
    }
}