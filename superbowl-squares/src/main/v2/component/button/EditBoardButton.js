import React, { useState } from 'react';
import { MDBBtn } from "mdb-react-ui-kit";
import '../../style/Button.css'

export function EditBoardButton(props) {
    
    const id = props.id;
    const [active, setActive] = useState(false);
    const taken = props.taken;
    const [text, setText] = useState("X");
    
    const handleClick = () => {
        if (!taken) {
            setActive(!active);
            !active ? setText("🏈") : setText("X");
            props.isActive(id, !active);
            console.log("id: " + id + ", active: " + !active);
        }
    };

    if (taken) {
        return (
            <MDBBtn disabled className="square-md" onClick={handleClick} style={editBoardButtonStyle()}>
                {text}
            </MDBBtn>
        );
    }
    
    return (
        <MDBBtn className="square-md" onClick={handleClick} style={editBoardButtonStyle()}>
            {text}
        </MDBBtn>
    );

    function editBoardButtonStyle() {
        return {  
            backgroundColor: taken ? "red" : active ? "green" : "white" ,
            color: taken ? "red" : active ? "green" : "white",
            fontSize: 20,
            padding: 0,
            margin: 0,
            border: '1px solid black'
        };
    } 
}