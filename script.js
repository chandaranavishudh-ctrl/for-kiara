// Your Formspree link is integrated here:
const formspreeLink = "https://formspree.io/f/moeqjwoe"; 

let spoilChoice = "";
let giftChoice = "";

// Function to switch screens smoothly
function nextScreen(screenNumber) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));

    document.getElementById(`screen-${screenNumber}`).classList.add('active');
}

// Function to record how she wants to be spoiled
function chooseSpoil(choice) {
    spoilChoice = choice;
    nextScreen(5); // Go to the flowers question
}

// Function to record the gift and send the email!
function chooseGift(choice) {
    giftChoice = choice;
    
    // Show the final screen immediately so she doesn't have to wait
    nextScreen(6);

    // Send the data quietly in the background to Formspree
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

// Function to make the "No" button run away randomly when hovered or clicked
function moveButton() {
    const noBtn = document.getElementById('no-btn');
    
    const randomX = Math.floor(Math.random() * 200) - 100;
    const randomY = Math.floor(Math.random() * 100) - 50;

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
