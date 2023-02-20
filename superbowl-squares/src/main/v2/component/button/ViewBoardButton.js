import React, { useState } from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';

export function ViewBoardButton(props) {

    const active = props.active;
    const text = props.text;

    return (
        <MDBBtn disabled className="square-md" style={viewBoardButtonStyle()}>
            {text}
        </MDBBtn>
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
}

