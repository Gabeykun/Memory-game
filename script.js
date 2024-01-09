const gameContainer = document.getElementById("game");
let card1 = null
let card2 = null
let noClicking = false

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

let shuffledColors = shuffle(COLORS);

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

let count = 0

function handleCardClick(event) {
  if (noClicking) return
  if (event.target.classList.contains("flip")) return;
  
  event.target.style.backgroundColor = event.target.classList[0]

  if (!card1 || !card2) {
    event.target.classList.add("flip")
    card1 = card1 || event.target
    card2 = event.target === card1 ? null : event.target
  }

  if (card1 && card2){
    noClicking = true
    if (card1.className === card2.className){
      count = count + 2
      noClicking = false
      card1 = null
      card2 = null
      checkWin()
    } else {
      setTimeout(function(){
        noClicking = false
        card1.classList.remove("flip");
        card2.classList.remove("flip");
        card1.style.backgroundColor = ''
        card2.style.backgroundColor = ''
        card1 = null
        card2 = null
      }, 1000)
    }
  }
}

let checkWin = () => {
  if (count >= COLORS.length ) {
    alert("you've won")
  }
}


createDivsForColors(shuffledColors);
