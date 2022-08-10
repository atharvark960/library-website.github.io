console.log(`This is a library website`);

window.addEventListener(`load`, function () {
    let element = document.getElementById(`dialogBox`);
    element.classList.toggle(`active`);
})
showBooks();

function toggle() {
    let element = document.getElementById(`dialogBox`);
    let toggle = element.classList.toggle(`active`);
}

function dialogBox() {
    let userName = localStorage.getItem(`userName`);
    if (userName == "") {
        let element = document.getElementById(`dialogBox`);
        let toggle = element.classList.toggle(`active`);
        if (toggle == false) {
            userName.value = "";
        }
    }
    else {
        setTimeout(function () {
            window.scrollTo(0, 700);
        }, 2);
    }
}

class Book {
    constructor(givenbookName, givenauthorName, givengivenGenre) {
        this.bookName = givenbookName;
        this.authorName = givenauthorName;
        this.genre = givengivenGenre;
    }
}

let submit = document.getElementById(`submit`);
submit.addEventListener(`click`, function (e) {
    let userNames = localStorage.getItem(`userNames`);
    if (userNames == null) {
        users = [];
    }
    else {
        users = JSON.parse(userNames);
    }
    let userName = document.getElementById(`userName`);
    if (userName.value != "") {
        localStorage.setItem(`userName`, userName.value);
    }
    console.log(userName.value)
    let flag = 1;
    users.forEach(function (element, index) {
        if (element.name == userName.value) {
            flag = 0;
        }
    })
    if (flag == 1) {
        let userObj = {
            name: userName.value,
            books: []
        }
        users.push(userObj);
        localStorage.setItem(`userNames`, JSON.stringify(users));
    }
    dialogBox();
    toggle();
    showBooks();
})

let submit2 = document.getElementById(`submit2`);
submit2.addEventListener(`click`, function (e) {
    e.preventDefault();
    let bookName = document.getElementById(`bookName`);
    let authorName = document.getElementById(`authorName`);
    let genre = document.getElementById(`genre`);
    let userName = localStorage.getItem(`userName`);
    let userNames = localStorage.getItem(`userNames`);
    if (userNames == null) {
        users = [];
    }
    else {
        users = JSON.parse(userNames);
    }
    if ((bookName.value == "") || (authorName.value == "") || (genre.value == "")) {
        console.log(`Please fill all the fields`);
    }
    else {
        let bookObj = new Book(bookName.value, authorName.value, genre.value);
        users.forEach(function (element, index) {
            if (element.name == userName) {
                element.books.push(bookObj);
            }
            console.log(element.books);
        });
        localStorage.setItem(`userNames`, JSON.stringify(users));
    }
    bookName.value = "";
    authorName.value = "";
    genre.value = "";
    showBooks();
});

let returnBtn = document.getElementsByClassName(`returnBtn`);
returnBtn.addEventListener(`click`, function (e) {
    let userNames = localStorage.getItem(`userNames`);
    if (userNames == null) {
        users = [];
    }
    else {
        users = JSON.parse(userNames);
    }
    console.log(`Book returned`);
});

function showBooks() {
    let userNames = localStorage.getItem(`userNames`);
    if (userNames == null) {
        users = [];
    }
    else {
        users = JSON.parse(userNames);
    }
    let userName = localStorage.getItem(`userName`);
    let html = "";
    let tBody = document.querySelector(`tbody`);
    let msg = document.getElementById(`msg`);
    let message = `<p>You have no issued books yet...</p>`;
    // console.log(`hi`);
    users.forEach(function (element, index) {
        if (element.name == userName) {
            if (element.books == null) {
                msg.appendChild(message);
                console.log(message);
            }
            else {
                element.books.forEach(function (element, index) {
                    html += `<tr>
                    <td>${index + 1}</td>
                    <td>${element.bookName}</td>
                    <td>${element.authorName}</td>
                    <td>${element.genre}</td>
                    <td class="returnBtn"><button>Return</button></td>
                    </tr>`;
                })
                tBody.innerHTML = html;
            }
        }
    })
}

function returnBook() {

}


