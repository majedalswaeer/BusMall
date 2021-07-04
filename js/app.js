'use strict';

let leftEL = document.getElementById('leftimg');
let middleEL = document.getElementById('middleimg');
let rightEL = document.getElementById('rightimg');


let mallArr = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];

let newnames = [];
let att = 1;
let maxAtt = 25;

//_____________________________________ Constructer
function Busmall(imgNamee) {
  this.name = imgNamee.split('.')[0];
  this.img = 'imgs/' + imgNamee;
  this.views = 0;
  this.votes = 0;
  newnames.push(this);
}
//_____________________________________end

//_____________________________________for loop to create new imgs
for (let i = 0; i < mallArr.length; i++) {

  new Busmall(mallArr[i]);


}
//_____________________________________end


//_____________________________________giving random numbers
function randImg() {

  return Math.floor(Math.random() * newnames.length);
}
//_____________________________________end


//_____________________________________golbal values

let leftIndex;
let middleIndex;
let rightIndex;
//_____________________________________end


//_____________________________________render imgs
function createImg() {
  leftIndex = randImg();
  middleIndex = randImg();
  rightIndex = randImg();

  while (leftIndex === middleIndex || rightIndex === middleIndex) {
    leftIndex = randImg();
    rightIndex = randImg();
  }

  leftEL.setAttribute('title', newnames[leftIndex].name);

  middleEL.setAttribute('title', newnames[middleIndex].name);

  rightEL.setAttribute('title', newnames[rightIndex].name);

  newnames[leftIndex].views++;
  newnames[middleIndex].views++;
  newnames[rightIndex].views++;


}

createImg();
//_____________________________________end

//_____________________________________adding events
leftEL.addEventListener('click', getClicks);
rightEL.addEventListener('click', getClicks);
middleEL.addEventListener('click', getClicks);

let ulEL = document.getElementById('resultsContanier');

function getClicks(event) {
  if (att <= maxAtt) {
    let clickedimg = event.target.id;

    createImg();
    if (clickedimg === 'leftimg') {
      newnames[leftIndex].votes++;

    } else if (clickedimg === 'middleimg') {
      newnames[middleIndex].votes++;

    } else if (clickedimg === 'rightimg') {
      newnames[rightIndex].votes++;
    }
  } else {
    for (let i = 0; i < newnames.length; i++) {
      let liEL = document.createElement('li');
      liEL.textContent = `${newnames[i].name}img has ${newnames[i].views} views and ${newnames[i].votes} votes`;
      ulEL.appendChild(liEL);
    }
    leftEL.removeEventListener('click',getClicks);
    middleEL.removeEventListener('click',getClicks);
    rightEL.removeEventListener('click',getClicks);

  }
  att++;

}


