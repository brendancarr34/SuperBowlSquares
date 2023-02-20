import React from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';

export function NumberButton(props) {

    return (
        <MDBBtn disabled className="square-md" style={numberButtonStyle()}>
            {props.number}
        </MDBBtn>
    );

    function numberButtonStyle() { 
        return {
            backgroundColor: "black" ,
            color: "white",
            fontsize: 16,
            padding: 0,
            margin: 0,
            border: '1px solid black'
        } 
    };
}