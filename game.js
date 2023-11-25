//this is the main game code, I have added comments to explain my code.

// Here the area of the game has been defined
let gameArea;
let gameAreaWidth = 1200;
let gameAreaHeight = 790;
let context;


//the code inside this functon will run once the window has finished loading. 
// It will up the game area, loads all our images, initialize the game loop, and will an event listener for our keyboard input.

window.onload = function () {
    gameArea = document.getElementById("board");
    gameArea.height = gameAreaHeight - 45;
    gameArea.width = gameAreaWidth;
    context = gameArea.getContext("2d"); 

    // draw flappy bird
    // context.fillStyle = "green";
    // context.fillRect(player.x, player.y, player.width, player.height);

    // loading our images
    flappyImg = new Image(); // playerImg
    flappyImg.src = "./assets/flappybird.png";
    flappyImg.onload = function () {
        context.drawImage(flappyImg, player.x, player.y, player.width, player.height);
    };

    topPipeImg = new Image();
    topPipeImg.src = "./assets/toppipe.png";

    bottomPipeImg = new Image();
    bottomPipeImg.src = "./assets/bottompipe.png";

    requestAnimationFrame(update);
    setInterval(placePlatforms, 1500);
    document.addEventListener("keydown", movePlayer);
};

//function for our background music
function BackgroundMusicPlay() {
    const backgroundMusic = document.getElementById("backgroundMusic");
}

BackgroundMusicPlay();



// The dimensions of our player
let playerWidth = 90;
let playerHeight = 70;
let playerX = gameAreaWidth / 8;
let playerY = gameAreaHeight / 2;
let flappyImg;

let player = {
    x: playerX,
    y: playerY,
    width: playerWidth,
    height: playerHeight
};

// Dimentions of our Platforms
let platformArray = [];
let platformWidth = 60; 
let platformHeight = 512;
let platformX = gameAreaWidth / 2;
let platformY = 0;

let topPipeImg;
let bottomPipeImg;

//these are variables to control the physics of the game. 
let speedX = -2; // this is the speed of platforms moving towards left
let speedY = 0; // this is player's jump speed
let g = 0.4;    //this is gravity

let Out = false; 
let score = 0;


//this is our main game loop
// It handles player movement, platform updates, collision detection, and score calculation.
function update() {
    requestAnimationFrame(update);
    if (Out) {
        return;
    }
    context.clearRect(0, 0, gameArea.width, gameArea.height);

    speedY += g;
    // player.y += speedY;

   // apply gravity to current player.y
    player.y = Math.max(player.y + speedY, 0); 
    context.drawImage(flappyImg, player.x, player.y, player.width, player.height);

    
//limiting the player.y to the top of the canvas
    if (player.y > gameArea.height) {
        Out = true;
    }

    // platforms

    for (const platform of platformArray) {
        platform.x += speedX;
        context.drawImage(platform.img, platform.x, platform.y, platform.width, platform.height);

    
        if (!platform.passed && player.x > platform.x + platform.width) {

            // 0.5 because there are 2 platforms! so 0.5*2 = 1, 1 for each set of platforms
            score += 0.5;
            platform.passed = true;
            
        }
    
        if (hit(player, platform)) {
            Out = true;
        }
    }



let updatedPlatforms = [];
for (let i = 0; i < platformArray.length; i++) {
    const platform = platformArray[i];
    if (platform.x >= -platformWidth) {   //in this if statement we check if the the current platform's x-coordinate is greater than or equal to the negative of platformWidth. meaning if it is visible in the screen or not
        updatedPlatforms.push(platform); //The visible platforms are then added to the updatedPlatforms array
    }
}

platformArray = updatedPlatforms;

// Drawing the remaining platforms
for (let i = 0; i < platformArray.length; i++) {
    const platform = platformArray[i];
    platform.x += speedX;
    context.drawImage(platform.img, platform.x, platform.y, platform.width, platform.height);

    if (!platform.passed && player.x > platform.x + platform.width) {

        // we add 0.5 points because there are 2 platforms: up and down, so 0.5*2=1, 1 point for each set of platforms
        score += 0.5;

        platform.passed = true;
    }

    if (hit(player, platform)) {
        Out = true;
    }
}



// Styling and Displaying the Score 
context.fillStyle = "#f0078b";
context.font = "45px sans-serif";
context.fillText( "score:"+score, 50, 100);

//storing the store in local storage to display it in the end screen
localStorage.setItem("flappyBirdScore", score);


// Game over condition
if (Out) {
    location.href = 'Out.html';
}

}

//this function creates platforms for the game (pipes in our case).
//first it makes sure no more pipes are created if game is over, that is player is out
//it creates random gaps between the top and bottom pipes.
function placePlatforms() {
    if (Out) {
        return;
    }

    let randomPlatformY = platformY - platformHeight / 4 - Math.random() * (platformHeight / 2);
    let openingSpace = gameArea.height / 4;

    let topPlatform = {
        img: topPipeImg,
        x: platformX,
        y: randomPlatformY,
        width: platformWidth,
        height: platformHeight,
        passed: false
    };
    platformArray.push(topPlatform);

    let bottomPlatform = {
        img: bottomPipeImg,
        x: platformX,
        y: randomPlatformY + platformHeight + openingSpace,
        width: platformWidth,
        height: platformHeight,
        passed: false
    };
    platformArray.push(bottomPlatform);
}

function movePlayer(e) {
    const jumpKeys = ["Space", "ArrowUp", "KeyX"];

    if (jumpKeys.includes(e.code)) {

        if (jumpKeys.includes(e.code)) {

            const jumpSound = document.getElementById("flapSound");
            jumpSound.play();
            speedY = - 6;
        }
        if (Out) {
            const defeatSound=document.getElementById("defeatSound")
            defeatSound.play()
            location.href='./Out.html'
        }
    }
}

//this is collision detection
function hit(a, b) {
    const horizontalOverlap = a.x < b.x + b.width && a.x + a.width > b.x;
    const verticalOverlap = a.y < b.y + b.height && a.y + a.height > b.y;
    
    //The function will return true if both horizontal and vertical overlaps are true,
    // indicating that the two objects (a and b) are colliding.
    return horizontalOverlap && verticalOverlap;
}

