$(document).ready(function () {
    $.ajaxSetup({cache: false});
    getNewQuote();
});
$('.twitter-share-button').click(function () {
    window.open('https://twitter.com/intent/tweet?text="' +
        $('#content').text() + '" ' +
        $('#author').text());
});
$('button').click(function () {
    getNewQuote();
});
function changeText(response) {
    var content = $(response.content).text();
    $("#content").text(content);
    $("#author").text(response.title);
}

function getNewQuote() {
    $.getJSON("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=", function (a) {
        var quote = $('.quote');
        if ($("#content").text() == "") {
            changeText(a[0])
        } else {
            quote.addClass('animated hinge');
            quote.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                changeText(a[0]);
                quote.removeClass('animated hinge');
            });
        }

    });
}

