import React from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';

export function NumberButton(props) {
    const style = { backgroundColor: "blue" ,
    'color': "white",
     'font-size': 10,
     'padding':0,
     'margin':0,
     'border':'1px solid black'
    };

    return (
        <MDBBtn disabled className="square-md" style={style}>
            {props.number}
        </MDBBtn>
    );
}