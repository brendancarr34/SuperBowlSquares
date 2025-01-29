import React from 'react';
import Button from 'react-bootstrap/Button';

function VenmoPaymentButton({ recipient, amount, squares, groupName }) {
  const recipientEncoded = encodeURIComponent(recipient);
  const amountEncoded = encodeURIComponent(amount);

  // Check if the user is on a mobile device
  const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  var note = '';
  if (squares > 1)
  {
    note = `${squares}%20squares%20claimed%20in%20group%20${groupName}`;
  }
  else if (squares == 1)
  {
    note = `${squares}%20square%20claimed%20in%20group%20${groupName}`;
  }
  else {
    note = `payment%20for%20group%20${groupName}`
  }

  const handleClick = () => {
    let venmoUrl = '';
    if (isMobileDevice) {
      if (amount){
        venmoUrl = `venmo://paycharge?txn=pay&recipients=${recipientEncoded}&amount=${amountEncoded}&note=${note}`;
      } else {
        venmoUrl = `venmo://paycharge?txn=pay&recipients=${recipientEncoded}&note=${note}`;
      }
      
      console.log(venmoUrl);
      window.location.href = venmoUrl;
    } else {
      const venmoWebUrl = `https://venmo.com/${recipient}?txn=pay&amount=${amountEncoded}&note=${note}`;
      console.log(venmoWebUrl);
      window.open(venmoWebUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Button style={{paddingTop:15, border:"#4682b4", backgroundColor:"#4682b4"}} onClick={handleClick}>
      {
        amount ? <h6>Send ${amount} to @{recipient}</h6> : <h4>Send a Venmo to <br/>@{recipient}</h4>
      }
    </Button>
  );
}

export default VenmoPaymentButton;
