const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const spinner = document.getElementById("spinner");

let apiQuotes = [];

// show spinner
function showSpinner() {
  spinner.hidden = false;
  quoteContainer.hidden = true;
}

function removeSpinner() {
  spinner.hidden = true;
  quoteContainer.hidden = false;
}

function newQuote() {
  showSpinner();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // if author is blank add Unknown
  quote.author
    ? (authorText.textContent = quote.author)
    : (authorText.textContent = "Unknown");

  // reduce font size for long quotes
  quote.text.length > 120
    ? quoteText.classList.add("long-quote")
    : quoteText.classList.remove("long-quote");
  quoteText.textContent = quote.text;

  removeSpinner();
}

// Get quotes from API
async function getQuotes() {
  showSpinner();

  /*
  if cors problem occurs this is the way to fix this
  const proxyUrl = "https://cors-anywhere.herokuapp.com/"
  const response = await fetch(proxyUrl+apiUrl);
  */
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    console.log("No Quotes", error);
  }
}

// Tweet Quote
function tweetQuote() {
  // twitter web indent
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;

  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

getQuotes();
