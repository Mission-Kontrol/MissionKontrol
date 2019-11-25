"use strict";

function stateLoadCallbackFunction(object, callback) {
  $.ajax({
        url: "/data_table_states/load?table=" + object.data("table-name"),
        dataType: "json",
        success(json) {
            callback(json);
        }
    });
}

function stateSaveCallbackFunction(settings, data, object) {
    if (settings.iDraw <= 1) {
        return;
    }
    $.ajax({
        url: "/data_table_states/save?table=" + object.data("table-name"),
        data: { "state": data },
        dataType: "json",
        type: "POST",
        success(){}
    });
}

function initCompleteFunction(settings, json, searchableTable) {
    $('[id ^="target-table-"][id $="_filter"] input').unbind();
    $('[id ^="target-table-"][id $="_filter"] input').bind('keyup', function (e) {
        if (e.keyCode === 13) {
            searchableTable.search(this.value).draw();
        }
    });
}


function humanizeString(str) {
    var restOfStr = str.slice(1).replace(/_/g, " ");

    return str.charAt(0).toUpperCase() + restOfStr;
}