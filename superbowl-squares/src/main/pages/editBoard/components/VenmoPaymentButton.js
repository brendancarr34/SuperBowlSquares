import React from 'react';
import Button from 'react-bootstrap/Button';

function VenmoPaymentButton({ recipient, amount }) {
  const recipientEncoded = encodeURIComponent(recipient);
  const amountEncoded = encodeURIComponent(amount);

  // Check if the user is on a mobile device
  const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const handleClick = () => {
    if (isMobileDevice) {
      const venmoUrl = `venmo://paycharge?txn=pay&recipients=${recipientEncoded}&amount=${amountEncoded}`;
      console.log(venmoUrl);
      window.location.href = venmoUrl;
    } else {
      const venmoWebUrl = `https://venmo.com/${recipient}?txn=pay&amount=${amountEncoded}`;
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
