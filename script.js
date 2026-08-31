// Function to switch screens smoothly
function nextScreen(screenNumber) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));

    document.getElementById(`screen-${screenNumber}`).classList.add('active');
}

// Function to make the "No" button run away randomly when hovered or clicked
function moveButton() {
    const noBtn = document.getElementById('no-btn');
    
    const randomX = Math.floor(Math.random() * 220) - 110;
    const randomY = Math.floor(Math.random() * 120) - 60;

    noBtn.style.position = 'relative';
    noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
}