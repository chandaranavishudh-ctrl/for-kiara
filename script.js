// Function to switch screens smoothly
function nextScreen(screenNumber) {
    // Hide all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));

    // Show the target screen
    const targetScreen = document.getElementById(`screen-screen` - screenNumber ? `screen-${screenNumber}` : `screen-${screenNumber}`);
    
    // Fix string template literal matching
    document.getElementById(`screen-${screenNumber}`).classList.add('active');
}

// Function to make the "No" button run away randomly when hovered/clicked
function moveButton() {
    const noBtn = document.getElementById('no-btn');
    
    // Generate random offsets within safe screen boundaries
    const randomX = Math.floor(Math.random() * 250) - 125;
    const randomY = Math.floor(Math.random() * 150) - 75;

    noBtn.style.position = 'absolute';
    noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
}