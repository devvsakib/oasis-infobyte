const inputNote = document.querySelector('#inputNote');
let soundEffect = document.getElementById('sound');
let relaxingSound = document.getElementById('relax');
let allCompletedTask = document.getElementById('allCompletedTask');
let completedNumber = document.getElementById('completedNumber');
let rainy = document.getElementById('playSound');
let close = document.querySelector('.close');
let open = document.querySelector('.completed');

open.addEventListener('click', () => {
    document.querySelector('.taskC').classList.add('open')
})
close.addEventListener('click', () => {
    document.querySelector('.taskC').classList.add('hide')
    document.querySelector('.taskC').classList.remove('open')
})
rainy.addEventListener('click', () => {
    if (!rainy.classList.contains('play')) {
        rainy.classList.add("play")
        rainy.src = "./pause-solid.svg"
        relaxingSound.src = "./relax.mp3";
        relaxingSound.loop = true
        relaxingSound.play()
        console.log("Playing...");
    }
    else {
        rainy.classList.remove("play")
        rainy.src = "./play-solid.svg"
        relaxingSound.src = "";
        relaxingSound.pause()
        console.log("Paused");
    }
})


funcy();
inputNote.addEventListener('click', () => {
    let addNote = document.getElementById('addNote');
    let localData = localStorage.getItem('noteSame');
    if (localData == null) {
        allnote = [];
    }
    else {
        allnote = JSON.parse(localData);
    }
    if (addNote.value) {
        allnote.push(addNote.value);
        soundEffect.src = "./ting.mp3"
        soundEffect.play()
    }
    localStorage.setItem('noteSame', JSON.stringify(allnote));
    addNote.value = "";
    funcy();
});



function funcy() {
    let localData = localStorage.getItem('noteSame');
    let complTa = localStorage.getItem('completedTask');
    let completedTask = localStorage.getItem('completedTask');

    if (complTa == null) {
        completedNumber.innerText = 0;
        completedNumber.style.color = "red"
        complete = [];
    }
    else {
        complete = JSON.parse(complTa);
        completedNumber.innerText = JSON.parse(completedTask).length;
    }
    if (localData == null) {
        allnote = [];
    }
    else {
        allnote = JSON.parse(localData);
    }
    let a = JSON.parse(completedTask)
    let html = '';
    let comp = '';
    allnote.forEach((e, index) => {
        html += `
        <div class="todoCard my-2 mx-3 p-4">
            <h5 class="card-title">${index + 1}</h5>
            <p class="card-text">${e}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-outline-danger">Delete</button>
            <button id="${index}" onclick="completedNote(this.id)" class="btn btn-outline-success">Complete</button>
        </div>
        `
    });

    let pushNote = document.getElementById('pushNote');
    if (allnote.length != 0) {
        pushNote.innerHTML = html;
    }
    else {
        pushNote.innerHTML = `List is empty📃`;
    }

    a.forEach((e, index) => {
        comp += `
        <div class="col todoCard my-2 mx-3 p-4">
        <h5 class="card-title">${index + 1}</h5>
        <p class="card-text">${e}</p>
        <button id="${index}" onclick="deleteCoomplete(this.id)" class="btn btn-outline-danger">Delete</button>
        </div>
        `
    });
    let compTask = document.getElementById('pushComplete');
    if (a.length != 0) {
        compTask.innerHTML = comp;
    } else {
        compTask.innerHTML = "Ops, No task Completed📃"
    }

}

function deleteNote(index) {
    let localData = localStorage.getItem('noteSame');
    if (localData == null) {
        allnote = [];
    }
    else {
        allnote = JSON.parse(localData);
    }
    allnote.splice(index, 1);
    soundEffect.src = "./delete.mp3"
    soundEffect.play()
    localStorage.setItem('noteSame', JSON.stringify(allnote));
    funcy();
};

function completedNote(index) {
    let localData = localStorage.getItem('noteSame');
    let complTa = localStorage.getItem('completedTask');
    if (localData == null) {
        allnote = [];
    }
    else {
        allnote = JSON.parse(localData);
    }
    if (complTa == null) {
        complete = [];
    }
    else {
        complTa = JSON.parse(complTa);
    }
    if (complTa) {
        complete.push(allnote.splice(index, 1))
        soundEffect.src = "./delete.mp3"
        soundEffect.play()

    }
    localStorage.setItem('noteSame', JSON.stringify(allnote));
    localStorage.setItem('completedTask', JSON.stringify(complete));
    funcy();
};
function deleteCoomplete(index) {
    let complTa = localStorage.getItem('completedTask');
    if (complTa == null) {
        complete = [];
    }
    else {
        complete = JSON.parse(complTa);
    }
    complete.splice(index, 1);
    soundEffect.src = "./delete.mp3"
    soundEffect.play()
    localStorage.setItem('completedTask', JSON.stringify(complete));
    funcy();
};
/*
let txtSearch = document.getElementById('txtSearch');

txtSearch.addEventListener('input', () => {
    let getinputTxt = txtSearch.value.toLowerCase();
    Array.from(document.getElementsByClassName("card")).forEach(element => {
        let getTxt = element.getElementsByTagName("p")[0].innerText;
        if (getTxt.includes(getinputTxt)) {

            element.style.display = "block";

        }
        else {
            element.style.display = "none";
        }
    });

});
*/