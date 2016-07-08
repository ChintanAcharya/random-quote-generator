var paint = function() {
    // Generate random color
    var c = "";
    var r = Math.floor(Math.random() * 128);
    var g = Math.floor(Math.random() * 128);
    var b = Math.floor(Math.random() * 128);

    // Paint elements with new color
    c = "rgb(" + r + "," + g + "," + b + ")";
    $("body").css("background-color", c);
    $(".container").css("color", c);
    $(".container").css("border-color", c);
    $("#social, .clickme").css("background-color", c);
    $("#social, .clickme").css("color", "white");

};

var generateQuote = function() {
    // Make an AJAX request to get quote
    $.ajax({
        type: "GET",
        url: "http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en",
        dataType: 'jsonp',
        jsonp: 'jsonp',
        jsonpCallback: 'cb',
        crossDomain: true,
        success: function(data) {
            $('.quote h1').html("<i class='fa fa-quote-left'></i>&nbsp;&nbsp;" + data["quoteText"]);
            if (data["quoteAuthor"] !== "") {
                $('.author h2').html(" - " + data["quoteAuthor"]);
            } else {
                // Blank author
                $('.author h2').html(" - Unknown");
            }
        }
    });

}

var tweet = function() {
    const tweetBaseUrl = 'https://twitter.com/intent/tweet?hashtags=quotes&text=';
    var t = $(".quote h1").html();
    t = t.slice(44);
    var win = window.open(tweetBaseUrl + encodeURIComponent(t), '_blank');
    win.focus();
}

$(document).ready(function() {
    paint();
    generateQuote();

    $(".clickme").click(function() {
        $('.quote h1, .author h2').fadeOut(200);
        setTimeout(function() {
            $('.quote h1, .author h2').fadeIn(200);
        }, 800);
        generateQuote();
        paint();
    });

    $("#social").click(function() {
        tweet();
    })
});
