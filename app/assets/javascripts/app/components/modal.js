function closeModal () {
  $('body').on('click', '.modal--close-btn', function () {
    $('.users--edit-modal').removeClass('show');
    $('.users--edit-modal').addClass('hide');
  })
}

$(document).ready(function() {
  closeModal();
})