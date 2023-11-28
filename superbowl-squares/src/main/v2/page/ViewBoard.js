import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Select from 'react-select'
import { ViewBoardRow } from '../component/row/ViewBoardRow.js';
import { NumberRow } from '../component/row/NumberRow.js';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { topNumbers, sideNumbers, emptyBoard, emptyNameBoard } from '../data/EmptyBoardData.js';

export function ViewBoard() {

    const location = useLocation();

    let [gameNameData, setGameNameData] = useState(emptyNameBoard);
    let [gameData, setGameData] = useState(emptyBoard);
    let [players, setPlayers] = useState([]);
    let playerInitials = [];
    let [selectOptions, setSelectOptions] = useState([]);

    function addItem(item) {
        // setSelectOptions([...selectOptions, item]);
        // let arr = [];
        // selectOptions.forEach(element => arr.push(element));
        // arr.push(item);
        // setSelectOptions(arr);
      }

    let groupName = location.state.groupName;

    useEffect(() => {
        const firestore = getFirestore();
        const docRef = doc(firestore, 'group', groupName);
        async function readGameData() {
            const mySnapshot = await getDoc(docRef);
            if (mySnapshot.exists()) {
                const docData = mySnapshot.data();
                var gameRows = [];
                gameRows.push(docData.gameData.row0);
                gameRows.push(docData.gameData.row1);
                gameRows.push(docData.gameData.row2);
                gameRows.push(docData.gameData.row3);
                gameRows.push(docData.gameData.row4);
                gameRows.push(docData.gameData.row5);
                gameRows.push(docData.gameData.row6);
                gameRows.push(docData.gameData.row7);
                gameRows.push(docData.gameData.row8);
                gameRows.push(docData.gameData.row9);
                setGameData(gameRows);
                var gameNameRows = [];
                gameNameRows.push(docData.gameData.row0_players)
                gameNameRows.push(docData.gameData.row1_players)
                gameNameRows.push(docData.gameData.row2_players)
                gameNameRows.push(docData.gameData.row3_players)
                gameNameRows.push(docData.gameData.row4_players)
                gameNameRows.push(docData.gameData.row5_players)
                gameNameRows.push(docData.gameData.row6_players)
                gameNameRows.push(docData.gameData.row7_players)
                gameNameRows.push(docData.gameData.row8_players)
                gameNameRows.push(docData.gameData.row9_players)
                setGameNameData(gameNameRows);
                // setSelectOptions([]);
                console.log("docData: " + docData.players)
                const dataPlayers = await docData.players;
                setPlayers(dataPlayers);
                // console.log("test1")
                // console.log("players2:" + players2);
                // console.log("test2");
                // setPlayers(players2);
                // playerstest = players2;
                console.log("players:" + players);
                players = dataPlayers;
                console.log("players2: " + players)
                console.log("players0: " + players[0].initials);
                players.forEach(element => console.log("initials: " + element.initials + ", name: " + element.name));
                // selectOptions = [];
                players.forEach(element => selectOptions.push({value: element.name, label: element.initials}));
                console.log("selectOptions: " + selectOptions);
                // console.log("Test initials: " + playerstest[0][1].initials);
                // playerInitials = [];
                // playerstest[0].forEach(element => playerInitials.push(element.initials));
                // console.log("initials arr: " + playerInitials);
                // selectOptions = [];
                // for (let i = 0; i < players.length; i++) {
                //     addItem({value: "test" + i, label: players[i].initials});
                // }
                // console.log("selectOptions: " + selectOptions[0].value);
                // selectOptions.forEach(element => console.log("value: " + element.value + ", label: " + element.label));
            };
        };
        readGameData();
    }, []);

    let navigate = useNavigate();
    const claimSquares = () => { 
        navigate('/claim-squares', { replace: true, state: {
            groupName: groupName
        } });
    }

    // let selectOptions2 = [
    //     {value: 1, label: "1"}
    // ];
    // selectOptions.forEach(element => selectOptions2.push(element.value));
    

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
                        <Container style={{'padding':0, 'margin':0}}>
                            <Row style={gray()}>
                                <Table style={{'padding':0, 'margin':0}}>
                                    <tbody>
                                        <NumberRow numbers={topNumbers}/>
                                        <ViewBoardRow number={sideNumbers[0]} active={gameData[0]} text={gameNameData[0]}/>
                                        <ViewBoardRow number={sideNumbers[1]} active={gameData[1]} text={gameNameData[1]}/>
                                        <ViewBoardRow number={sideNumbers[2]} active={gameData[2]} text={gameNameData[2]}/>
                                        <ViewBoardRow number={sideNumbers[3]} active={gameData[3]} text={gameNameData[3]}/>
                                        <ViewBoardRow number={sideNumbers[4]} active={gameData[4]} text={gameNameData[4]}/>
                                        <ViewBoardRow number={sideNumbers[5]} active={gameData[5]} text={gameNameData[5]}/>
                                        <ViewBoardRow number={sideNumbers[6]} active={gameData[6]} text={gameNameData[6]}/>
                                        <ViewBoardRow number={sideNumbers[7]} active={gameData[7]} text={gameNameData[7]}/>
                                        <ViewBoardRow number={sideNumbers[8]} active={gameData[8]} text={gameNameData[8]}/>
                                        <ViewBoardRow number={sideNumbers[9]} active={gameData[9]} text={gameNameData[9]}/>
                                    </tbody>
                                </Table>
                            </Row>
                            <Row style={pad()}>
                                <Col style={{'padding':0, 'margin':0}}>
                                    <Row style={{'padding':0, 'margin':0}}>
                                        {/* <Form.Select options={selectOptions}>
                                            <option>Select a User</option>
                                            <option value="1">BC</option>
                                            <option value="2">ET</option>
                                            <option value="3">KL</option>
                                        </Form.Select> */}
                                        <Select style={{'padding':0, 'margin':0}} options={selectOptions}/>
                                    </Row>
                                </Col>
                                <Col style={center()}>
                                    <Row style={center()}>
                                        <p>Group Name: {groupName}</p>
                                    </Row>
                                </Col>
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
                </Row>
            </Row>
        </Container>
    );

    function gray() {
        return {
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            backgroundColor: 'gray', 
            color: 'black',
            padding: 15
        }
    }

    function pad() {
        return {
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            paddingTop: 15,
            paddingBottom: 15
        }
    }
    
    function center() {
        return {
            display: 'flex', 
            justifyContent: 'center',
            textAlign: 'center',
            alignItems: 'center'
        }
    }
    
    function black() {
        return {
            backgroundColor: 'black',
            border: 'black',
            padding: 20,
            width: '100%'
        }
    }

    function fullHeight() {
        return {
            height: '85vh',
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center'
        }
    }
}