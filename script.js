// Function to switch screens smoothly
function nextScreen(screenNumber) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));

    document.getElementById(`screen-${screenNumber}`).classList.add('active');
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
    
    // Random horizontal start position
    heart.style.left = Math.random() * 100 + 'vw';
    
    // Random animation duration for a natural look
    heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
    
    container.appendChild(heart);

    // Remove heart after animation finishes to keep page lightweight
    setTimeout(() => {
        heart.remove();
    }, 7000);
}

// Spawn a new heart every 400 milliseconds
setInterval(createHeart, 400);