// CreateGroupPreferences.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import AutoSetNumbers from '../component/AutoSetNumbers';
import axios from 'axios';
import { api_url} from '../../../config';
import AddPassword from '../component/AddPassword';
import AutoSetTeams from '../component/AutoSetTeams';

export function CreateGroupPreferences() {

    const location = useLocation();
    const groupName = location.state.groupName;

    const navigate = useNavigate();

    const [autoSetNumbers, setAutoSetNumbers] = useState(false);
    const [addGroupPassword, setAddGroupPassword] = useState(false);
    const [autoSetTeams, setAutoSetTeams] = useState(false);
    const [groupPassword, setGroupPassword] = useState("");
    const [team1, setTeam1] = useState("");
    const [team2, setTeam2] = useState("");

    // Function to handle AutoSetNumbers checkbox change
    const handleAutoSetNumberChange = (newValue) => {
        setAutoSetNumbers(newValue);
    };

    // Function to handle AutoSetTeams checkbox change
    const handleAutoSetTeamsChange = (newValue) => {
        setAutoSetTeams(newValue);
    }

    // Function to handle add password checkbox change
    const handleAddPasswordToggleChange = (newValue) => {
        setAddGroupPassword(newValue);
    }

    const handleSetGroupPassword = (newValue) => {
        setGroupPassword(newValue);
    }

    const handleSetTeam1 = (newValue) => {
        setTeam1(newValue);
    }

    const handleSetTeam2 = (newValue) => {
        setTeam2(newValue);
    }

    const handleButtonClick = async () => {
        try {
            console.log(
                "autoSetNumbers: " + autoSetNumbers + ",\n" +
                "addGroupPassword: " + addGroupPassword + ",\n" + 
                "autoSetTeams: " + autoSetTeams + ",\n" +
                "groupPassword: " + groupPassword + ",\n" +
                "team1: " + team1 + ",\n" +
                "team2: " + team2
            )
            // Make the POST request to the API endpoint
            const url = api_url + 'api/game/api/setPreferences/' + groupName;
            const response = await axios.post(url, {
                autoSetNumbers: autoSetNumbers
            });

            // Handle success response
            console.log(response.data.message);
        } catch (error) {
            // Handle error
            console.error('Error:', error.response.data.error);
        }

        navigate('/super-bowl-squares', { state: { groupName: groupName } });
    }

    return (
        <Container>
            <Row style={fullHeight()}>
                <Row>
                    <Col style={center()}>
                        <h1>Set Group Preferences</h1>
                        <p>groupName: {groupName}</p>
                    </Col>
                </Row>
                <Row>
                    <Col style={center()}>
                        {/* Pass autoSetNumbers state and handleToggleChange function as props */}
                        <AutoSetNumbers autoSetNumbers={autoSetNumbers} handleToggleChange={handleAutoSetNumberChange} />
                    </Col>
                </Row>
                <Row>
                    <Col style={center()}>
                        <AddPassword addGroupPassword={addGroupPassword} handleAddPasswordToggleChange={handleAddPasswordToggleChange} handleSetGroupPassword={handleSetGroupPassword}/>
                    </Col>
                </Row>
                <Row>
                    <Col style={center()}>
                        <AutoSetTeams autoSetTeams={autoSetTeams} handleAutoSetTeamsChange={handleAutoSetTeamsChange} handleSetTeam1={handleSetTeam1} handleSetTeam2={handleSetTeam2}/>
                    </Col>
                </Row>
                <Row>
                    <Col style={center()}>
                        <Button style={blackButton()} onClick={handleButtonClick}>
                            Start a New Group
                        </Button>
                    </Col>
                </Row>
            </Row>
        </Container>
    )

    function fullHeight() {
        return {
            height: '90vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
    }

    function center() {
        return {
            textAlign: 'center',
            margin: 0,
            padding: 0
        }
    }

    function blackButton() {
        return {
            backgroundColor: "black",
            border: 'black',
            width: '75vw',
            padding: 20
        }
    }
}
