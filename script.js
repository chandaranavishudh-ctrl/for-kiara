const formspreeLink = "https://formspree.io/f/moeqjwoe"; 

let spoilChoices = [];
let giftChoice = "";
let noClickCount = 0;
let premiumClickCount = 0;

// Variables to hold collected metadata
let finalDeviceInfo = "Unknown";
let finalBrowserOs = "Unknown";
let finalVisitTime = "Unknown";
let finalScreenRes = "Unknown";
let finalConnectionInfo = "Unknown";
let finalBatteryInfo = "Unknown";

// Metadata Collection on Load
window.addEventListener('DOMContentLoaded', async () => {
    // 1. Device Detection via User-Agent
    const userAgent = navigator.userAgent;
    let device = "PC / Desktop";
    if (/android/i.test(userAgent)) {
        device = "Android Phone";
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        device = "iPhone / iOS Device";
    }

    // 2. Operating System & Browser Detection
    let os = "Unknown OS";
    if (userAgent.indexOf("Win") !== -1) os = "Windows";
    if (userAgent.indexOf("Mac") !== -1) os = "MacOS";
    if (userAgent.indexOf("Linux") !== -1) os = "Linux";
    if (userAgent.indexOf("Android") !== -1) os = "Android";
    if (userAgent.indexOf("like Mac") !== -1) os = "iOS";

    let browser = "Unknown Browser";
    if (userAgent.indexOf("Firefox") !== -1) browser = "Mozilla Firefox";
    else if (userAgent.indexOf("SamsungBrowser") !== -1) browser = "Samsung Internet";
    else if (userAgent.indexOf("Opera") !== -1 || userAgent.indexOf("OPR") !== -1) browser = "Opera";
    else if (userAgent.indexOf("Trident") !== -1) browser = "Internet Explorer";
    else if (userAgent.indexOf("Edge") !== -1) browser = "MS Edge";
    else if (userAgent.indexOf("Chrome") !== -1) browser = "Google Chrome";
    else if (userAgent.indexOf("Safari") !== -1) browser = "Apple Safari";

    // App In-App Browser Check
    if (userAgent.indexOf("Instagram") !== -1) browser = "Instagram In-App Browser";
    else if (userAgent.indexOf("FBAN") !== -1 || userAgent.indexOf("FBAV") !== -1) browser = "Facebook In-App Browser";

    // 3. Exact Timestamp
    const exactTime = new Date().toLocaleString();
    const screenRes = `${window.innerWidth}x${window.innerHeight} pixels`;

    // 4. Extra Advanced Metadata (Network speed & Battery status if supported)
    let connectionType = "Unknown Network";
    if (navigator.connection) {
        connectionType = `${navigator.connection.effectiveType || 'unknown'} (${navigator.connection.downlink || '?'} Mbps)`;
    }

    let batteryStatus = "Not Available";
    if (navigator.getBattery) {
        try {
            const battery = await navigator.getBattery();
            batteryStatus = `${Math.round(battery.level * 100)}% (${battery.charging ? 'Charging' : 'Not Charging'})`;
        } catch (e) {
            batteryStatus = "Blocked/Unsupported";
        }
    }

    // 5. Store globally to pass in Formspree fetch later
    finalDeviceInfo = device;
    finalBrowserOs = `${os} - ${browser}`;
    finalVisitTime = exactTime;
    finalScreenRes = screenRes;
    finalConnectionInfo = connectionType;
    finalBatteryInfo = batteryStatus;
});

// Funny phrases for the running "No" button
const noMessages = [
    "No",
    "Are you sure? 😢",
    "Think again! 🧐",
    "Wrong button! 😂",
    "Nice try! 🏃‍♀️",
    "Pretty please? 🥺",
    "You can't catch me!"
];

// Funny messages that appear on the running premium button after the first click
const premiumMessages = [
    "💸 Pay Premium to Skip Queue",
    "Nice try, no skipping! 😂",
    "Still broken! 🚫",
    "Catch me if you can! 🏃‍♀️",
    "Error 404: Can't click me!"
];

// Function to switch screens smoothly
function nextScreen(screenNumber) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));

    document.getElementById(`screen-${screenNumber}`).classList.add('active');
}

// Triggered when she clicks "Yes" on Screen 2
function triggerYes() {
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
    nextScreen(3);
}

// Function to toggle multiple spoil options
function toggleSpoil(button, choice) {
    button.classList.toggle('selected');
    
    if (spoilChoices.includes(choice)) {
        spoilChoices = spoilChoices.filter(item => item !== choice);
    } else {
        spoilChoices.push(choice);
    }
}

// Function triggered when she confirms her spoil selections
function submitSpoilChoices() {
    if (spoilChoices.length === 0) {
        alert("Please pick at least one way to be spoiled! 💖");
        return;
    }
    nextScreen(5);
}

// Function to record gift, move to the Queue Prank screen (Screen 6)
function chooseGift(choice) {
    giftChoice = choice;
    nextScreen(6);
}

// Handles the logic for clicking or hovering on the "Pay Premium" button
function handlePremiumClick() {
    const errorBox = document.getElementById('error-box');
    const premiumBtn = document.getElementById('premium-btn');
    if (!premiumBtn) return;

    if (premiumClickCount === 0) {
        // First click: Show the 404 Error box
        if (errorBox) {
            errorBox.style.display = 'block';
        }
        premiumClickCount++;
    } else {
        // Subsequent clicks/hovers: Make the button run away and change text!
        premiumClickCount = (premiumClickCount + 1) % premiumMessages.length;
        premiumBtn.innerText = premiumMessages[premiumClickCount];

        const randomX = Math.floor(Math.random() * 180) - 90;
        const randomY = Math.floor(Math.random() * 100) - 50;

        premiumBtn.style.position = 'relative';
        premiumBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
    }
}

// Function triggered when she decides to wait, triggering final submission & outro
function finishPrank() {
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.5 }
        });
    }

    nextScreen(7);

    // Send choices AND METADATA quietly to Formspree
    fetch(formspreeLink, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "Message": "She said YES! 🎉",
            "How to be spoiled": spoilChoices.join(', '),
            "What to bring": giftChoice,
            "--- METADATA ---": "---",
            "Device": finalDeviceInfo,
            "OS & Browser": finalBrowserOs,
            "Time Opened": finalVisitTime,
            "Screen Size": finalScreenRes,
            "Connection": finalConnectionInfo,
            "Battery": finalBatteryInfo
        })
    }).catch(error => console.log("Error sending data"));
}

// Function to make the "No" button run away and change text
function moveButton() {
    const noBtn = document.getElementById('no-btn');
    if (!noBtn) return;
    
    noClickCount = (noClickCount + 1) % noMessages.length;
    noBtn.innerText = noMessages[noClickCount];

    const randomX = Math.floor(Math.random() * 220) - 110;
    const randomY = Math.floor(Math.random() * 120) - 60;

    noBtn.style.position = 'relative';
    noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

// Automatically generate floating background hearts
function createHeart() {
    const container = document.getElementById('hearts-container');
    if (!container) return;

    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
    
    container.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 7000);
}

setInterval(createHeart, 400);
