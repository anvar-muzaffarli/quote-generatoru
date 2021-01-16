const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//Loadingi Goster

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//gizle loadinfg

function removeLoadingSpinner() {
    if(!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}



// Get Quote from API

async function getQuote() {
    showLoadingSpinner();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // eger Author yoxdursa ashagidaki cumleni elave edece GIGBEW
        if (data.quoteAuthor === '') {
            authorText.innerText = 'Gagash is Gonna Be EveryWhere';
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        // font size azaldir

        if(data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        removeLoadingSpinner();
        throw new Error('Zoor');    
    }   catch (error) {
        getQuote();
    }
}

function quoteTweet() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');

}

//event listenerler

newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', quoteTweet);


// On Load
getQuote();
showLoadingSpinner();