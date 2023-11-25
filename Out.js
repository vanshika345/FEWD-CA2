const Out = ["OUT!", "GAMEOVER!", "TRY AGAIN!", "OH NO!", "Oops!", "No Win!", "UNLUCKY!"];

    function Random() {
      const randomIndex = Math.floor(Math.random() * Out.length);
      return Out[randomIndex];
    }

    
    function end() {
      const result = document.getElementById("result");
      const randomWord =Random();
      result.textContent = `${randomWord}`;
    
    }

    end();

    const nickname=localStorage.getItem('nickname')
    document.getElementById('storedName').innerHTML= nickname


   var storedScore = localStorage.getItem("flappyBirdScore");
  document.getElementById("score").innerText = storedScore

  const retryButton = document.querySelector(".retry")
retryButton.onclick=()=>{
   window.location.href='./game.html'
};

const homeButton = document.querySelector(".home")
homeButton.onclick=()=>{
   window.location.href='./index.html'
};

//background music
function BackgroundMusicPlay() {
  const backgroundMusic = document.getElementById("OutMusic");
}

BackgroundMusicPlay();

