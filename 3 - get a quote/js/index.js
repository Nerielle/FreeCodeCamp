$(document).ready(function () {
    $.ajaxSetup({cache: false});
});
$('button').click(function () {

    $.getJSON("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=", function (a) {
        var quote = $('.quote');
        quote.addClass('animated hinge');
        quote.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            var content = $(a[0].content).text();
            $(".quote .content").text(content);
            $(".quote .author").text(a[0].title);
            quote.removeClass('animated hinge');
        });

    });
});
