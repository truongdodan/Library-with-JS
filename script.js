const bookList = [];

//Constructor for book
function Book(author, title, pages, haveRead) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.haveRead = haveRead;
}

//Add some fixed object
const book1 = new Book('J.K Rowling', 'Harry Potter and the Phylosopher\'s Stone', 223, false);
const book2 = new Book('J.R.R Tolkien', 'The Lord Of The Rings: The Two Towers', 448, true);
const book3 = new Book('Jane Austen', 'Pride and Prejudice', 362, true);
bookList.push(book1);
bookList.push(book2);
bookList.push(book3);

//Function for adding book
function addOneBook(book) {
    bookList.push(book);
}

//Function for display books from array to table in webpage
const tableBody = document.querySelector('#bookTable').querySelector('tbody');  //Get table reference
function displayBook(index) {
    const newRow = tableBody.insertRow(tableBody.rows.length); //Create new table row

        //Create new cell in new row and insert data from bookList to it
        const indexNumber = newRow.insertCell(0);
        const author = newRow.insertCell(1);
        const title = newRow.insertCell(2);
        const pages = newRow.insertCell(3);
        const haveRead = newRow.insertCell(4);
        const actionButton = newRow.insertCell(5);

        indexNumber.innerHTML = `${index + 1}`;
        author.innerHTML = `${bookList[index].author}`;
        title.innerHTML = `${bookList[index].title}`;
        pages.innerHTML = `${bookList[index].pages}`;
        haveRead.innerHTML = `
            ${bookList[index].haveRead ? 'Have read' : 'Not read yet'}
        `;
        haveRead.id = `book${index}HaveRead`;   //Add id to Have read cell for modifying
        actionButton.innerHTML = `
                <button id = "removeBookNumber${index}Button" class="action-button remove">Remove</button>
                ${bookList[index].haveRead ? `<button id = "checkHaveRead${index}Button" class="change-read-status">Unmark read</button>` : `
                                              <button id = "checkHaveRead${index}Button" class="change-read-status action-button">Mark read</button>`}
        `;

        //Event for removing book
        document.getElementById(`removeBookNumber${index}Button`).addEventListener('click', () => {
            bookList.splice(index, 1);

            //tableBody.deleteRow(index);
            displayBookList();
        });

        //Event for marking the book as Have read
        document.getElementById(`checkHaveRead${index}Button`).addEventListener('click', () => {
            let readStatusCell = document.getElementById(`book${index}HaveRead`);
            let changeCheckStatusButton = document.getElementById(`checkHaveRead${index}Button`)

            if(bookList[index].haveRead == false) {
                bookList[index].haveRead = true;
                
                //Update book information on table
                readStatusCell.innerText = bookList[index].haveRead ? "Have read" : "Not read yet";
                changeCheckStatusButton.classList.toggle('action-button');
                

                return;
            }

            bookList[index].haveRead = false;
            readStatusCell.innerText = bookList[index].haveRead ? "Have read" : "Not read yet";
            changeCheckStatusButton.classList.toggle('action-button');

        });
}

function displayBookList() {
    //Show book infor to the table
    tableBody.innerHTML = '';
    for(let i = 0; i < bookList.length; i++) {
        displayBook(i);
    }

}

// Set up event for adding book from the interface
const bookAddingForm = document.getElementById('bookAddingForm');
bookAddingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const author = document.getElementById('author').value;
    const title = document.getElementById('title').value;
    const pages = document.getElementById('pages').value;
    const haveRead = document.getElementById('have-read').checked;

    //Create new book object and add it to the book list array
    const newBook = new Book(author, title, pages, haveRead);
    addOneBook(newBook);

    //Update book table display
    displayBook(bookList.length - 1);

    //Clear form
    document.querySelector('#bookAddingForm input[type=\'reset\'').click();
})

displayBookList();
