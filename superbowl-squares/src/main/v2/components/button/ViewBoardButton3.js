import React, { useState } from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';

export function ViewBoardButton3(props) {

    const active = props.active;
    const text = props.text;
    const playerNames = props.playerNames;
    const selectedOption = props.selectedOption;
    const allSquaresClaimed = props.allSquaresClaimed;
    const colorData = props.colorData;
    var playerColor = '';

    for (const element of colorData) {
        if (element['initials'] == text) {
            playerColor = element['color'];
        }
    }
 
    const hoverName = playerNames[text];

    // console.log('ViewBoardButton3 allSquaresClaimed: ' + allSquaresClaimed);

    return (
        <div className="button-container">
            <MDBBtn className="square-md" style={viewBoardButtonStyle()}>
                {text}
                <span className="hover-text" style={nullify()}>{text ? hoverName : null}</span>
            </MDBBtn>
        </div>

    )

    function viewBoardButtonStyle() {  
        return {
            // backgroundColor: (text == selectedOption) ? 'green' : allSquaresClaimed ? 'white' : active ? "red" : "white" ,
            // backgroundColor: allSquaresClaimed ? 'white' : active ? "red" : "white" ,
            // backgroundColor: (text != selectedOption && selectedOption != 'none') ? 'white' : (selectedOption == 'none' && active) ? "red" : "white" ,
            backgroundColor: (selectedOption == 'None' && active) ? playerColor : (text == selectedOption) ? playerColor : "white",

            color: active ? "black" : "white",
            fontSize: text && text.length > 2 ? 8 : 13,
            padding: 0,
            margin: 0,
            border: '1px solid black',
            // border: (text == selectedOption) ? '3px solid blue' : '1px solid black',
            textAlign: 'center'
        }
    };

    function nullify() {
        if (!text) {
            return {
                display: 'none'
            }
        }

        return {
            fontSize: 13, // Fixed font size for hover text
        };
    }
}

