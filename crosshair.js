// ==UserScript==
// @name         Crosshair for bridging on miniblox.io
// @namespace    http://tampermonkey.net/
// @description  Adds a customizable crosshair in the center of the screen on miniblox.io
// @author       ee6-lang
// @match        https://miniblox.io/*
// @grant        GM_addStyle
// @license      Redistribution prohibited
// @version      1.2
// @downloadURL https://update.greasyfork.org/scripts/519279/Crosshair%20for%20bridging%20on%20minibloxio.user.js
// @updateURL https://update.greasyfork.org/scripts/519279/Crosshair%20for%20bridging%20on%20minibloxio.meta.js
// ==/UserScript==

(function() {
    'use strict';

    // Customizable settings
    const crosshairURL = 'https://raw.githubusercontent.com/lacymorrow/crossover/master/src/static/icons/icon.png'; 
    const defaultSize = 30; // Default size (can be adjusted)
    const defaultKey = 'c'; // Default key to toggle crosshair

    // Load user settings from localStorage if available
    const savedCrosshairSize = localStorage.getItem('crosshairSize') || defaultSize;
    const savedKey = localStorage.getItem('crosshairKey') || defaultKey;
    const savedVisibility = localStorage.getItem('crosshairVisibility') !== null ? JSON.parse(localStorage.getItem('crosshairVisibility')) : true;

    let crosshairVisible = savedVisibility;

    // Create the crosshair image
    const crosshair = document.createElement('img');
    crosshair.src = crosshairURL;
    crosshair.style.position = 'fixed';
    crosshair.style.top = '50%';
    crosshair.style.left = '50%';
    crosshair.style.width = `${savedCrosshairSize}px`; 
    crosshair.style.height = `${savedCrosshairSize}px`; 
    crosshair.style.transform = 'translate(-50%, -50%)';
    crosshair.style.zIndex = '9999';
    crosshair.style.display = crosshairVisible ? 'block' : 'none'; // Initialize visibility based on saved state

    document.body.appendChild(crosshair);

    // Handle keybinding changes
    document.addEventListener('keydown', (event) => {
        if (event.key.toLowerCase() === savedKey.toLowerCase()) {
            crosshairVisible = !crosshairVisible;
            crosshair.style.display = crosshairVisible ? 'block' : 'none';
            localStorage.setItem('crosshairVisibility', JSON.stringify(crosshairVisible)); // Save state
            console.log(`Crosshair is now ${crosshairVisible ? 'visible' : 'hidden'}.`);
        }
    });

    // Error handling for image loading
    crosshair.onerror = () => {
        console.error('Failed to load crosshair image. Using fallback.');
        crosshair.src = ''; // If the image fails, fall back to default crosshair style
        crosshair.style.backgroundColor = 'black'; // Simple fallback (just a black dot)
        crosshair.style.borderRadius = '50%';
        crosshair.style.width = '40px';
        crosshair.style.height = '40px';
    };

    // Allow dynamic adjustment of crosshair size via script or developer tools
    window.setCrosshairSize = function(size) {
        crosshair.style.width = `${size}px`;
        crosshair.style.height = `${size}px`;
        localStorage.setItem('crosshairSize', size);
    };
})();
