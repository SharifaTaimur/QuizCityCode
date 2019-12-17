
/*--------loader script-----------*/
$(function () {
    var loading = $('#loadbar').hide();
    $(document)
        .ajaxStart(function () {
            loading.show();
        }).ajaxStop(function () {
            loading.hide();
        });

    var randomItem, randomQuestion; 
    var questionNo = 0;
    var correctCount = 0;
    var questionTracker = [];
    var questionAmount = 3;
    var Title;
    var gridarray = [];
    


    var q = [
        { 'Q': 'What is the city for Hamburg?', 'A': 2, 'C': ['STO', 'HAM', 'GVA'], 'Answer': 'GVA'},
        { 'Q': 'What is the city for Muscat?', 'A': 3, 'C': ['MED', 'BEY', 'MCT'], 'Answer': 'MCT'},
        { 'Q': 'What is the city for Johannesburg?', 'A': 1, 'C': ['JNB', 'DAR', 'CPT'], 'Answer': 'JNB'},
        { 'Q': 'What is the city for Singapore?', 'A': 2, 'C': ['KUL', 'SIN', 'MLE'], 'Answer': 'SIN'},
        { 'Q': 'What is the city for Brussels?', 'A': 3, 'C': ['CHC', 'BLR', 'BRU'], 'Answer': 'BRU'}
    ];


    $(document).ready(function () {
        Iterate(); 
    });

    function Iterate() {

        // Iterate however many times
        for (var i = 0; i < questionAmount; i++) {
            // Keep creating random numbers until the number is unique
            do {
                 randomQuestion = Math.floor(Math.random() * q.length);
            } while (existingQuestions());

            // Add the question to the tracker
            questionTracker.push({ "Id": randomQuestion, "A": q[randomQuestion].A, "C": [q[randomQuestion].C[0], q[randomQuestion].C[1], q[randomQuestion].C[2]], "Q": q[randomQuestion].Q, "Answer": q[randomQuestion].Answer});
            $('#question').html(questionTracker[0].Q);
            $($('#f-option').parent().find('label')).html(questionTracker[0].C[0]);
            $($('#s-option').parent().find('label')).html(questionTracker[0].C[1]);
            $($('#t-option').parent().find('label')).html(questionTracker[0].C[2]); 
            console.log(questionTracker)
        }
    }

    // If the current random number already exists in the tracker, return true
    function existingQuestions() {
        for (var i = 0; i < questionTracker.length; i++) {
            //console.log(questionTracker[i])
            if (questionTracker[i].Id === randomQuestion) {
                return true;
            }
        }
        return false;
    }


$(document.body).on('click', "label.element-animation", function (e) {
    //ripple start
    var parent, ink, d, x, y;
    parent = $(this);
    console.log(parent)
    if (parent.find(".ink").length == 0)
        parent.prepend("<span class='ink'></span>");

    ink = parent.find(".ink");
    ink.removeClass("animate");

    if (!ink.height() && !ink.width()) {
        d = Math.max(parent.outerWidth(), parent.outerHeight());
        ink.css({ height: "100px", width: "100px" });
    }

    x = e.pageX - parent.offset().left - ink.width() / 2;
    y = e.pageY - parent.offset().top - ink.height() / 2;

    ink.css({ top: y + 'px', left: x + 'px' }).addClass("animate");
    //ripple end

    //check for answers

    $(".selector").click(function () {
        var selValue = $('input:radio:checked + label').text();
        //alert(selValue);
        questionTracker[questionNo].UCSelected = selValue;
    });


    var choice = $(this).parent().find('input:radio').val();
    var anscheck = $(this).checking(questionNo, choice);//$( "#answer" ).html(  );      
    questionTracker[questionNo].UC = choice;
    //randomItem.UC = choice;
    if (anscheck) {
        correctCount++;
        questionTracker[questionNo].result = "Correct";
    } else {
        questionTracker[questionNo].result = "Incorrect";
    }
    console.log("CorrectCount:" + correctCount);
    //console.log(gridarray)

    setTimeout(function () {
        $('#loadbar').show();
        $('#quiz').fadeOut();
        questionNo++;

        if ((questionNo + 1) > questionTracker.length) {

            $('#result-of-question').hide();
            $('#myModal').modal();
            /*alert("Quiz completed, Now click ok to get your answer");*/

            $('#result-of-question').hide();
            $('label.element-animation').unbind('click');

        } else {
            $('#qid').html(questionNo + 1);
            $('input:radio').prop('checked', false);
            setTimeout(function () {
                $('#quiz').show();
                $('#loadbar').fadeOut();
            }, 1500);

            console.log("questionNoA")
            console.log(questionTracker)

            $('#question').html(questionTracker[questionNo].Q);
            $($('#f-option').parent().find('label')).html(questionTracker[questionNo].C[0]);
            $($('#s-option').parent().find('label')).html(questionTracker[questionNo].C[1]);
            $($('#t-option').parent().find('label')).html(questionTracker[questionNo].C[2]);

        }
    }, 1000);
});

    $('#Okay').on('click', function (evt) {
        DisplayTable(questionTracker, correctCount);
    });

    $.fn.checking = function (qstn, ck) {
        var ans = questionTracker[questionNo].A;
        if (ck != ans)
            return false;
        else
            return true;
    };    
});	

// chartMake();
function chartMake() {

    var chart = AmCharts.makeChart("chartdiv",
        {
            "type": "serial",
            "theme": "dark",
            "dataProvider": [{
                "name": "Correct",
                "points": correctCount,
                "color": "#00FF00",
                "bullet": "http://i2.wp.com/img2.wikia.nocookie.net/__cb20131006005440/strategy-empires/images/8/8e/Check_mark_green.png?w=250"
            }, {
                "name": "Incorrect",
                "points": questionTracker.length - correctCount,
                "color": "red",
                "bullet": "http://4vector.com/i/free-vector-x-wrong-cross-no-clip-art_103115_X_Wrong_Cross_No_clip_art_medium.png"
            }],
            "valueAxes": [{
                "maximum": questionTracker.length,
                "minimum": 0,
                "axisAlpha": 0,
                "dashLength": 4,
                "position": "left"
            }],
            "startDuration": 1,
            "graphs": [{
                "balloonText": "<span style='font-size:13px;'>[[category]]: <b>[[value]]</b></span>",
                "bulletOffset": 10,
                "bulletSize": 52,
                "colorField": "color",
                "cornerRadiusTop": 8,
                "customBulletField": "bullet",
                "fillAlphas": 0.8,
                "lineAlpha": 0,
                "type": "column",
                "valueField": "points"
            }],
            "marginTop": 0,
            "marginRight": 0,
            "marginLeft": 0,
            "marginBottom": 0,
            "autoMargins": false,
            "categoryField": "name",
            "categoryAxis": {
                "axisAlpha": 0,
                "gridAlpha": 0,
                "inside": true,
                "tickLength": 0
            }
        });
}

function DisplayTable(questionTracker, correctCount) {

    $('#restart').show();

    setTimeout(function () {
        var toAppend = '';
        $.each(questionTracker, function (i, a) {
            console.log(a)
            console.log("this is a abve");

            /*toAppend += '<tr>'
            toAppend += '<td>' + a.Q + '</td>';
            toAppend += '<td>' + a.A + '</td>';
            toAppend += '<td>' + a.UC + '</td>';
            toAppend += '<td>' + a.result + '</td>';
            toAppend += '</tr>' */

            toAppend += '<tr>'
            toAppend += '<td>' + a.Q + '</td>';
            toAppend += '<td>' + a.Answer + '</td>';
            toAppend += '<td>' + a.UCSelected + '</td>';
            toAppend += '<td>' + a.result + '</td>';
            toAppend += '</tr>'
        });
        $('#quizResult').html(toAppend);
        $('#totalCorrect').html("Total correct: " + correctCount);
        $('#quizResult').show();
        $('#loadbar').fadeOut();
        $('#result-of-question').show();
        $('#graph-result').show();
        chartMake();
    }, 1000);
}


