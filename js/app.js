'use strict';

let leftEL = document.getElementById('leftimg');
let middleEL = document.getElementById('middleimg');
let rightEL = document.getElementById('rightimg');
let butEL = document.getElementById('resultsClick');
butEL.addEventListener('click' , getResults);



let mallArr = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];

let newnames = [];
let att = 1;
let maxAtt = 3;
let chartNames = [];
let votesChart =[];
let viewsChart =[];
let iterImg=[];




//_____________________________________local storage
function mylocalStorage(){
  let dataSet = JSON.stringify(newnames);
  let viewSet = JSON.stringify(viewsChart);
  let voteSet = JSON.stringify(votesChart);
  let imgSet = JSON.stringify(iterImg);
  console.log(voteSet);

  localStorage.setItem =('localData',dataSet);
  localStorage.setItem=('localview',viewSet);
  localStorage.setItem=('localVotes',voteSet);
  localStorage.setItem=('localImg',imgSet);

}

function readLocalStorage(){
  let strData = localStorage.getItem('localData');
  let strView = localStorage.getItem('localview');
  let strVote = localStorage.getItem('localVotes');
  let strImg = localStorage.getItem('localImg');

  let obData = JSON.parse(strData);
  let obViews = JSON.parse(strView);
  let obVote = JSON.parse(strVote);
  let obImg = JSON.parse(strImg);

  if(obData !== null){
    newnames = obData;
    createImg();

  }
  if(obViews !== null){
    viewsChart = obViews;
    createImg();
  }
  if(obVote !== null){
    votesChart = obVote;
    createImg();
  }
  if(obImg !== null){
    iterImg = obImg;
    createImg();
  }

}

readLocalStorage();
//_____________________________________end

//_____________________________________ Constructer
function Busmall(imgNamee) {
  this.name = imgNamee.split('.')[0];
  this.img = 'imgs/' + imgNamee;
  this.views = 0;
  this.votes = 0;
  chartNames.push(this.name);
  newnames.push(this);
  mylocalStorage();
}

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

  while (leftIndex === middleIndex || rightIndex === middleIndex || leftIndex=== rightIndex || iterImg.includes(leftIndex) || iterImg.includes(middleIndex) || iterImg.includes(rightIndex)) {
    leftIndex = randImg();
    middleIndex = randImg();
    rightIndex = randImg();
  }

  iterImg=[];
  iterImg.push(leftIndex);
  iterImg.push(middleIndex);
  iterImg.push(rightIndex);

  leftEL.setAttribute('src', newnames[leftIndex].img);
  leftEL.setAttribute('title', newnames[leftIndex].name);


  middleEL.setAttribute('src', newnames[middleIndex].img);
  middleEL.setAttribute('alt', newnames[middleIndex].name);

  rightEL.setAttribute('src', newnames[rightIndex].img);
  rightEL.setAttribute('alt', newnames[rightIndex].name);

  newnames[leftIndex].views++;
  newnames[middleIndex].views++;
  newnames[rightIndex].views++;
  mylocalStorage();


}

createImg();
//_____________________________________end

//_____________________________________adding events
let ulEL = document.getElementById('resultsContanier');
leftEL.addEventListener('click', getClicks);
rightEL.addEventListener('click', getClicks);
middleEL.addEventListener('click', getClicks);



function getClicks(event) {
  event.preventDefault();
  if (att <= maxAtt) {
    let clickedimg = event.target.id;
    att++;

    createImg();
    if (clickedimg === 'leftimg') {
      newnames[leftIndex].votes++;
    } else if (clickedimg === 'middleimg') {
      newnames[middleIndex].votes++;

    } else if (clickedimg === 'rightimg') {
      newnames[rightIndex].votes++;
    }
  }

}
//_____________________________________end

//_____________________________________button function
function getResults(){
  ulEL.textContent='';

  for (let i = 0; i < newnames.length; i++) {
    let liEL = document.createElement('li');
    liEL.textContent = `${newnames[i].name}img has ${newnames[i].views} views and ${newnames[i].votes} votes`;
    ulEL.appendChild(liEL);
    votesChart.push(newnames[i].votes);
    viewsChart.push(newnames[i].views);
  }
  let h1EL = document.getElementById('h1');
  h1EL.textContent=('Here are your results:');
  let h2EL = document.getElementById('h12');
  h2EL.textContent = ('Chart is below:');

  leftEL.removeEventListener('click',getClicks);
  middleEL.removeEventListener('click',getClicks);
  rightEL.removeEventListener('click',getClicks);
  // createImg();
  majedChart();

}
//_____________________________________end




//_____________________________________chart function
function majedChart(){
  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: chartNames,
      datasets: [{
        label: '# of Votes',
        data: votesChart,
        backgroundColor: [
          'rgba(67, 23, 456, 123)',
        ],
        borderColor: [
          'rgba(55, 19, 112, 31)',
        ],
        borderWidth: 1
      },{
        label: '# of Views',
        data: viewsChart,
        backgroundColor: [
          'rgba(235, 39, 332, 3.2)',
        ],
        borderColor: [
          'rgba(11, 19, 32, 1)',
        ],
        borderWidth: 1
      }]
    },
    options: { responsive: false,
      maintainAspectRatio: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
//_____________________________________end



