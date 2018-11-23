var ready;
ready = function(){
    // call sortable on our div with the sortable class
    sortable('.sortable')
}

$(document).ready(ready);
/**
 * if using turbolinks
 */
$(document).on('page:load', ready);
