$("#btnScrape").on("click", function () {
    $.ajax({
        type:"GET",
        url:"/articles"
    }).then(function(response) {
        console.log(response);

        const articleResults = $("#results");
        articleResults.empty();

        for (i = 0; i < response.length; i++) {
            const article = response[i];

            const btnSaveArticles = $("<button>")
                .addClass("btnSaveArticles")
                .text("Save")
                .attr("id", article._id);

            const title = $("<div>")
                .addClass("title")
                .text(article.title)
                .append(btnSaveArticles);

            const link = $("<a>")
                .addClass("link")
                .text(article.link)
                .attr("href", article.link)
                .attr("target", "_blank");

            const summary = $("<p>")
                .addClass("summary")
                .text(article.summary)

            const listItem = $("<li>")
                .addClass("article")
                .append(title, link, summary);

            articleResults.append(listItem);
        }
        $("#scrapedArticles").show(20);
        $("#container").hide();
    });
       
});

//click event in this format since button dynamically reated
$(document).on("click", '.btnSaveArticles', function(){
    var articleId = $(this).attr('id');
    console.log("Article ID: " + articleId);

    $.ajax({
        type: "PUT", //use put because article already exists
        url: "/articles/saved/" + articleId,
    }).then(function(response) {
        console.log(JSON.stringify(response));        
    });
});