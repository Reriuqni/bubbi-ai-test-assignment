import './initRandomMessages.scss';

import { POPUP_TRIGGER_TEXT_ID } from '../../constants.js';

// --- Configuration Data ---
const RANDOM_MESSAGES = [
  'Great choice! You are the best',
  "Fantastic click! What's next?",
  'You found the secret message!',
  'Random response activated!',
  'Enjoy the information!',
  'Success! Mission accomplished.',
  'Another message added to the stack!',
  'Check out this cool new feature!',
];

// Using simple unicode characters as random icons
const RANDOM_ICONS = ['🌟', '💡', '🚀', '🎉', '💖', '✅', '🥳', '✨'];

// let popupTimeoutId = null; // Stores the ID for the 5-second auto-close timer
// --- Global State ---
let infoTrigger = undefined;
const TIMEOUT_DURATION = 5000; // 5 seconds for auto-close
const POPUP_TRANSITION_TIME = 300; // CSS transition time
let activePopups = []; // Array to store {element, timeoutId} objects

export function initRandomMessages() {
  infoTrigger = document.getElementById(POPUP_TRIGGER_TEXT_ID);

  // Attach the click event listener to the trigger text
  infoTrigger.addEventListener('click', showPopupStack);

  showPopupStack();
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
 * Generates a random number of pop-ups (from 1 to 5).
 * @returns {number} The random count.
 */
function getRandomPopupCount() {
  return Math.floor(Math.random() * 5) + 1; // 1 to 5
}

/**
 * Toggles the visibility of the trigger text.
 * @param {boolean} isVisible - Whether the trigger should be visible.
 */
function toggleTriggerVisibility(isVisible) {
  // return;
  if (isVisible) {
    infoTrigger.classList.add('visible');
  } else {
    infoTrigger.classList.remove('visible');
  }
}

/**
 * Closes a specific pop-up, clears the timer, and checks if the trigger can be shown.
 * @param {HTMLElement} popupElement - The pop-up element to close.
 */
function closePopup(popupElement) {
  // 1. Find and clear the timer
  const index = activePopups.findIndex((p) => p.element === popupElement);
  if (index !== -1) {
    clearTimeout(activePopups[index].timeoutId);
    // Remove from the active array
    activePopups.splice(index, 1);
  }

  // 2. Fade-out animation
  popupElement.classList.remove('show');

  // 3. Remove from DOM after transition completion
  setTimeout(() => {
    popupElement.remove();

    // 4. Check: If no active pop-ups remain, show the trigger
    if (activePopups.length === 0) {
      toggleTriggerVisibility(true);
    }
  }, POPUP_TRANSITION_TIME);
}

/**
 * Creates a single pop-up element.
 * @param {string} message - The message text.
 * @param {string} icon - The icon.
 * @returns {HTMLElement} The created pop-up element.
 */
function createPopupElement(message, icon) {
  const popup = document.createElement('div');
  popup.className = 'custom-popup';

  const iconEl = document.createElement('span');
  iconEl.className = 'popup-icon';
  iconEl.textContent = icon;

  const messageEl = document.createElement('span');
  messageEl.textContent = message;

  const closeBtn = document.createElement('button');
  closeBtn.className = 'close-btn';
  closeBtn.textContent = '×';

  popup.appendChild(iconEl);
  popup.appendChild(messageEl);
  popup.appendChild(closeBtn);

  // Add event listener for the close button
  closeBtn.addEventListener('click', () => closePopup(popup));

  return popup;
}

/**
 * Creates and displays a stack of pop-ups (1 to 5).
 */
function showPopupStack() {
  // If pop-ups already exist, ignore the click
  if (activePopups.length > 0) {
    return;
  }

  // 1. Hide the trigger
  toggleTriggerVisibility(false);

  // 2. Determine the number of pop-ups
  const count = getRandomPopupCount();

  // 3. Determine the initial position of the first pop-up (above the trigger)
  const rect = infoTrigger.getBoundingClientRect();

  // Use a timeout to allow the browser time for rendering before calculating
  // the position of subsequent elements.
  setTimeout(() => {
    let currentOffsetTop = rect.top + window.scrollY; // Initial position (top edge of trigger)

    for (let i = 0; i < count; i++) {
      const randomMessage = getRandomItem(RANDOM_MESSAGES);
      const randomIcon = getRandomItem(RANDOM_ICONS);
      const popup = createPopupElement(randomMessage, randomIcon);

      document.body.appendChild(popup);

      const popupWidth = popup.offsetWidth;
      const popupHeight = popup.offsetHeight;

      // 4. Calculate vertical position
      // Position of the first pop-up (i=0) - at the trigger's location, offset upwards.
      // Subsequent pop-ups are shifted vertically upwards by the height of the previous one + a small margin (10px).
      if (i === 0) {
        // First pop-up: 10px above the trigger
        currentOffsetTop = rect.top + window.scrollY - popupHeight + 40;
      } else {
        // Each subsequent pop-up: 10px above the previous one
        currentOffsetTop -= popupHeight + 10;
      }

      // 5. Calculate horizontal position (center above the trigger)
      popup.style.left = `${
        rect.left + window.scrollX + rect.width / 2 - popupWidth / 2
      }px`;
      popup.style.top = `${currentOffsetTop}px`;

      // 6. Display
      popup.classList.add('show');

      // 7. Setup auto-close and save state
      const timeoutId = setTimeout(() => closePopup(popup), TIMEOUT_DURATION);
      activePopups.push({ element: popup, timeoutId: timeoutId });
    }
  }, 1);
}
