//const newLocal = '[data-toggle="tooltip"]';
$(document).ready(function() { // ensure website has loaded before executing javascript
    $("img").tooltip();

    var topics = ["Barack Obama", "Donald Trump", "Hilary Rhodam Clinton", "Nigel Farage", "Emmanuel Macron", "David Cameron", "Theresa May"];

    // create buttons on the webpage
    for (var x = 0; x < topics.length; x++) {
        var btn = $("<button>");
        btn.text(topics[x]);
        btn.addClass("presetBtn");
        $("#preset-btns").append(btn);
    }




    // ***********


    function updatePage(giphyData) {


        for (var x = 0; x < giphyData.data.length; x++) {

            //create image
            var image = $("<img>");
            image.attr("src", giphyData.data[x].images.fixed_width_still.url);
            image.attr("still", giphyData.data[x].images.fixed_width_still.url);
            image.attr("animate", giphyData.data[x].images.fixed_width.url);
            image.attr("state", "still");
            image.attr("title0", giphyData.data[x].title);
            image.attr("title", "Rating: " + giphyData.data[x].rating);
            image.attr("rating", giphyData.data[x].rating);
            image.attr("data-toggle", "tooltip");
            image.addClass("imageCls");

            // prepend the image to the div
            $("#preset-gifs").prepend(image);

        }


        /// Test code to store all images in the div
        $("#preset-gifs").each(function() {
            var images = $(this).find("img");
            console.log(images);
        });


        $("img", "#preset-gifs").draggable({
            cancel: "a.ui-icon", // clicking an icon won't initiate dragging
            revert: "invalid", // when not dropped, the item will revert back to its initial position
            containment: "document",
            helper: "clone",
            cursor: "move"
        });

        //************* */
        // Let the favorite-gifs be droppable, accepting the preset-gifs items
        // $("#favorite-gifs .favorite-col").droppable({
        $(".droppable").droppable({
            accept: "#preset-gifs img",
            drop: function(event, ui) {
                console.log("droppable - delete image");
                deleteImage(ui.draggable);
            }
        });

        //************* */

        // ***********
        // Let the preset-gifs items be draggable


        // Let the preset-gifs be droppable as well, accepting items from the favorite-gifs
        $(".draggable").droppable({
            accept: "#favorite-gifs img",
            drop: function(event, ui) {
                recycleImage(ui.draggable);
            }
        });



    }

    //*********** */
    // Image deletion function

    function deleteImage($item) {
        $item.fadeOut(function() {
            var $list = $("div", "#favorite-gifs").length ?
                $("div", "#favorite-gifs") :
                $("<div id='preset-gifs'>").appendTo("#favorite-gifs");

            $item.appendTo($list).fadeIn();

        });
    }

    // Image recycle function

    function recycleImage($item) {
        console.log("recycle image");
        $item.fadeOut(function() {
            $item
                .find("img")
                .end()
                .appendTo("#preset-gifs")
                .fadeIn();

        });
    }

    //*********** */


    function getGifs(searchName) {
        //javascript, jQuery
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchName + "&api_key=O22dkNRb0PMFd9dP4PSeAVOXEVNhYR0d&limit=10";

        //Perfoming an AJAX GET request to our queryURL
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            updatePage(response);
        });

    }

    $(document).on("mouseover", ".imageCls", function() {
        var rating = $(this).val(function() {
            return $(this).attr("rating");
        });
    });

    $(document).on("click", ".imageCls", function() {

        var imgState = $(this).attr("state");

        if (imgState == "still") {
            $(this).attr("state", "animate");
            $(this).attr("src", $(this).attr("animate"));
        } else {
            $(this).attr("state", "still");
            $(this).attr("src", $(this).attr("still"));
        }

    });

    $("body").on("click", ".presetBtn", function() {
        getGifs($(this).text());
    });

    $("body").on("click", "#addButton", function() {
        event.preventDefault(); // prevent the default action of the submit button
        addButtonFan();
    });

    function addButtonFan() {
        var politician = $("#addPolitician").val().trim();

        if (politician.length > 0) {
            $("#addPolitician").val("");

            topics.push(politician); // add politician or fan to array

            // add the button to the Preset Gifs buttons
            var btn = $("<button>");
            btn.text(politician);
            btn.addClass("presetBtn");
            $("#preset-btns").append(btn);
        }

    }


    // execute on browser / window exit and put variable into localstorage

});