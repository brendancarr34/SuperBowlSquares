import React, { useState } from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';

export function ViewBoardButton3(props) {

    const active = props.active;
    const text = props.text;
    const playerNames = props.playerNames;
    const selectedOption = props.selectedOption;
    const allSquaresClaimed = props.allSquaresClaimed;
 
    const hoverName = playerNames[text];

    // console.log('ViewBoardButton3 allSquaresClaimed: ' + allSquaresClaimed);

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
            backgroundColor: (text == selectedOption) ? 'green' : allSquaresClaimed ? 'white' : active ? "red" : "white" ,
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

