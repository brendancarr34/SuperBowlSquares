import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import axios from 'axios';
import { api_url} from '../../../config.js';

import { LedgerEditor } from './components/LedgerEditor';

export function Ledger() {

    const [isLoading, setIsLoading] = useState(true);

    const [successSaving, setSuccessSaving] = useState(false);

    const location = useLocation();
    let groupName =  location.state.groupName;

    let navigate = useNavigate(); 

    const handleGoBack = () => {
        // TODO - pass back updated group info 
        // (should pass back and forth as much as possible to prevent re-loading from db everytime)
        navigate('/edit-group-preferences', {
          replace: true,
          state: { groupName: groupName }
        });
    };

    const [playerData, setPlayerData] = useState([]);

    const updateItems = (newItems) => {
        setPlayerData(newItems);
      };

      useEffect(() => {
        if (isLoading) {  // Only fetch once when loading is true
            fetchAllPlayers();
        }
    }, [isLoading]); // Use isLoading as the dependency here

    const extractInitials = (str) => {
        const match = str.match(/\((\w{1,3})\)/);
        return match ? match[1] : null; // Returns the initials or null if not found
      };
  
    const fetchAllPlayers = async () => {
        let playerList;
        let ledger;
        let mergedList;
        try {
            const url = api_url + 'api/game/' + groupName;
            const response = await axios.get(url);
            playerList = response.data.players;
            if (response.data.ledger) {
                ledger = response.data.ledger;
            }

            mergedList = playerList.map(player => {
                let ledgerEntry;
                if (ledger) {
                    // console.log(ledger);
                    ledgerEntry = ledger.find(entry => extractInitials(entry.label) === player.initials) || { paid: false, notes: "" };
                }
                
                return {
                    label: `${player.playerName} (${player.initials})`,
                    squares: player.squaresClaimed,
                    paid: ledgerEntry ? ledgerEntry.paid : false,
                    notes: ledgerEntry ? ledgerEntry.notes : ''
                };
            });
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }

        setPlayerData(mergedList);

        setIsLoading(false);
    }

    const handlePostRequest = () => {
        const data = playerData; // Your array data
    
        axios.post(api_url + 'api/game/api/ledger/' + groupName, data, {
          headers: {
            'Content-Type': 'application/json',
          }
        })
          .then(res => {
            // setResponse(res.data); // Handle successful response
            console.log(res.data);
            setSuccessSaving(true);
          })
          .catch(err => {
            // setError(err); // Handle error
            console.log(err);
          });
      };

    return (
        <Container>
            <Row style={height85()}>
                {/* <Row style={spacer()}/> */}
                <Row style={pageTitleSection()}>
                    <Col>
                        <h1 style={center()}>
                            Ledger
                        </h1>
                    </Col>
                </Row>
                <Row style={middleSection()}>
                    <LedgerEditor items={playerData} updateItems={updateItems}/>
                </Row>
                <Row style={buttonSection()}>
                <Row style={{padding:0, margin:0}}>
                        <Col style={center()}>
                            <Button 
                                style={blackButton()} 
                                onClick={handlePostRequest}
                                >
                                    Save Changes
                            </Button>
                        </Col>
                    </Row>
                    <Row style={{padding:0, margin:0}}>
                        <Col style={center()}>
                            <Button 
                                style={backButton()} 
                                onClick={handleGoBack}>
                                    Go Back
                            </Button>
                        </Col>
                    </Row>
                </Row>
            </Row>

            <Modal
                show={successSaving} 
                onHide={() => {setSuccessSaving(false)}} 
                centered
                style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
                <div style={{width:"50%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Modal.Body >
                        Success
                    </Modal.Body>
                </div>
            </Modal>
            
        </Container>
    )

    function center() {
        return {
            textAlign: 'center',
            justifyContent: 'center'
        }
    }

    function blackButton() {
        return {
            backgroundColor: "#4682b4",
            border: '#4682b4',
            width: '75vw',
            padding: 15
        }
    }

    function backButton() {
        return {
            backgroundColor: "lightgray",
            color: 'black',
            border: 'black',
            width: '75vw',
            padding: 5,
            margin: 0
        }
    }

    function buttonSection() {
        return {
            height: '14vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin:0
        }
    }

    function pageTitleSection() {
        return {
            height: '9vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }
    }

    function spacer() {
        return {
            height: '4vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }
    }

    function middleSection() {
        return {
            height: '58vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding:0,
            margin:0
        }
    }

    function height85() {
        return {
            height: '85vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
    }

}