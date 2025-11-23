import './initRandomMessages.scss';

// --- Configuration Data ---
const RANDOM_MESSAGES = [
  'Great choice! You are the best',
  "Fantastic click! What's next?",
  'You found the secret message!',
  'Random response activated!',
  'Enjoy the information!',
  'Success! Mission accomplished.',
];

// Using simple unicode characters as random icons
const RANDOM_ICONS = ['🌟', '💡', '🚀', '🎉', '💖', '✅', '🥳', '✨'];

let popupTimeoutId = null; // Stores the ID for the 5-second auto-close timer

export function initRandomMessages() {
  // --- Global State and Elements ---
  const infoTrigger = document.getElementById('infoTrigger');
  // let popupTimeoutId = null; // Stores the ID for the 5-second auto-close timer

  // Attach the click event listener to the trigger text
  infoTrigger.addEventListener('click', showPopup);
}

// --- Helper Functions ---

/**
 * Gets a random item from an array.
 * @param {Array<string>} arr - The array to choose from.
 * @returns {string} A random element from the array.
 */
function getRandomItem(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

/**
 * Closes the pop-up and clears the auto-close timeout.
 */
function closePopup() {
  const existingPopup = document.querySelector('.custom-popup');

  // 1. Clear the automatic close timer
  if (popupTimeoutId) {
    clearTimeout(popupTimeoutId);
    popupTimeoutId = null;
  }

  if (existingPopup) {
    // 2. Remove the 'show' class for the fade-out effect
    existingPopup.classList.remove('show');

    // 3. Wait for the transition to finish, then remove the element from DOM
    setTimeout(() => {
      existingPopup.remove();
    }, 300); // Matches the CSS transition time
  }
}

/**
 * Creates and displays the pop-up with random content.
 */
function showPopup() {
  // Check if a pop-up is already visible (prevents double pop-ups)
  if (document.querySelector('.custom-popup')) {
    // If it exists, we close the old one before making a new one
    closePopup();
    return;
  }

  // --- 1. Get Random Content ---
  const randomMessage = getRandomItem(RANDOM_MESSAGES);
  const randomIcon = getRandomItem(RANDOM_ICONS);

  // --- 2. Create Elements ---
  const popup = document.createElement('div');
  popup.className = 'custom-popup';

  const icon = document.createElement('span');
  icon.className = 'popup-icon';
  icon.textContent = randomIcon;

  const message = document.createElement('span');
  message.textContent = randomMessage;

  const closeBtn = document.createElement('button');
  closeBtn.className = 'close-btn';
  closeBtn.textContent = '×';

  // --- 3. Assemble and Attach ---
  popup.appendChild(icon);
  popup.appendChild(message);
  popup.appendChild(closeBtn);

  document.body.appendChild(popup);

  // --- 4. Position the Pop-up ---
  const rect = infoTrigger.getBoundingClientRect();
  // Wait for the popup to be in the DOM to get correct width/height before positioning

  // This positioning tries to place the popup right above the trigger element.
  // Using a short delay to ensure offsetHeight/offsetWidth are calculated correctly.
  setTimeout(() => {
    const popupWidth = popup.offsetWidth;
    const popupHeight = popup.offsetHeight;

    // Vertical: Place 10px above the trigger
    popup.style.top = `${rect.top + window.scrollY - popupHeight - 10}px`;
    // Horizontal: Center the pop-up on the trigger
    popup.style.left = `${
      rect.left + window.scrollX + rect.width / 2 - popupWidth / 2
    }px`;

    // Add 'show' class to trigger the CSS fade-in
    popup.classList.add('show');
  }, 1);

  // --- 5. Setup Timers and Events ---

  // Auto-Close Timer (5 seconds)
  popupTimeoutId = setTimeout(closePopup, 5000); // 5000ms = 5 seconds

  // Close Button Event
  closeBtn.addEventListener('click', closePopup);
}
