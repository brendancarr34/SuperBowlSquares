import React from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';

export function NumberButton(props) {
    const style = { backgroundColor: "black" ,
    'color': "white",
     'fontsize': 16,
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