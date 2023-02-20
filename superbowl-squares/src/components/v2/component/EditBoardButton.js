import React, { useState } from 'react';
import { MDBBtn } from "mdb-react-ui-kit";
import '../style/Button.css'

export function EditBoardButton(props) {
    
    const [active, setActive] = useState(false);
    const taken = props.taken;
    const [text, setText] = useState("X");
    
    const handleClick = () => {
        if (!taken) {
            setActive(!active);
            !active ? setText("🏈") : setText("X")
        }
    };
    const colorOnClick = {  
        backgroundColor: taken ? "red" : active ? "green" : "white" ,
        // backgroundColor: active ? "green" : "white" ,
        'color': taken ? "red" : active ? "green" : "white",
        'font-size': 20,
        'padding':0,
        'margin':0,
        'border':'1px solid black'
    };

    if (taken) {
        return (
            <MDBBtn disabled className="square-md" onClick={handleClick} style={colorOnClick}>
                {text}
            </MDBBtn>
        );
    }
    
    return (
        <MDBBtn className="square-md" onClick={handleClick} style={colorOnClick}>
            {text}
        </MDBBtn>
    );
}