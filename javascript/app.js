var people = ["Arnold Schwarzenegger", "Carl Sagan", "Adam Sandler", "Matt Damon", "Marlon Brando", "Martin Sheen"];
console.log(people)

var APIkey = "dc6zaTOxFJmzC";

//ajax call to Giphy API  to return our values both from the people array and future names
//defined in the search for people form. 
   function showPeople() {
        $("#peopleGifs").empty();
     
        /* this attribute will change according to the name within the buttons pressed. see 
        line 52: x.attr("data-name", people[i]); */
        var name = $(this).attr('data-name');
        
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&limit=20&rating=r&api_key=" + APIkey;
     
        $.ajax({
          url: queryURL
          , method: 'GET'
        }).done(function(response){
          for (var i = 0; i < response.data.length; i++) {

              // this is where we're adding the images, in imageContainer
              //imageContainer will contain br, img, and p(which will hold
              // the rating)
              var br = $('<br>');
              var img = $('<img>');
              var p = $('<p>');
              var imageContainer = $('<div>');
              var rating = "Rating: " + response.data[i].rating;
              p.text(rating);

              /* here we will adjust the attributes of the <img> tag, where we 
              can put both the still and animated versions of the gif */
              img.attr('src', response.data[i].images.fixed_height_still.url);
              img.attr('still', response.data[i].images.fixed_height_still.url);
              img.attr('animate', response.data[i].images.fixed_height.url);
              img.attr('status', 'still');

              //imageContainter will be appended to peopleGifs div 
              //defined in the beginning of this function
              imageContainer.append(p, br, img);
              $('#peopleGifs').append(imageContainer);
          }
          
        });
      }

      //function to display buttons on the page
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
      //click event for the submit button on the search for people form
      $("#peopleSubmit").on("click", function(event) {
        event.preventDefault();
        var person = $("#people").val().trim();
        people.push(person);
        displayData();

      });
      //function to switch between still and animated versions of the img tag
      function animate() {

        var ourImage = $(this);       
        var status = $(this).attr('status');
        // the link variable is just saving a string
        var link = $(this).attr('src');
        var still = $(this).attr('still');
        var animate = $(this).attr('animate');
        console.log(status, link);

        /* this is how we link the status attribute with the still or animate attribute.
        we do this by stating that if the status is still, we want it to be animated. if
        it's not animated, than in all instances, status == still */
        if(status == 'still'){
            // if its still, we want to make it moving
            ourImage.attr('src', animate);
            ourImage.attr('status', 'animate')
        }

        else{
          // the picture is moving, we want to make it still
          ourImage.attr('src', still);
          ourImage.attr('status', 'still');
          
        }

    
      }
      

      /* final functions to round out page. if you click on the .person
      submit button, then another button with that person's name will appear on the 
      top of the page. if you click on any of the images, then it will animate. 
      displayData will make the buttons display for the predetermined people defined in the
      'people' array from the beginning of this script */
      $(document).on("click", ".person", showPeople);
      $(document).on("click", "img", animate);
      displayData();