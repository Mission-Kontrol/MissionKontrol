$(document).ready(function() {
  replaceArrowGlypicon();
});

function replaceArrowGlypicon () {
  $('.glyphicon-arrow-right').addClass('fa fa-arrow-right').removeClass('glyphicon glyphicon-arrow-right')
  $('.glyphicon-arrow-left').addClass('fa fa-arrow-left').removeClass('glyphicon glyphicon-arrow-left')
}
