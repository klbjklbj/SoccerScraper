//Putting AJAX calls in functions to make things easier to understand


let articleIdFromNote;

//using the word "unsave" since article not deleted, just removed from saved category
const unsaveArticle = function(articleId) {

    $.ajax({
        type: "PUT", //put because article already exists
        url: "/articles/unsave/" + articleId,
    }).then(function(response) {
        //console.log(JSON.stringify(response));
        displaySaved();
    });
 };

const saveNewNote = function(articleId) {
    var newNoteText = $("#noteTextInput").val();
    
    $.ajax({
        type:"POST",
        url:"/notes/save/" + articleId,
        data: { body: newNoteText, article: articleId }
    }).then(function(response){
        console.log(response);
        displayNotes(articleId);
    }); 
};

var displayNotes = function(articleId) {
    $.ajax({
        type:"GET",
        url:"/notes/show/" + articleId
    }).then(function(response) {
        
        //hide saved articles and show notes
        document.getElementById("saved").style.display="none";
        document.getElementById("notes").style.display="block";
        
        const saveNoteInput = $("#btnDynAddNote");
        saveNoteInput.empty();
        
        const saveNoteButton = $("<button>")
            .attr("id", articleId)
            .addClass("saveNoteButton")
            .attr("type", "button")
            .text("Save");
        
        saveNoteInput.append(saveNoteButton);
        
        const savedNotes = $("#savedArticleNotes");
        savedNotes.empty();

        console.log(response);
        
        for (i = 0; i < response.note.length; i++) {
            var savedNote = response.note[i];;
            console.log(savedNote);

            const btnDeleteNote = $("<button>")
                .addClass("btnDeleteNote")
                .text("Delete")
                .attr("id", savedNote._id);

            const noteText = $("<p>")
                .addClass("noteText")
                .text(savedNote.body);

            const listItem = $("<li>")
                .addClass("articleNote")
                .append(noteText, btnDeleteNote);

            savedNotes.append(listItem);

        }

        $("#hideNotes").on("click", function() {
            document.getElementById("notes").style.display="none";
            document.getElementById("saved").style.display="block";
        });

        $(".saveNoteButton").on("click", function() {
            var articleId = $(this).attr('id');
            saveNewNote(articleId);
        });

        $(".btnDeleteNote").on("click", function() {
            var noteId = $(this).attr('id');
            articleIdFromNote = savedNote.article;
            console.log("deleteNoteButton clicked.");
            console.log(articleIdFromNote);
            deleteNote(noteId);
        });

        document.getElementById('noteTextInput').value="";
    });
};

const deleteNote = function(noteId) {
    $.ajax({
        type: "DELETE",
        url: "/notes/delete/" + noteId
    }).then(function(response) {
        displayNotes(articleIdFromNote);
    });
};

const displaySaved = function() {
    $.ajax({
        type:"GET",
        url:"/articles/saved/show/"
    }).then(function(response) {
        console.log(response);

        const savedArticleResults = $("#savedArticles");
        savedArticleResults.empty();

        for (i = 0; i < response.length; i++) {
            const savedArticle = response[i];

            const deleteButton = $("<button>")
                .addClass("deleteButton")
                .text("Delete")
                .attr("id", savedArticle._id);

            const notesButton = $("<button>")
                .addClass("notesButton")
                .text("Notes")
                .attr("id", savedArticle._id);

            const title = $("<div>")
                .addClass("title")
                .text(savedArticle.title)
                .append(deleteButton)
                .append(notesButton);

            const link = $("<a>")
                .addClass("link")
                .text(savedArticle.link)
                .attr("href", savedArticle.link)
                .attr("target", "_blank");

            const summary = $("<p>")
                .addClass("summary")
                .text(savedArticle.summary);

            const listItem = $("<li>")
                .addClass("article")
                .append(title, link, summary);

            savedArticleResults.append(listItem);
        }
        
        
        $(".deleteButton").on("click", function() {
            var articleId = $(this).attr('id');
            unsaveArticle(articleId);
        });
        
        $(".notesButton").on("click", function() {
            var articleId = $(this).attr('id');
            displayNotes(articleId);
        });
    });
};

$(document).ready(function(){      
    displaySaved(); 
});
