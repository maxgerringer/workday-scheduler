$(document).ready(function() {
  
  // establish array to hold schedule objects
  var sked = [];
  
  // when the save button is clicked
  $(".saveBtn").on("click", function() {
    // get nearby values
    var value = $(this).siblings(".description").val();
    var time = parseInt($(this).parent().attr("id").split("-")[1]);

    console.log('value:', value);
    console.log('time:', time);
  
    for (var i = 0; i < sked.length; i++){
      if (sked[i].hour === time){
        sked[i].description = value;
      }
    }
    localStorage.setItem("sked", JSON.stringify(sked));
    
  });

  // initialize the schedule array
  function initSked() {
    $(".time-block").each(function() {
      var thisHour = parseInt($(this).attr("id").split("-")[1]);
      
      var skedObj = {
        hour: thisHour,
        description: ""
      }

    sked.push(skedObj);
    });

    localStorage.setItem("sked", JSON.stringify(sked));

  }

  // render the schedule using local storage
  function getSked() {
    sked = JSON.parse(localStorage.getItem("sked"));
    console.log(sked)
    for(var j = 0; j < sked.length; j++) {
      time = sked[j].hour;
      var text = sked[j].description;
      
      console.log(text);
      $("#hour-" + time).children("textarea").val(text);

    };

  }

  // update style based on current time
  function hourUpdater() {

    $(".time-block").each(function() {
      var currentHour = moment().hours();
      var blockHour = parseInt($(this).attr("id").split("-")[1]);

      if(blockHour < currentHour) {
        ($(this)).addClass("past").removeClass("future present");
      }else if(blockHour > currentHour) {
        ($(this)).addClass("future").removeClass("past present");
      }else {
        ($(this)).addClass("present").removeClass("past future");
      }
    });
  }

  hourUpdater();

  // check the time and update the hour block style every 15 seconds
  setInterval(() => {
    hourUpdater();
  }, 15000);

  // on first run, initialize the schedule array
  if(!localStorage.getItem("sked")) {
    initSked();
  }

  getSked();
  
  // display current day on page
  $("#currentDay").text(moment().format("dddd, MMMM Do"));
});
