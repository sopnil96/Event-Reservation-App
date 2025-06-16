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

  // Validate email
  if (!emailInput.value.trim()) {
    emailError.textContent = 'Please enter your email address.';
    valid = false;
  } else if (!isValidEmail(emailInput.value.trim())) {
    emailError.textContent = 'Please enter a valid email address.';
    valid = false;
  }

  // Validate tickets
  if (!ticketsInput.value) {
    ticketsError.textContent = 'Please select the number of tickets.';
    valid = false;
  }

  if (!valid) return;

  // Save reservation to localStorage
  const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');

  reservations.push({
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    tickets: ticketsInput.value
  });

  localStorage.setItem('reservations', JSON.stringify(reservations));

  // Show success message
  successMessage.style.display = 'block';
  successMessage.textContent = `Thank you, ${nameInput.value.trim()}! Your reservation for ${ticketsInput.value} ticket(s) is confirmed.`;

  // Reset form
  form.reset();
});

// Guest list display
const guestUl = document.getElementById('guestUl');

if (guestUl) {
  const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');

  if (reservations.length === 0) {
    guestUl.innerHTML = '<li>No reservations yet. Be the first!</li>';
  } else {
    guestUl.innerHTML = '';

    reservations.forEach((res, index) => {
      const li = document.createElement('li');
      li.textContent = `${res.name} (${res.email}) — Tickets: ${res.tickets}`;

      // Add a remove button
      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Remove';
      removeBtn.title = 'Remove this reservation';

      removeBtn.addEventListener('click', () => {
        reservations.splice(index, 1);
        localStorage.setItem('reservations', JSON.stringify(reservations));
        li.remove();
        if (reservations.length === 0) {
          guestUl.innerHTML = '<li>No reservations yet. Be the first!</li>';
        }
      });

      li.appendChild(removeBtn);
      guestUl.appendChild(li);
    });
  }
}
