import React from 'react';

function VenmoPaymentLink({ recipient, amount }) {
  const recipientEncoded = encodeURIComponent(recipient);
  const amountEncoded = encodeURIComponent(amount);

  // Check if the user is on a mobile device
  const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobileDevice) {
    const venmoUrl = `venmo://paycharge?txn=pay&recipients=${recipientEncoded}&amount=${amountEncoded}`;
    return <a href={venmoUrl}>Pay with Venmo</a>;
  } else {
    const venmoWebUrl = `https://venmo.com/${recipient}?txn=pay&amount=${amountEncoded}`;
    return <a href={venmoWebUrl} target="_blank" rel="noopener noreferrer">Pay with Venmo</a>;
  }
}

export default VenmoPaymentLink;

