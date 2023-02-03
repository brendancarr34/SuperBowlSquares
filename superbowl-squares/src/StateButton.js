import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

export function StateButton() {
    const [active, setActive] = useState(false);
    const [text, setText] = useState("⬜️");
    const handleClick = () => {
        setActive(!active);
        !active ? setText("🏈") : setText("⬜️")
    };
    const colorOnClick = { backgroundColor: active ? "blue" : "gray" ,
                             'font-size': 12,
                             padding:0
                            };
    return (
        <Button 
            size="sm" 
            onClick={handleClick}
            style={colorOnClick}>
                    {text}
        </Button>
    );
}