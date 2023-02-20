import React from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';

export function CornerButton() {
    const color = { backgroundColor: "gray" ,
    'color': "gray",
     'fontSize': 10,
     'padding':0,
     'margin':0,
     'border':'1px solid gray'
    };

    return (
        <MDBBtn disabled className="square-md" style={color}/>
    );
}