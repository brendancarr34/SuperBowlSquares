import React, {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { ViewBoardRow } from './ViewBoardRow.js';
import { NumberRow } from '../NumberRow.js';
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";

export function ViewBoard() {

    const topNumbers = ['?', '?', '?', '?', '?', '?', '?', '?', '?', '?'];
    const sideNumbers = ['?', '?', '?', '?', '?', '?', '?', '?', '?', '?'];
    const empty_row = [false, false,false, false,false, false,false, false,false, false];
    const empty_board = [
        empty_row, empty_row, 
        empty_row, empty_row, 
        empty_row, empty_row,
        empty_row, empty_row, 
        empty_row, empty_row
    ];

    let [data, setData] = useState(empty_board);

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
                }
                setData(gameData);
            }
        }
        readGameData();
    }, [])

    let navigate = useNavigate();
    const claimSquares = () => { 
        navigate('/claim-squares', { replace: true });
    }

    return (
        <Container>
            <Row style={fullHeight()}>
                <Row>
                    <br/>
                </Row>
                <Row>
                    <Col style={center()}>
                        <h1 style={{'padding':15}}>Super Bowl Squares</h1>
                    </Col>
                </Row>
                <Row>
                    <Col/>
                    <Col/>
                    <Col >
                        <Container>
                            <Row style={gray()}>
                                <Table style={{'padding':0, 'margin':0}}>
                                    <tbody>
                                        <NumberRow numbers={topNumbers}/>
                                        <ViewBoardRow number={sideNumbers[0]} active={data[0]}/>
                                        <ViewBoardRow number={sideNumbers[1]} active={data[1]}/>
                                        <ViewBoardRow number={sideNumbers[2]} active={data[2]}/>
                                        <ViewBoardRow number={sideNumbers[3]} active={data[3]}/>
                                        <ViewBoardRow number={sideNumbers[4]} active={data[4]}/>
                                        <ViewBoardRow number={sideNumbers[5]} active={data[5]}/>
                                        <ViewBoardRow number={sideNumbers[6]} active={data[6]}/>
                                        <ViewBoardRow number={sideNumbers[7]} active={data[7]}/>
                                        <ViewBoardRow number={sideNumbers[8]} active={data[8]}/>
                                        <ViewBoardRow number={sideNumbers[9]} active={data[9]}/>
                                    </tbody>
                                </Table>
                            </Row>
                            <Row>
                                <br/>
                            </Row>
                            <Row>
                                <Button style={black()} onClick={claimSquares}>
                                        Claim Squares
                                </Button>
                            </Row>
                        </Container>
                    </Col>
                    <Col/>
                    <Col/>
                    <Row>
                        <br/>
                        <p style={{color:'black'}}>
                            {data}
                        </p>
                    </Row>
                </Row>
            </Row>
        </Container>

    );

    function gray() {
        return {
            display: 'flex', 
            'justifyContent': 'center', 
            'alignItems': 'center', 
            backgroundColor: 'gray', 
            color: 'black',
            padding: 15
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
            'border':'black',
            padding: 20,
            width:'100%'
        }
    }

    function fullHeight() {
        return {
            height:'85vh',
            display: 'flex', 
            'justifyContent': 'center', 
            'alignItems': 'center'
        }
    }
}