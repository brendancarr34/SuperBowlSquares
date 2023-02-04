import React from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';

export function NumberButton() {
    const color = { backgroundColor: "blue" ,
    'color': "white",
     'font-size': 10,
     'padding':0,
     'margin':0,
     'border':'1px solid black'
    };

    return (
        <MDBBtn className="square-md" style={color}>
            1
        </MDBBtn>
    );
}