/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(function () {
//    $("#schedule").jqs();

    html5task.tasks();

//    $("#schedule").jqs({
////        mode: "read",
//        mode: "edit",
////        hour: 12,
//        debug: true,
////        days: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
//        data: [
//            {
//                day: 0,
//                periods: [
//                    ["20:00", "00:00"],
//                    ["00:00", "02:00"]
//                ]
//            }, {
//                day: 3,
//                periods: [
//                    ["00:00", "08:30"],
//                    ["09:00", "12:00"]
//                ]
//            }
//        ]
//    });

    

    $("#export").click(function () {
        $("#result").val($("#schedule").jqs('export'));
    });

    $("#import").click(function () {
        var ret = $("#schedule").jqs('import', [
            {
                day: 1,
                periods: [
                    ["8:00", "10:00"],
                ]
            }, {
                day: 4,
                periods: [
                    ["20:00", "00:00"],
                    ["00:00", "02:00"]
                ]
            }
        ]);

        $("#result").val(ret);
    });

    $("#reset").click(function () {
        $("#schedule").jqs('reset');
    });
});