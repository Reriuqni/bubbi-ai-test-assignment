export function getPopUpStyles() {
  return `
    <style>
        /* CSS for the initial clickable text */
        #infoTrigger {
            font-size: 18px;
            color: red;
            cursor: pointer;
            user-select: none;
            display: inline-block;
            padding: 5px;
        }

        /* CSS for the pop-up (the "faux Tippy") */
        .custom-popup {
            position: absolute;
            background-color: #f9f9f9;
            border: 1px solid #007bff; /* Changed border color for better visibility */
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            padding: 15px;
            border-radius: 8px;
            z-index: 1000;
            max-width: 250px;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .custom-popup.show {
            opacity: 1;
            visibility: visible;
        }

        /* CSS for the pop-up icon */
        .popup-icon {
            font-size: 24px;
            line-height: 1;
        }

        /* CSS for the close button */
        .close-btn {
            background: none;
            border: none;
            color: #aaa;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            position: absolute;
            top: 5px;
            right: 10px;
        }

        .close-btn:hover {
            color: #333;
        }
    </style>
  `;
}
