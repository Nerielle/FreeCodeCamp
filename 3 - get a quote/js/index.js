$(document).ready(function () {
    $.ajaxSetup({
        cache: false
    });
    getNewQuote();
});
var quotes = [];
var quoteText = $("#text")
$('.twitter-share-button').click(function () {
    window.open('https://twitter.com/intent/tweet?text="' + $('#text').text() + '" ' + $('#author').text());
});
$('button').click(function () {
    getNewQuote();
});

function changeText() {
    var quote = quotes.pop();
    quoteText.text(quote.text);
    $("#author").text(quote.author);
    console.log(quotes.length);
}

function getNewQuote() {
    if (quotes.length != 0) {
        changeText();
        return;
    }
    $.getJSON('https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand', function (result) {
        try {
            console.log('New result from server', result);
            if (result == null || result.length == 0) {
                throw new Error('The server is not responding. Try again later.')
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
            changeText();
        }
        catch (error) {
            console.log(error);
            quoteText.text(error);
        }
    });
}