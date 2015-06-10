// JS



songQueue = [];

// jQuery

$(document).ready(function() {

  refresh();

  $('form#add-song').submit(function(event) {
    event.preventDefault();
    var songUrl = $("input#song-url").val();
    songUrl = songUrl.replace("watch?v=", "embed/");
    songQueue.push(songUrl);
    refresh();

    debugger;

  });

  function refresh() {
    $("#song-queue").empty();
    for(var i = 0; i < songQueue.length; i++) {
      $("#song-queue").append('<div><embed width="420" height="315" src="' + songQueue[i] + '"></div>');
    }
  }



});
