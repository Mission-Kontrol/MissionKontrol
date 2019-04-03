// when callable-field is toggled
// updated callable-fields arrays and check/uncheck as neccesary

// when rendering callable-fields
// check field if callable-fields include field

$(document).ready(() => {
  // const metaTag = $('meta[name=psj]');
  // const isCurrentControllerLayout = metaTag.attr('controller') == 'layout_builder';
  // const isCurrentActionEdit = metaTag.attr('action') == 'edit';

  // if (isCurrentControllerLayout && isCurrentActionEdit) {
    // alert("okie dokie")
    // $('.callable-field').
  // }

})

function updateCallableFields() {
  // get all callable_fields
  // create new callable fields array
  // update layout with new callable_fields
  // notify
  const url = window.location.href;
  const id = url.split("/")[4];
  const callableFields = document.getElementsByClassName("callable-field");
  const newCallableFields = [];
  const data = {};
  data['view_builder'] = {};

  for (var i = 0; i < callableFields.length; i++) {
    let callableField = callableFields[i];

    if (callableField.checked) {
      newCallableFields.push(callableField.value)
    }
  }

  // console.log(newCallableFields);

  if (newCallableFields.length === 0) {
    data['view_builder']['callable_fields'] = JSON.stringify(newCallableFields)
  } else {
    data['view_builder']['callable_fields'] = newCallableFields
  }

  $.ajax({
    url: "/layouts/" + id,
    type: 'PATCH',
    data: data,
    error: function(XMLHttpRequest, errorTextStatus, error){
      console.error("PATCH /layouts/:id Failed: "+ errorTextStatus+" ;"+error);
    },
    success: function(response, status, request){
      console.log("PATCH /layouts/:id Success")
      // toastr.info('Phone settings updated.');
    }
  })
}
