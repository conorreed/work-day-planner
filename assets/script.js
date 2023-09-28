// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

//GIVEN I am using a daily planner to create a schedule
// WHEN I open the planner
// THEN the current day is displayed at the top of the calendar
// WHEN I scroll down
// THEN I am presented with time blocks for standard business hours of 9am to 5pm
// WHEN I view the time blocks for that day
// THEN each time block is color-coded to indicate whether it is in the past, present, or future
// WHEN I click into a time block
// THEN I can enter an event
// WHEN I click the save button for that time block
// THEN the text for that event is saved in local storage
// WHEN I refresh the page
// THEN the saved events persist

// thought some more about this. Probably best not to have the data object. Instead create the rest of the HTML hours
// and then in the start up function set the appropriate colors and hook up the click events for the icon buttons
// when clicked just put the test from the textarea into localstorage.
// Also on start up look in localstorage and if the hour key exists, load that text into textarea.
// Think this will be much simpler.
//define globals

function startTimer() {
  timerInterval = setInterval(function () {
   colorTheHours();
  }, 1000 * 60); // every minute
}

function colorTheHours() {
  const currentTime = dayjs(); // This gets the current date and time
  const formattedDate = currentTime.format("YYYY-MM-DD");
  const formattedTime = currentTime.format("HH:mm:ss");
  const currentHour = currentTime.hour();

  $("#currentDay").text(formattedDate);
  $("#currentTime").text(formattedTime);

  $(".container-fluid")
    .children()
    .each(function (index, element) {
      const elementHour = $(element).attr("id");
      const hourAsNumber = parseInt(elementHour, 10);

      $(element).removeClass("future");
      $(element).removeClass("past");
      $(element).removeClass("present");

      if (hourAsNumber < currentHour) {
        // past
        $(element).addClass("past");
      } else if (hourAsNumber > currentHour) {
        //future
        $(element).addClass("future");
      } else if (hourAsNumber === currentHour) {
        //present
        $(element).addClass("present");
      }
    });
}

function setupEventHandlers() {
  const saveButtons = $(".saveBtn");

  // Loop through each element and add a click event handler
  saveButtons.each(function () {
    // 'this' refers to the current element in the loop
    $(this).on("click", function () {
      // Your click event handling logic here
      const hourWrapper = $(this).parent(); 
      const hourWrapperId = hourWrapper.attr("id");
      const enteredText = $(this).parent().find("textarea").val();
      localStorage.setItem(hourWrapperId, enteredText);
    });
  });
}

function loadDataFromLocalStorage() {
  for (let index = 9; index < 17; index++) {
    const text = localStorage.getItem(index.toString());
    if (text) {
      $(`#${index}`).find("textarea").text(text);
    }
  }

  const saveButtons = $(".saveBtn");

  // Loop through each element and add a click event handler
  saveButtons.each(function () {
    // 'this' refers to the current element in the loop
    $(this).on("click", function () {
      // Your click event handling logic here
      const hourWrapper = $(this).parent(); 
      const hourWrapperId = hourWrapper.attr("id");
      const enteredText = $(this).parent().find("textarea").val();
      localStorage.setItem(hourWrapperId, enteredText);
    });
  });
}



$(function () {

  colorTheHours();
  startTimer();
  setupEventHandlers();
  loadDataFromLocalStorage();
});
