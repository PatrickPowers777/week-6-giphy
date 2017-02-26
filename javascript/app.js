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
              $('#peopleGifs').prepend("<p> Rating: " + response.data[i].rating + "<br>" + 
                "<img src='" + response.data[i].images.fixed_height.url + "'>");
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



      $(document).on("click", ".person", showPeople);
      displayData();