const searchField = document.getElementById('search-text');
const searchResultContainer = document.getElementById('search-result-contrainer');
const searchResultMsg = document.getElementById('search-result-msg');
const spinner = document.getElementById("spinner");

// Fetch Data From API Based On Search Text
const loadData = () => {
    const searchText = searchField.value;
    searchResultMsg.style.display = 'none';
    searchResultContainer.innerHTML = '';
    document.getElementById('search-page-ui').style.display = 'none';
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    spinner.classList.remove("d-none");
    fetch(url)
        .then(res => res.json())
        .then(data => {
            spinner.classList.add("d-none");
            displayBooks(data)
        })
        .finally(() => {
            searchField.value = '';
        });
};
// Search Result Message Block When Error Occured
const errorBlock = () => {
    searchResultMsg.style.display = 'block';
    searchResultMsg.style.color = 'red';
}
// Display Data Based On Search Text
const displayBooks = (books) => {
    // Search Result Message (Error & Total Items Found Message)
    if (searchField.value === '') {
        errorBlock();
        searchResultMsg.innerText = `Search Field Can't Be Empty.`;
    }
    else if (books.numFound === 0) {
        errorBlock();
        searchResultMsg.innerText = `No Result Found For "${searchField.value}"`;
    } else {
        searchResultMsg.style.display = 'block';
        searchResultMsg.style.color = 'green';
        searchResultMsg.innerText = `${books.numFound} Items Found For "${searchField.value}"`;
    }
    books.docs.splice(0, 25).forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" height="450px" class="card-img-top" alt="">
            <div class="card-body">
                <p class="card-title"><span class="fw-bold">Book Name:</span> ${book.title}</p>
                <p><span class="fw-bold">Book Author:</span> ${book.author_name?.[0]}</p>
                <p><span class="fw-bold">Publisher Name:</span> ${book.publisher?.[0]}</p>
                <p><span class="fw-bold">First Published:</span> ${book.first_publish_year}</p>
            </div>
        </div>
        `;
        searchResultContainer.appendChild(div);
    });
};