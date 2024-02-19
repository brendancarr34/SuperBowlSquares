import React, { useState } from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';

export function ViewBoardButton(props) {

    const active = props.active;
    const text = props.text;

    // const handleMouseEnter = () => {
    //     console.log('Mouse entered the button ' + text);
    // };

    // const handleHover = () => {
    //     if (text)
    //     {
    //         console.log('Button hovered over: ' + text);
    //     }
    // };

    return (
        <div className="button-container">
            <MDBBtn disabled className="square-md" style={viewBoardButtonStyle()}>
                {text}
                <span className="hover-text" style={nullify()}>{text ? text : null}</span>
            </MDBBtn>
        </div>

    )

    function viewBoardButtonStyle() {  
        return {
            backgroundColor: active ? "red" : "white" ,
            color: active ? "black" : "white",
            fontSize: 15,
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

