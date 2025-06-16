// script.js

const form = document.getElementById('reservationForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const ticketsInput = document.getElementById('tickets');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const ticketsError = document.getElementById('ticketsError');

const successMessage = document.getElementById('successMessage');

// Validate email with regex
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

  // Validate name
  if (!nameInput.value.trim()) {
    nameError.textContent = 'Please enter your full name.';
    valid = false;
  }