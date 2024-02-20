import React, { useState } from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';

export function ViewBoardButton3(props) {

    const active = props.active;
    const text = props.text;
    const playerNames = props.playerNames;
    const selectedOption = props.selectedOption;
 
    const hoverName = playerNames[text];

    return (
        <div className="button-container">
            <MDBBtn disabled className="square-md" style={viewBoardButtonStyle()}>
                {text}
                <span className="hover-text" style={nullify()}>{text ? hoverName : null}</span>
            </MDBBtn>
        </div>

    )

    function viewBoardButtonStyle() {  
        return {
            backgroundColor: (text == selectedOption) ? 'blue' : active ? "red" : "white" ,
            color: active ? "black" : "white",
            fontSize: 13,
            padding: 0,
            margin: 0,
            border: '1px solid black',
            textAlign: 'center'
        }
    };

    function nullify() {
        if (!text) {
            return {
                display: 'none'
            }
        }
    }
}

