
$( document ).ready(function() {
    var giphy = [];
   

function displaygiphy(){
    $("#gifbuttonsviews").empty();

    for (var i =0; i < giphy.length; i++){
        var gifbuttons = $("<button>");
        gifbuttons.addClass("action");
        gifbuttons.addClass("btn btn-primary");
        gifbuttons.attr("data-name", giphy[i] );
        gifbuttons.text(giphy[i]);
        $("#gifbuttonsviews").append(gifbuttons);
};
}
// function to add new giphy 
function addnewbutton(){
    $("#addGif").on("click", function(e){
        e.preventDefault();
        
         var action = $("#action-input").val().trim();
         console.log(action.length);

         
        if (action.length > 0 )
        {
            console.log(giphy);
            giphy.push(action);
            console.log(giphy);
            displaygiphy();

        }
     });
}

// `function to remove the giphy
function removebutton(){
    var action = $("#action-input").val();
    $("#removeGif").on("click", function(){
    giphy.pop(action);
    displaygiphy();
});
}



function displaygifs(action)
{
     console.log(action);
     var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +  giphy + "&api_key=dc6zaTOxFJmzC&limit=10";
     console.log(queryURL); // displays the constructed url
     $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response){
       console.log(response);
       $("#gifsviews").empty();
      
       var results = response.data;
       for (var i=0; i<results.length; i++){
             var gifDiv = $("<div>");
             gifDiv.addClass("gifdiv");
             console.log(gifDiv);
              
             var gifrating = $("<p>").text ("rating: " + results[i].rating);

             gifDiv.append(gifrating);

             var  gifImage = $("<img>");

             gifImage.attr("src", results[i].images.fixed_height.url); // still image stored into src of image
             gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); // still image
             gifImage.attr("data-animate",results[i].images.fixed_height_small.url); // animated image
             gifImage.attr("data-state", "still");
             gifImage.addClass("image");
             console.log(gifImage)
             gifDiv.append(gifImage);

             $("#gifviews").prepend(gifDiv);

         }

    }
    )};

    $("#gifbuttonsviews").on("click", function(){
        var action = $(this).attr("data-name");
        displaygifs(action);
    });
    
    $(".image").on("click",function(){
        var clickvalue = $(".image").attr("data-state");
        if(clickvalue == "still")
        {
            $(this).attr("data-state","animate");
            $(this).attr("src", $(this).attr("data-animate"));
        }
        else 
        {
            $(this).attr("data-state","still");
            $(this).attr("src", $(this).attr("data-still"));
        }
    
             });

   
  
                addnewbutton();
                displaygiphy();
                removebutton(); 

 

        }); 

