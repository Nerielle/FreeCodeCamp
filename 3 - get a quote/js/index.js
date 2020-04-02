$(document).ready(function () {
    $.ajaxSetup({
        cache: false
    });
    getNewQuote();
});
const projectName = "random-quote-machine";
localStorage.setItem('example_project', 'Randowm Quote Machine');
var quotes = [];
var quoteText = $("#text")
const errorClass = 'error';
$('button').click(function () {
    getNewQuote();
});

function changeText(quote, author = '') {
    quoteText.text(quote);
    $("#author").text(author);
}

function changeQuote() {
    var quote = quotes.pop();
    console.log(quotes.length);
    var text = jQuery(quote.text).text();
    changeText(text, quote.author);
    $('.twitter-share-button').attr('href', 'https://twitter.com/intent/tweet?text=' + encodeURIComponent('"' + text + '" ' + quote.author));
    quoteText.removeClass('error');
}

function getNewQuote() {
    if (quotes.length != 0) {
        changeQuote();
        return;
    }
    $.getJSON('https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand', function (result) {
        try {
            console.log('New result from server', result);
            if (result == null || result.length == 0) {
                throw new Error('The server is not responding. Try again later.');
            }
            if (quotes.length === 0) {
                quotes = result.map(x => {
                    let quote = {
                        text: x.content.rendered
                        , author: x.title.rendered
                    }
                    return quote;
                });
            }
            changeQuote();
        }
        catch (error) {
            console.log(error);
            changeText(error.message);
            quoteText.addClass(errorClass);
        }
    });
}