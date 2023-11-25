function logSubmit(event) {
    event.preventDefault();
  }
  
  const form = document.getElementById("form");
  form.addEventListener("submit", logSubmit);

  const nickNameInput = document.querySelector("#nickname");
const gameStart = document.getElementById("start");

gameStart.onclick=()=>{
    
   if(nickNameInput.value) {
    var nickname = nickNameInput.value;
    localStorage.setItem('nickname', nickname );
    location.href="begin.html"
   }
   else{
    alert("Enter a nickname")
   }
};
    





  