const searchField = document.getElementById('search-text');
const searchButton = document.getElementById('search-button');
const searchResultContainer = document.getElementById('search-result-contrainer');

// searchButton.addEventListener('click', ()
const loadData = () => {
    const searchText = searchField.value;
    searchField.value = '';
    searchResultContainer.innerHTML = '';
    document.getElementById('total-items').innerText = '--';
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data))
};

const displayBooks = (books) => {
    document.getElementById('total-items').innerText = books.numFound;
    // console.log(books);
    books.docs.forEach(book => {
        // console.log(book.title);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img src=" https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="">
            <div class="card-body">
                <p class="card-title"><span class="fw-bold">Book Name:</span> ${book.title}</p>
                <p><span class="fw-bold">Book Author:</span> ${book.author_name}</p>
                <p><span class="fw-bold">Publisher Name:</span> ${book.publisher}</p>
                <p><span class="fw-bold">First Published:</span> ${book.first_publish_year}</p>
            </div>
        </div>
        `;
        searchResultContainer.appendChild(div);
    });
};