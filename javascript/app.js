var people = ["Arnold Schwarzenegger", "Carl Sagan", "Adam Sandler", "Matt Damon", "Marlon Brando", "Martin Sheen"];
console.log(people)

var APIkey = "dc6zaTOxFJmzC";

   function showPeople() {
        $("#peopleGifs").empty();
     
        var name = $(this).attr('data-name');
        
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&limit=20&rating=r&api_key=" + APIkey;
     
        $.ajax({
          url: queryURL
          , method: 'GET'
        }).done(function(response){
          for (var i = 0; i < response.data.length; i++) {

              // this is where we're adding the images
              var br = $('<br>');
              var img = $('<img>');
              var p = $('<p>');
              var imageContainer = $('<div>');
              var rating = "Rating: " + response.data[i].rating;
              p.text(rating);

              img.attr('src', response.data[i].images.fixed_height_still.url);
              img.attr('still', response.data[i].images.fixed_height_still.url);
              img.attr('animate', response.data[i].images.fixed_height.url);
              img.attr('status', 'still');


              imageContainer.append(p, br, img);
              $('#peopleGifs').append(imageContainer);
          }
          
        });
      }

      
      function displayData() {

        $("#peopleButtons").empty();

     
        for (var i = 0; i < people.length; i++) {

          var x = $("<button>");
          x.addClass("person");
          x.attr("data-name", people[i]);  
          x.text(people[i]);
          $("#peopleButtons").append(x);
        }
      }

      $("#peopleSubmit").on("click", function(event) {
        event.preventDefault();
        var person = $("#people").val().trim();
        people.push(person);
        displayData();

      });

      function animate() {

        var ourImage = $(this);       
        var status = $(this).attr('status');
        // the link variable is just saving a string
        var link = $(this).attr('src');
        var still = $(this).attr('still');
        var animate = $(this).attr('animate');
        console.log(status, link);

        if(status == 'still'){
            // if its still, we want to make it moving
            ourImage.attr('src', animate);
            ourImage.attr('status', 'animate')
        }

        else{

          ourImage.attr('src', still);
          ourImage.attr('status', 'still');
          // the picture is moving, we want to make it still

        }

    
      }
      


      $(document).on("click", ".person", showPeople);
      $(document).on("click", "img", animate);
      displayData();