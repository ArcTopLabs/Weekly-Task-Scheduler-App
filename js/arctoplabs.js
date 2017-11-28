/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var appName = "demo";
var url = 'https://api.masterdatanode.com/' + appName + '/schedule/';
var access_token = '######access_token###########'; //'######access_token###########'
var content_type = 'application/json';
var html5task = {};
html5task.tasks = function () {
    var SendInfo = {"sort": {
            "identifier": "asc"
        }};
    $.ajax({
        url: url + 'find-id',
        type: 'post',
//                        data: {},
        data: JSON.stringify(SendInfo),
        headers: {
            "access_token": access_token,
            "Content-Type": content_type
        },
        dataType: 'json',
        success: function (data) {
            var count = 0;
            console.info(JSON.stringify(data));
            //$("#test_div").html(JSON.stringify(data));
//            $("#test_div").show();
//            alert(data.result);
//            var obj = JSON.parse(JSON.stringify(data));
//            
//            var result = $.parseJSON(JSON.stringify(obj.result));
            console.info(JSON.stringify(data.result));
            var identifier, todo, type;
            var data = data.result;
            $("#schedule").jqs({
//        mode: "read",
                mode: "edit",
//        hour: 12,
                debug: true,
//        days: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
                data: data
            });
            console.info(JSON.stringify(identifier));
        }

    });
};
html5task.loadTodo = function (text) {
    html5task.todos(text);
}

html5task.add = function (identifier, nindex, start, end, data) {


////alert(JSON.stringify(SendInfo)); 
    var SendInfo = {"Data": [{"identifier": identifier, "day": nindex, "periods": [[start, end]], "todo": data}]};
    $.ajax({
        url: url + 'save',
        type: 'post',
        data: JSON.stringify(SendInfo),
        headers: {
            "access_token": access_token,
            "Content-Type": content_type,
            "origin": 'app'
        },
        dataType: 'json',
        success: function (data) {
//            $("#test_div").show();
            var result = $.parseJSON(JSON.stringify(data));
            console.info(JSON.stringify(result));
//            $("#test_div").html(JSON.stringify(result.description));
            html5task.showMessage('#9BED87', 'black', 'Task Item added successfully.');
        },
        error: function (xhr, thrownError) {
            console.info("readyState: " + xhr.readyState + "\nstatus: " + xhr.status + "\nresponseText: " + xhr.responseText);
//            alert(thrownError);
        }
    });
};
html5task.update = function (identifier, start, end, data) {

    ////alert(JSON.stringify(SendInfo)); 
//    var SendInfo = {"Data": [{"type": "completed", "todo": todo}]};
    var SendInfo = {"Data": {"periods": [[start, end]]}, "filter": {"identifier": identifier}, "type": "single"};
//    var SendInfo = {"Data": {"type": done}, "filter": {"identifier": identifier}, "type": "single"};
    console.log(JSON.stringify(SendInfo));
    $.ajax({
        url: url + 'update',
        type: 'post',
        data: JSON.stringify(SendInfo),
        headers: {
            "access_token": access_token,
            "Content-Type": content_type,
            "origin": 'app'
        },
        dataType: 'json',
        success: function (data) {
//            $("#test_div").show();
            var result = $.parseJSON(JSON.stringify(data));
            console.info(JSON.stringify(result));
//            $("#test_div").html(JSON.stringify(result.description));
            html5task.showMessage('#9BED87', 'black', 'Task Item updated successfully.');
        },
        error: function (xhr, thrownError) {
            console.info("readyState: " + xhr.readyState + "\nstatus: " + xhr.status + "\nresponseText: " + xhr.responseText);
//            alert(thrownError);
        }
    });
};
html5task.remove = function (identifier) {

    ////alert(JSON.stringify(SendInfo)); 
//    var SendInfo = {"Data": [{"type": "completed", "todo": todo}]};
    var SendInfo = {"filter": {"identifier": identifier}, "type": "one"};
    $.ajax({
        url: url + 'delete',
        type: 'post',
        data: JSON.stringify(SendInfo),
        headers: {
            "access_token": access_token,
            "Content-Type": content_type,
            "origin": 'app'
        },
        dataType: 'json',
        success: function (data) {
//            $("#test_div").show();
            var result = $.parseJSON(JSON.stringify(data));
            console.info(JSON.stringify(result));
//            $("#test_div").html(JSON.stringify(result.description));
            html5task.showMessage('#9BED87', 'black', 'Task Item deleted successfully.');
//            var markup = '<li id="' + identifier + 'done">' + done + '<button class="btn btn-default btn-xs pull-right  remove-item"><span class="glyphicon glyphicon-remove"></span></button></li>';
//            $('#done-items').append(markup);
//            $('.remove').remove();

//                    done(doneItem);
//            countTodos();
        },
        error: function (xhr, thrownError) {
            console.info("readyState: " + xhr.readyState + "\nstatus: " + xhr.status + "\nresponseText: " + xhr.responseText);
            html5task.showMessage('#9BED87', 'black', 'Error while deleting the Item.');
//            alert(thrownError);
        }
    });
};
html5task.showMessage = function (bgcolor, color, msg) {
    if (!$('#smsg').is(':visible'))
    {
        $('html, body').animate({
            scrollTop: 0
        }, 500, function () {
            if (!$('#smsg').length)
            {
                $('<div id="smsg">' + msg + '</div>').appendTo($('body')).css({
                    position: 'absolute',
                    top: 0,
                    left: 3,
                    width: '98%',
                    height: '50px',
                    lineHeight: '30px',
                    background: bgcolor,
                    color: color,
                    zIndex: 1000,
                    padding: '10px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    opacity: 0.9,
                    margin: 'auto',
                    display: 'none'
                }).slideDown('show');
                setTimeout(function () {
                    $('#smsg').animate({'width': 'hide'}, function () {
                        $('#smsg').remove();
                    });
                }, 4000);
                $(".btn-primary").addClass('disabled');
                $(".btn-warning").removeClass('disabled');
            }
        });
    }
};
/**
 * Return a readable hour from a position
 * @param position
 * @returns {number}
 */

html5task.periodFormat = function (position, hours) {
    console.log(position);
    console.log(hours);
    var hour = 0;
    if (hours === 12) {
        var calc = Math.floor(position / 2);
        var min = ":30";
        if (position % 2 === 0) {
            min = "";
        }

        hour = calc + min + "am";
        if (calc > 12) {
            hour = (calc - 12) + min + "pm";
        }

        if (calc === 0 || calc === 24) {
            hour = 12 + min + "am";
        }

        if (calc === 12) {
            hour = 12 + min + "pm";
        }
    } else {

        if (position >= 48) {
            position = 0;
        }

        hour = Math.floor(position / 2);
        console.log(hour);
        if (hour < 10) {
            hour = "0" + hour;
        }

        if (position % 2 === 0) {
            hour += ":00";
        } else {
            hour += ":30";
        }
    }

    return hour;
};
