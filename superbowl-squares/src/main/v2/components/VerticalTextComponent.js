import React from 'react';
import '../style/VerticalTextComponent.css'; // Import CSS for styling

export function VerticalTextComponent(props) {

  if (props.text == 'test') {
    return (
      <div className="text-container">
        <div className="text-component-2">
          ''
        </div>
      </div>
    );
  }

  return (
    <div className="text-container">
      <div className="text-component">
        {props.text}
      </div>
    </div>
  );
}
