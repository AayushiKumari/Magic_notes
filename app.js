//<a class="navbar-brand" href="#">Smart Notes</a>
//<li onclick="deleteNote(${index})"><i class="uil uil-trash"></i>Delete</li> 
//<li onclick="editNote(${index})"><i class="uil uil-pen"></i>Edit</li> 
// <td><li id="${index}" onclick="editNote(this.id)"><i class="fas fa-edit"></i></li></td>
//<li id="${index}" onclick="deleteNote(this.id)"><i class="fas fa-trash-alt"></i></li>
console.log("Welcome to smart note app.");
showNotes();
const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];

let addBtn = document.getElementById('addBtn');
let addTxt = document.getElementById("addTxt");
let addTitle = document.getElementById("addTitle");
addBtn.addEventListener("click", function (e) {
  
    

    if (addTitle.value=="" || addTxt.value == "") {
        return alert('Empty Note !! please "Add a Note" or a "Title" first. ')
    }
    let dateObj = new Date(),
    month = months[dateObj.getMonth()],
    day = dateObj.getDate(),
    year = dateObj.getFullYear()
    hour=dateObj.getHours();
    min=dateObj.getMinutes();
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        
        title:addTitle.value,
        text:addTxt.value,
        date: `${month} ${day}, ${year}`,
    }
    // notesObj.push(addTxt.value);
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTitle.value="";
    addTxt.value = "";
    //console.log(notesObj);
    showNotes();
})

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class=" noteCard my-2 mx-2 card shadow p-3 mb-5 bg-white rounded" style="width: 18rem;">
          
            <div class="card-body" >
              <h5 class="card-title" style="font-weight:600;">${element.title}</h5>
              <div class="textDiv">
              <span class="pa">${element.text}</span>
                </div>
            
            <div class=" mt-3 bottom-content">
                <span>${element.date}</span>
                <div class="operation ">
                <td><li id="${index}" onclick="editNote(this.id)"><i class="fas fa-edit"></i></li></td>
                 <td><li id="${index}" onclick="deleteNote(this.id)"><i class="fas fa-trash-alt"></i></li></td>
                 </div>
                    
        
            </div>
          </div>

        </div>`;

    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = 'Nothing to show! Use "Add a Note" section above to add notes.'
    }
}
function showMenu(elem) {
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != elem) {
            elem.parentElement.classList.remove("show");
        }
    });
}

function deleteNote(index) {
    //console.log('I am deleting',index);
    let confirmDel = confirm('Are you sure ? you want to delete.');
   
    if(confirmDel==true){
        let notes = localStorage.getItem("notes");
        if (notes == null) {
            notesObj = [];
        }
        else {
            notesObj = JSON.parse(notes);
        }
        notesObj.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        showNotes();
    }
}

function editNote(index) {
   
    let notes = localStorage.getItem("notes");
    if (addTitle.value !== "" || addTxt.value !== "") {
        return alert('Please "clear the form" first');
    }
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    addTitle.value=notesObj[index].title;
    addTxt.value=notesObj[index].text;
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();

}
let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase();
   // .toLowerCase();

    //console.log('Input Event fired !',inputVal);

    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByClassName("card-title")[0].innerText;
        let cardTxt2 = element.getElementsByClassName("pa")[0].innerText;
        if ( cardTxt2.includes(inputVal)||cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})