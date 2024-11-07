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

  const handleClick = () => {
    if (isMobileDevice) {
      const venmoUrl = `venmo://paycharge?txn=pay&recipients=${recipientEncoded}&amount=${amountEncoded}&note=${note}`;
      console.log(venmoUrl);
      window.location.href = venmoUrl;
    } else {
      const venmoWebUrl = `https://venmo.com/${recipient}?txn=pay&amount=${amountEncoded}&note=${note}`;
      console.log(venmoWebUrl);
      window.open(venmoWebUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Button onClick={handleClick}>
      Send ${amount} to ${recipient}
    </Button>
  );
}

export default VenmoPaymentButton;
