import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select'
import { ViewBoardRow3} from './components/ViewBoardRow3.js'
import { NumberRow } from './components/NumberRow.js';
import { emptyTopNumbers, emptySideNumbers, emptyBoard, emptyNameBoard } from '../../common/data/EmptyBoardData.js';
import axios from 'axios';
import { api_url } from '../../../config.js';
import { VerticalTextComponent } from './components/VerticalTextComponent.js';
import { fullHeight } from '../../common/style/CommonStyles.js';
import '../../common/style/Select.css'
import VenmoPaymentButton from '../editBoard/components/VenmoPaymentButton.js';

export function ViewBoard() {

    let navigate = useNavigate();
    const location = useLocation();

    let groupName = null;
    try {
        groupName = location.state.groupName;
    }
    catch (error) {
        console.log('groupName is null');
    }

    const [gameNameData, setGameNameData] = useState(emptyNameBoard);
    const [gameData, setGameData] = useState(emptyBoard);
    const [players, setPlayers] = useState({});
    const [selectOptions, setSelectOptions] = useState([]);
    const [allSquaresClaimed, setAllSquaresClaimed] = useState(false);
    const [topNumbers, setTopNumbers] = useState(emptyTopNumbers);
    const [sideNumbers, setSideNumbers] = useState(emptySideNumbers);
    const [topTeam, setTopTeam] = useState('');
    const [sideTeam, setSideTeam] = useState('');
    const [selectedOption, setSelectedOption] = useState("None");
    const [showModal, setShowModal] = useState(false);
    const [colorData, setColorData] = useState([]);
    const [showVenmoModal, setShowVenmoModal] = useState(false);
    const [totalPayment, setTotalPayment] = useState('');
    const [clickedButtons, setClickedButtons] = useState([]);
    const [venmoUsername, setVenmoUsername] = useState('');

    // Function to update select options
    const updateSelectOptions = (playerData) => {
        const newOptions = []; // Start with 'none' option
        const initialsMap = {};

        // Add new options
        playerData.forEach(map => {
            const { initials, playerName } = map;
            initialsMap[initials] = playerName;
            newOptions.push({ value: initials, label: `${initials} - ${playerName}` });
        });

        // Alphabetically sort options except 'none' option
        newOptions.sort((a, b) => a.label.localeCompare(b.label));

        const options = [{ value: 'None', label: 'None' }];
        newOptions.forEach(map => {
            const { value, label} = map;
            options.push({ value: value, label: label});
        })

        setPlayers(initialsMap);
        setSelectOptions(options);
    };

    const copyToClipboard = () => {
        // const gameLink = window.location.href;
        const gameLink = 'https://brendancarr34.github.io/SuperBowlSquares/#/join-group/' + groupName
    
        // Create a temporary textarea element
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = gameLink;
    
        // Append the textarea to the document body
        document.body.appendChild(tempTextArea);
    
        // Select the content of the textarea
        tempTextArea.select();
        
        // Copy the selected text
        document.execCommand('copy');
    
        // Remove the temporary textarea from the document body
        document.body.removeChild(tempTextArea);

        toggleModal();
    };

    const openMenu = () => {
        
        navigate('/create-group-preferences', 
        {replace: true, 
            state: {
                groupName: groupName
            } });
    }
    
    const toggleModal = () => {
        setShowModal(!showModal);
    };

    useEffect(() => {
        if (groupName == null) {
            navigate('/', { replace :
                true
            });
        }

        if (JSON.parse(window.sessionStorage.getItem('showVenmoModal'))) {
            setShowVenmoModal(true);
            setTotalPayment(location.state.totalPayment);
            setClickedButtons(location.state.clickedButtons);
            setVenmoUsername(location.state.venmoUsername);
        }

        // Function to fetch data from the API
        const fetchData = async () => {
            try {
                const url = api_url + 'api/game/' + groupName;
                const response = await axios.get(url);

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

                // Update select options when data is fetched
                updateSelectOptions(response.data.players);

                const allSquaresClaimedResponse = response.data.allSquaresClaimed;
                setAllSquaresClaimed(allSquaresClaimedResponse);

                const topNumbersResponse = response.data.topNumbers;
                setTopNumbers(topNumbersResponse);

                const sideNumbersResponse = response.data.sideNumbers;
                setSideNumbers(sideNumbersResponse);

                const topTeamResponse = response.data.teams.top;
                setTopTeam(topTeamResponse);

                const sideTeamResponse = response.data.teams.side;
                setSideTeam(sideTeamResponse);

                const existingColorData = response.data.colorData;
                setColorData(existingColorData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetch function
        fetchData();
    }, []);

    const claimSquares = () => { 
        navigate('/claim-squares', { 
            replace: true, 
            state: {
                groupName: groupName
            } 
        });
    }

    const setNumbersAndTeams = () => {
        navigate('/set-number-and-teams', { 
            replace: true, 
            state: {
                groupName: groupName
            } 
        });
    }

    const handleInitialSelect = selectedOption => {
        setSelectedOption(selectedOption.value);
    }

    const updateSelectedOption = (option) => {
        if (selectedOption == option) {
            setSelectedOption(option);
        }
        else if (selectedOption != 'None' ) {
            setSelectedOption('None');
        }
        else {
            setSelectedOption(option);
        }
    };

    return (
        <Container>
            <Row style={fullHeight()}>
                <Row style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Col xs={12} style={center()}>
                        <h1 style={{'paddingTop':30}}>Super Bowl Squares</h1>
                        <p>groupName: {groupName}</p>
                    </Col>
                </Row>
                <Row style={center()}>
                    {/* Top Team */}
                    <Row style={center5()}>
                        <Col xs={1} style={{'padding':0, 'margin':0}}>
                            <VerticalTextComponent style={{'padding':0, 'margin':0}} text={' '} />
                        </Col>
                        <Col xs={10} sm={8} md={6} lg={4} style={center2()}>
                            <p style={{'margin':5}}>{topTeam}</p>
                        </Col>
                        <Col xs={1} style={{'padding':0, 'margin':0}}>
                            <VerticalTextComponent style={{'padding':0, 'margin':0}} text={' '} />
                        </Col>
                    </Row>
                    {/* Game Board */}
                    <Row style={center5()}>
                        <Col xs={1} style={{'padding':0, 'margin':0}}>
                            <VerticalTextComponent style={{'padding':0, 'margin':0}} text={sideTeam} />
                        </Col>
                        <Col xs={10} sm={8} md={6} lg={5} style={center3()}>
                            <Container style={{'padding':0, 'margin':0, display: 'inline-block'}}>
                                <Row style={gray()}>
                                    <Col style={{whiteSpace: 'nowrap', display: 'block','padding':0, 'margin':0,}}>
                                        <Table style={{'padding':0, 'margin':0, display: 'inline-block', 'fontSize': '0px'}}>
                                            <tbody style={{'padding':0, 'margin':0, display: 'inline-block', 'fontSize': '0px'}}>
                                                <NumberRow numbers={topNumbers}/>
                                                <ViewBoardRow3 
                                                    number={sideNumbers[0]} 
                                                    active={gameData[0]} 
                                                    text={gameNameData[0]} 
                                                    playerNames={players} 
                                                    selectedOption={selectedOption} 
                                                    allSquaresClaimed={allSquaresClaimed} 
                                                    colorData={colorData}
                                                    updateSelectedOption={updateSelectedOption}/>
                                                <ViewBoardRow3 number={sideNumbers[1]} active={gameData[1]} text={gameNameData[1]} playerNames={players} selectedOption={selectedOption} allSquaresClaimed={allSquaresClaimed} colorData={colorData} updateSelectedOption={updateSelectedOption}/>
                                                <ViewBoardRow3 number={sideNumbers[2]} active={gameData[2]} text={gameNameData[2]} playerNames={players} selectedOption={selectedOption} allSquaresClaimed={allSquaresClaimed} colorData={colorData} updateSelectedOption={updateSelectedOption}/>
                                                <ViewBoardRow3 number={sideNumbers[3]} active={gameData[3]} text={gameNameData[3]} playerNames={players} selectedOption={selectedOption} allSquaresClaimed={allSquaresClaimed} colorData={colorData} updateSelectedOption={updateSelectedOption}/>
                                                <ViewBoardRow3 number={sideNumbers[4]} active={gameData[4]} text={gameNameData[4]} playerNames={players} selectedOption={selectedOption} allSquaresClaimed={allSquaresClaimed} colorData={colorData} updateSelectedOption={updateSelectedOption}/>
                                                <ViewBoardRow3 number={sideNumbers[5]} active={gameData[5]} text={gameNameData[5]} playerNames={players} selectedOption={selectedOption} allSquaresClaimed={allSquaresClaimed} colorData={colorData} updateSelectedOption={updateSelectedOption}/>
                                                <ViewBoardRow3 number={sideNumbers[6]} active={gameData[6]} text={gameNameData[6]} playerNames={players} selectedOption={selectedOption} allSquaresClaimed={allSquaresClaimed} colorData={colorData} updateSelectedOption={updateSelectedOption}/>
                                                <ViewBoardRow3 number={sideNumbers[7]} active={gameData[7]} text={gameNameData[7]} playerNames={players} selectedOption={selectedOption} allSquaresClaimed={allSquaresClaimed} colorData={colorData} updateSelectedOption={updateSelectedOption}/>
                                                <ViewBoardRow3 number={sideNumbers[8]} active={gameData[8]} text={gameNameData[8]} playerNames={players} selectedOption={selectedOption} allSquaresClaimed={allSquaresClaimed} colorData={colorData} updateSelectedOption={updateSelectedOption}/>
                                                <ViewBoardRow3 number={sideNumbers[9]} active={gameData[9]} text={gameNameData[9]} playerNames={players} selectedOption={selectedOption} allSquaresClaimed={allSquaresClaimed} colorData={colorData} updateSelectedOption={updateSelectedOption}/>
                                            </tbody>
                                        </Table>                                
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                        <Col xs={1} style={{'padding':0, 'margin':0}}>
                            <VerticalTextComponent style={{'padding':0, 'margin':0, color:'white'}} text={'test'} />
                        </Col>
                    </Row>
                    {/* Button Row */}
                    <Row style={center5()}>
                        <Col xs={1} style={{'padding':0, 'margin':0}}>
                            <VerticalTextComponent style={{'padding':0, 'margin':0, color:'white'}} text={' '} />
                        </Col>
                        <Col xs={10} sm={8} md={6} lg={4} style={{'padding':0, 'margin':0}}>
                            <Container style={{'padding':0, 'margin':0}}>
                                <Row style={pad()}>
                                    <Col style={{'height':135, width:'35%'}}>
                                        <Row style={{'padding':0,'paddingBottom':5, 'margin':0, height:'35%'}}>
                                            <Select className="custom-select"
                                                    style={{'padding':0, 'margin':0,}} 
                                                    options={selectOptions} 
                                                    onChange={handleInitialSelect} 
                                                    defaultValue={{ value: 'None', label: null }}
                                                    value={
                                                        selectedOption === 'none' || selectedOption === 'None'
                                                            ? 'None'
                                                            : { value: selectedOption, label: players[selectedOption] }
                                                    }
                                                    isSearchable={false}
                                                    menuPlacement="top"
                                            />
                                        </Row>
                                        <Row style={{'padding':0,'paddingTop':5, 'margin':0, height:'65%'}}>
                                            <Col style={{'padding':0,'paddingRight':5, 'margin':0, height:'100%'}}>
                                                <Button style={grayButton()} onClick={openMenu}>
                                                    Menu
                                                </Button>
                                            </Col>
                                            <Col style={{'padding':0,'paddingLeft':5, 'margin':0, height:'100%'}}>
                                                <Button style={grayButton()} onClick={copyToClipboard}>
                                                    Share Game
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col style={{'height':135, 'paddingLeft':0, width:'65%'}}>
                                        {
                                            !allSquaresClaimed ? 
                                            <Button style={black()} onClick={claimSquares}>
                                                Select Squares
                                            </Button> 
                                            :                         
                                            <Button style={black()} onClick={setNumbersAndTeams}>
                                                Set Numbers & Teams
                                            </Button>
                                        }
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                        <Col xs={1} style={{'padding':0, 'margin':0}}>
                            <VerticalTextComponent style={{'padding':0, 'margin':0, color:'white'}} text={' '} />
                        </Col>
                    </Row>
                </Row>
                <Row>
                    <br/>
                    <br/>
                </Row>
            </Row>

            {/* Modal for Copied Link */}
            <Modal show={showModal} onHide={() => toggleModal(false)}>
                <Modal.Body>Link copied to clipboard.</Modal.Body>
            </Modal>

            {/* Venmo Modal */}
            <Modal show={showVenmoModal} onHide={() => {
                    window.sessionStorage.setItem("showVenmoModal", false);
                    setShowVenmoModal(false);
                }}>
                <Modal.Header closeButton>
                <Modal.Title>Success! 🎉</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You claimed {clickedButtons.length} square{clickedButtons.length > 1 && 's'}!<br/>
                    <br/>
                    Pay for your squares with Venmo?
                </Modal.Body>
                <Modal.Footer>     
                    <VenmoPaymentButton recipient={venmoUsername} amount={totalPayment}/>
                </Modal.Footer>
            </Modal>
        </Container>
    );

    function gray() {
        return {
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            backgroundColor: 'gray', 
            color: 'black',
            padding: 0,
            margin: 0,
            paddingBottom: 15,
            borderRadius: 5
        }
    }

    function pad() {
        return {
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            padding: 0,
            paddingTop: 15,
            // width:'100%'
        }
    }
    
    function center() {
        return {
            textAlign: 'center',
            alignItems: 'center',
            padding:0,
            margin:0,
        }
    }

    function center2() {
        return {
            display: 'flex', 
            justifyContent: 'center',
            textAlign: 'center',
            alignItems: 'center',
            padding:0,
            margin:0,
            flexWrap: 'nowrap'
        }
    }

    function center3() {
        return {
            display: 'flex', 
            justifyContent: 'center',
            textAlign: 'center',
            alignItems: 'center',
            paddingRight:'0px',
            margin:0,
            flexWrap: 'nowrap',
            paddingLeft:0
        }
    }

    function center5() {
        return {
            display: 'flex', 
            justifyContent: 'center',
            textAlign: 'center',
            alignItems: 'center',
            padding:0,
            margin:0,
            flexWrap: 'nowrap',
        }
    }
    
    function black() {
        return {
            backgroundColor: 'black',
            border: 'black',
            padding: 20,
            width: '100%',
            height: '100%'
        }
    }

    function grayButton() {
        return {
            backgroundColor: 'lightgray',
            border: 'gray',
            padding: 5,
            width: '100%',
            color: 'black',
            height: '100%'
        }
    }
}