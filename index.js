let showContent=()=>{
let x=1;
let opControl = setInterval(() => {
    if (x <= 0) {
        clearInterval(opControl);
        clickMe.style.display = 'none';
    }
    clickMe.style.opacity = x;
    x -= 0.1;
}, 10);
let audio= new Audio("media/audioFx/jumpSoundEffect.mp3");
audio.play();
}

let coinEffect=()=>{
    coinBox.style.boxShadow='none';
    coin.style.visibility='visible';
    setTimeout(()=>{
        coinBox.style.boxShadow='0.5vh 0.5vh 0.5vh black';
        let x=1;
        let opControl=setInterval(()=>{
            if (x <= 0) {
                clearInterval(opControl);
                coin.style.visibility='hidden';
            }
            coin.style.opacity = x;
          x -= 0.1;
        },10)
    },100)
    let audio= new Audio("media/audioFx/coinSound.mp3");
audio.play();
}

const storageObjectJson = localStorage.getItem('storageObject');
const storageObject = storageObjectJson ? JSON.parse(storageObjectJson) : {
    taskArray: [],
    totalTaskCount: 0,
    completedTaskCount: 0,
};

const taskArray = storageObject.taskArray;
let taskCountNum = 0;

const storeTask = () => {
    const taskBox = document.getElementById('taskBox');
    const newTask = taskBox.value;
    taskArray.push({ taskText: newTask, taskIsDone: false });
    storageObject.totalTaskCount = taskArray.length;
    taskCountNum++;
    localStorage.setItem('storageObject', JSON.stringify(storageObject));
    location.reload();
}

const displayTask = () => {
    taskArray.forEach((element, index) => {
        if (element !== null) {
            const task = document.createElement('div');
            task.className = 'task';
            task.id = `task-${index}`;
            const taskText = document.createElement('div');
            taskText.className = 'taskText';
            taskText.id = `taskText-${index}`;
            taskText.textContent = `${element.taskText}`; 
            task.append(taskText);
            const buttons = document.createElement('div');
            buttons.className = 'buttons';
            buttons.id = `buttons${index}`;
            buttons.innerHTML =
                `<img src="media/images/tickMark.png" id="tickTask${index}"
            onclick="completedTask(${index})")>
            <img src="media/images/crossMark.png" id="crossTask${index}" onclick="deleteTaskFromArray(${index})">`;
            task.append(buttons);
            taskList.append(task);
            taskCountNum++;
            if(element.taskIsDone==true){
                let taskText=document.getElementById(`taskText-${index}`) ;
                taskText.classList.add('isComplete');
                let tickTask = document.getElementById(`tickTask${index}`);
             tickTask.style.display = 'none';
             let buttons = document.getElementById(`buttons${index}`);
             buttons.style.width = 'max-content';
             taskArray[index].taskIsDone = true;
             localStorage.setItem('storageObject', JSON.stringify(storageObject));
             }
        }

    });
    let clearAll=document.createElement('button');
    clearAll.id="clearAll";
    clearAll.textContent='Clear All';
    clearAll.addEventListener('click',()=>{
        localStorage.clear();
        audio.play();
    })
    if(taskArray.length==0)clearAll.style.backgroundColor='grey';
    inputForm.prepend(clearAll);
}

const completedTask = (index) => {
    let tickTask = document.getElementById(`tickTask${index}`);
    let buttons = document.getElementById(`buttons${index}`);
    buttons.style.width = 'max-content';
    taskArray[index].taskIsDone = true;
    
    let audio= new Audio("media/audioFx/completed.mp3");
audio.play();
setTimeout(()=>{
    tickTask.style.display = 'none';
    storageObject.completedTaskCount++;
    localStorage.setItem('storageObject', JSON.stringify(storageObject));
    completionCount.textContent = `Completed x ${storageObject.completedTaskCount}`;
    location.reload();
},1000)

}

const deleteTaskFromArray=(index)=>{
    storageObject.taskArray[index] = null;
    const taskCount = document.getElementById('taskCount');
    taskCount.textContent = `Task x ${--taskCountNum}`;
    localStorage.setItem('storageObject', JSON.stringify(storageObject));
    let elementID=`task-${index}`;
    task=document.getElementById(elementID);
    task.style.display='none';
    let audio= new Audio("media/audioFx/clearAll.mp3");
    audio.play();
    
}
let clearAll=()=>{
    // localStorage.clear();
    location.reload();
    console.log("helo")
}

 
let showMario=()=>{
    let mario=document.getElementById('mario');
    mario.style.display='block';
    let audio= new Audio("media/audioFx/it'sMeMario.mp3");
    audio.play();
    setTimeout(()=>{
        mario.style.display='none';
    },3400);
}

window.onload = function() {
    displayTask();
    const taskCount = document.getElementById('taskCount');
    taskCount.textContent = `Task x ${taskCountNum}`;
    const completionCount=document.getElementById('completionCount');
    completionCount.textContent = `Completed x ${storageObject.completedTaskCount}`;
    
}


let num=0; 
let goombaAnimation = () => {
    let margin = num;
    let direction = 1;
    let step = 1;

  
    let anim = setInterval(() => {
        let goombaWalking = document.getElementById("goombaWalking");
      if (margin >= 100) {
        direction = -1;
      } else if (margin <= 0) {
        direction = 1;
      }
      margin += step * direction;
      goombaWalking.style.marginLeft = `${margin}%`;
    }, 100);

  };
goombaAnimation()

let goombaDeath=()=>{
    let audio= new Audio("media/audioFx/goombaDeathEffect.mp3");
    audio.play();
    let goombaWalking = document.getElementById("goombaWalking");
    goombaWalking.style.display='none';
    setTimeout(()=>{
        goombaWalking.style.display='block'; 
    },5000)
}

let playMusic=false;
let marioTheme=new Audio("media/audioFx/superMarioBrosTheme.mp3");
let musicState=(cond)=>{
playMusic=cond;
if (playMusic){
    turnOffAudio.style.display='none';
    turnOnAudio.style.display='block';
    marioTheme.play();
}

else if (!playMusic){
    turnOffAudio.style.display='block';
    turnOnAudio.style.display='none';
    marioTheme.pause();
}
}




