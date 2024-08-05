const form = document.getElementById('cardForm');
form.onsubmit = handleSubmit

function handleSubmit(e) {
  e.preventDefault();
  const cardNumberEl = document.getElementById('cardNumber');
  const expirationDateEl = document.getElementById('expirationDate');
  const securityCodeEl = document.getElementById('securityCode');

  const cardNumber = cardNumberEl.value;
  const expirationDate = expirationDateEl.value;
  const securityCode = securityCodeEl.value;

  console.log({
    cardNumber,
    expirationDate,
    securityCode,
  });
} 