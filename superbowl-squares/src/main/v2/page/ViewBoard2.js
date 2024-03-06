import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Select from 'react-select'
import { ViewBoardRow2 } from '../component/row/ViewBoardRow2.js';
import { NumberRow } from '../component/row/NumberRow.js';
import { topNumbers, sideNumbers, emptyBoard, emptyNameBoard } from '../data/EmptyBoardData.js';
import axios from 'axios';

export function ViewBoard2() {

    const location = useLocation();
    let groupName = location.state.groupName;

    // const [data, setData] = useState(null);
    const [gameNameData, setGameNameData] = useState(emptyNameBoard);
    const [gameData, setGameData] = useState(emptyBoard);
    let [players, setPlayers] = useState({});
    const [selectOptions, setSelectOptions] = useState([]);

    useEffect(() => {
        // Function to fetch data from the API
        const fetchData = async () => {
        try {
            // const response = await axios.get('http://localhost:3001/api/game/' + groupName);
            const response = await axios.get('http://' + host + ':3001/api/game/' + groupName);

            // setData(response.data);

            var gameRows = [];
            gameRows.push(response.data.gameData.row0);
            gameRows.push(response.data.gameData.row1);
            gameRows.push(response.data.gameData.row2);
            gameRows.push(response.data.gameData.row3);
            gameRows.push(response.data.gameData.row4);
            gameRows.push(response.data.gameData.row5);
            gameRows.push(response.data.gameData.row6);
            gameRows.push(response.data.gameData.row7);
            gameRows.push(response.data.gameData.row8);
            gameRows.push(response.data.gameData.row9);
            setGameData(gameRows);

            var gameNameRows = [];
            gameNameRows.push(response.data.gameData.row0_players)
            gameNameRows.push(response.data.gameData.row1_players)
            gameNameRows.push(response.data.gameData.row2_players)
            gameNameRows.push(response.data.gameData.row3_players)
            gameNameRows.push(response.data.gameData.row4_players)
            gameNameRows.push(response.data.gameData.row5_players)
            gameNameRows.push(response.data.gameData.row6_players)
            gameNameRows.push(response.data.gameData.row7_players)
            gameNameRows.push(response.data.gameData.row8_players)
            gameNameRows.push(response.data.gameData.row9_players)
            setGameNameData(gameNameRows);

            const playerData = response.data.players;
            
            const initialsMap = {};
            const options = [];
            playerData.forEach(map => {
                // Extract 'initials' and 'playerName' from each map
                const { initials, playerName } = map;
                // Add the entry to the initialsMap
                initialsMap[initials] = playerName;
                options.push({value: initials, label: `${initials} - ${playerName}`});
            });
            setPlayers(initialsMap);
            setSelectOptions(options);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

        // Call the fetch function
        fetchData();
    }, []);

    let navigate = useNavigate();
    const claimSquares = () => { 
        navigate('/claim-squares', { replace: true, state: {
            groupName: groupName
        } });
    }  

    const handleInitialSelect = async () => {

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
                        <Container style={{'padding':0, 'margin':0}}>
                            <Row style={gray()}>
                                <Table style={{'padding':0, 'margin':0}}>
                                    <tbody>
                                        <NumberRow numbers={topNumbers}/>
                                        <ViewBoardRow2 number={sideNumbers[0]} active={gameData[0]} text={gameNameData[0]} playerNames={players}/>
                                        <ViewBoardRow2 number={sideNumbers[1]} active={gameData[1]} text={gameNameData[1]} playerNames={players}/>
                                        <ViewBoardRow2 number={sideNumbers[2]} active={gameData[2]} text={gameNameData[2]} playerNames={players}/>
                                        <ViewBoardRow2 number={sideNumbers[3]} active={gameData[3]} text={gameNameData[3]} playerNames={players}/>
                                        <ViewBoardRow2 number={sideNumbers[4]} active={gameData[4]} text={gameNameData[4]} playerNames={players}/>
                                        <ViewBoardRow2 number={sideNumbers[5]} active={gameData[5]} text={gameNameData[5]} playerNames={players}/>
                                        <ViewBoardRow2 number={sideNumbers[6]} active={gameData[6]} text={gameNameData[6]} playerNames={players}/>
                                        <ViewBoardRow2 number={sideNumbers[7]} active={gameData[7]} text={gameNameData[7]} playerNames={players}/>
                                        <ViewBoardRow2 number={sideNumbers[8]} active={gameData[8]} text={gameNameData[8]} playerNames={players}/>
                                        <ViewBoardRow2 number={sideNumbers[9]} active={gameData[9]} text={gameNameData[9]} playerNames={players}/>
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
                                        <Select style={{'padding':0, 'margin':0}} options={selectOptions} onChange={handleInitialSelect}/>
                                    </Row>
                                </Col>
                                <Col style={center2()}>
                                    <Row style={center2()}>
                                        <p style={center2()}>Group Name: {groupName}</p>
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

    function center2() {
        return {
            // display: 'flex', 
            // justifyContent: 'center',
            // textAlign: 'center',
            // alignItems: 'center'
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