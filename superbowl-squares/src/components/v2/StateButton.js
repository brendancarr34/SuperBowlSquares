import React, { useState } from 'react';
import { MDBBtn } from "mdb-react-ui-kit";
import './StateButton.css'

export function StateButton() {
    
    const [active, setActive] = useState(false);
    const [text, setText] = useState("X");
    
    const handleClick = () => {
        setActive(!active);
        !active ? setText("🏈") : setText("X")
    };
    const colorOnClick = {  
        backgroundColor: active ? "green" : "white" ,
        'color': active ? "green" : "white",
        'font-size': 20,
        'padding':0,
        'margin':0,
        'border':'1px solid black'
    };
    
    return (
        <MDBBtn className="square-md" onClick={handleClick}
                style={colorOnClick}>
            {text}
        </MDBBtn>
    );
}