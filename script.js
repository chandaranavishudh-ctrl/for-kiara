const formspreeLink = "https://formspree.io/f/moeqjwoe"; 

let spoilChoice = "";
let giftChoice = "";
let noClickCount = 0;

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

// Function to record how she wants to be spoiled and move to gift screen
function chooseSpoil(choice) {
    spoilChoice = choice;
    nextScreen(5); 
}

// Function to record gift, move to the new Queue Prank screen (Screen 6)
function chooseGift(choice) {
    giftChoice = choice;
    nextScreen(6);
}

// Triggers the funny 404 payment error message when she clicks the premium button
function triggerPaymentError() {
    const errorBox = document.getElementById('error-box');
    if (errorBox) {
        errorBox.style.display = 'block';
    }
}

// Function triggered when she decides to wait or bypasses the prank, triggering final submission & outro
function finishPrank() {
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.5 }
        });
    }

    nextScreen(7);

    // Send choices quietly to Formspree
    fetch(formspreeLink, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "Message": "She said YES! 🎉",
            "How to be spoiled": spoilChoice,
            "What to bring": giftChoice
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
