import React from 'react';
import '../style/VerticalTextComponent.css'; // Import CSS for styling

export function VerticalTextComponent(props) {
  return (
    <div className="text-container">
      <div className="text-component">
        {props.text}
      </div>
    </div>
  );
}
