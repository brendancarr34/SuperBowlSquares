import React, { useState } from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';

export function ViewBoardButton(props) {

    const active = props.active;
    // const [active, setActive] = useState(false);
    const color = {  
        backgroundColor: active ? "red" : "white" ,
        'color': active ? "green" : "white",
        'font-size': 15,
        'padding':0,
        'margin':0,
        'border':'1px solid black',
        textAlign:'center'
    };

    return (
        <MDBBtn disabled className="square-md" style={color}/>
    )
}

