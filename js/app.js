const searchField = document.getElementById('search-text');
const searchResultContainer = document.getElementById('search-result-contrainer');
const errorMessage = document.getElementById('errorDiv');
const spinner = document.getElementById("spinner");

const loadData = () => {
    // if (searchField.innerText === '') {
    // errorDiv.innerText = "Search field cannot be empty.";
    // }
    errorMessage.style.display = 'none';

    const searchText = searchField.value;
    searchResultContainer.innerHTML = '';
    document.getElementById('search-page-ui').style.display = 'none';
    // document.getElementById('total-items').innerText = '--';
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

const displayBooks = (books) => {
    if (searchField.value === '') {
        errorMessage.style.display = 'block';
        errorMessage.style.color = 'red';
        errorMessage.innerText = `Search Field Can't Be Empty.`;
    }
    else if (books.numFound === 0) {
        errorMessage.style.display = 'block';
        errorMessage.style.color = 'red';
        errorMessage.innerText = `No Result Found For "${searchField.value}"`;
    } else {
        errorMessage.style.display = 'block';
        errorMessage.style.color = 'green';
        errorMessage.innerText = `${books.numFound} Items Found For "${searchField.value}"`;
    }
    books.docs.splice(0, 25).forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" height="450px" class="card-img-top" alt="">
            <div class="card-body">
                <p class="card-title"><span class="fw-bold">Book Name:</span> ${book.title}</p>
                <p><span class="fw-bold">Book Author:</span> ${book.author_name}</p>
                <p><span class="fw-bold">Publisher Name:</span> ${book.publisher.splice(0, 2)}</p>
                <p><span class="fw-bold">First Published:</span> ${book.first_publish_year}</p>
            </div>
        </div>
        `;
        searchResultContainer.appendChild(div);
    });
};