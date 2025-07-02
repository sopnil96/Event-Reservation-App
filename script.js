const form = document.getElementById('reservationForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const ticketsInput = document.getElementById('tickets');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const ticketsError = document.getElementById('ticketsError');

const successMessage = document.getElementById('successMessage');

// Initialize reservations array from localStorage
let reservations = JSON.parse(localStorage.getItem('reservations') || '[]');

// Validate email using regex
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Reset error messages
  nameError.textContent = '';
  emailError.textContent = '';
  ticketsError.textContent = '';
  successMessage.style.display = 'none';

  let valid = true;

  const nameValue = nameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const ticketsValue = parseInt(ticketsInput.value, 10);

  // Validate name
  if (!nameValue) {
    nameError.textContent = 'Please enter your full name.';
    valid = false;
  }
