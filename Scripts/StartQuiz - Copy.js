
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

    var gridarray = [];

    var q = [
        { 'Q': 'How do you write "Hello World" in an alert box?', 'A': 2, 'C': ['msg("Hello World");', 'alert("Hello World");', 'alertBox("Hello World");'] },
        { 'Q': 'How do you create a function in JavaScript?', 'A': 3, 'C': ['function:myFunction()', 'function = myFunction()', 'function myFunction()'] },
        { 'Q': 'How to write an IF statement in JavaScript?', 'A': 1, 'C': ['if (i == 5)', 'if i = 5 then', 'if i == 5 then'] },
        { 'Q': 'How does a FOR loop start?', 'A': 2, 'C': ['for (i = 0; i <= 5)', 'for (i = 0; i <= 5; i++)', 'for i = 1 to 5'] },
        { 'Q': 'What is the correct way to write a JavaScript array?', 'A': 3, 'C': ['var colors = "red", "green", "blue"', 'var colors = (1:"red", 2:"green", 3:"blue")', 'var colors = ["red", "green", "blue"]'] }
    ];


    $(document).ready(function () {
        Iterate(); 

        //randomItem = q[Math.floor(Math.random() * q.length)];
        //console.log(randomItem);

        // Iterate however many times
       /* for (var i = 0; i < questionAmount; i++) {
            // Keep creating random numbers until the number is unique
            do {
                var randomQuestion = Math.floor(Math.random() * q.length);
            } while (existingQuestions());

            $('#question').html(q[randomQuestion].Q);
            $($('#f-option').parent().find('label')).html(q[randomQuestion].C[0]);
            $($('#s-option').parent().find('label')).html(q[randomQuestion].C[1]);
            $($('#t-option').parent().find('label')).html(q[randomQuestion].C[2]);
            // Add the question to the tracker
            questionTracker.push(randomQuestion);
            console.log(questionTracker)
        }

        // If the current random number already exists in the tracker, return true
        function existingQuestions() {
            for (var i = 0; i < questionTracker.length; i++) {
                if (questionTracker[i] === randomQuestion) {
                    return true;
                }
            }
            return false;
        } */

    });

    function Iterate() {
        // Iterate however many times
        for (var i = 0; i < questionAmount; i++) {
            // Keep creating random numbers until the number is unique
            do {
                 randomQuestion = Math.floor(Math.random() * q.length);
            } while (existingQuestions());

         
            $('#question').html(q[randomQuestion].Q);
            $($('#f-option').parent().find('label')).html(q[randomQuestion].C[0]);
            $($('#s-option').parent().find('label')).html(q[randomQuestion].C[1]);
            $($('#t-option').parent().find('label')).html(q[randomQuestion].C[2]);  

            // Add the question to the tracker
            console.log("below")
            questionTracker.push({ "Id": randomQuestion, "A": q[randomQuestion].A, "C": [q[randomQuestion].C[0], q[randomQuestion].C[1], q[randomQuestion].C[2]], "Q": q[randomQuestion].Q });
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
        var choice = $(this).parent().find('input:radio').val();
        console.log(choice);
        var anscheck = $(this).checking(questionNo, choice);//$( "#answer" ).html(  );      
        questionTracker[questionNo].UC = choice;
        //randomItem.UC = choice;
        if (anscheck) {
            correctCount++;
            questionTracker[questionNo].result = "Correct";
            gridarray.push({ "Q": questionTracker[questionNo].Q, "A": questionTracker[questionNo].UC, });
        } else {
            questionTracker[questionNo].result = "Incorrect";
            gridarray.push({ "Q": questionTracker[questionNo].Q, "A": questionTracker[questionNo].UC, });
        }
        console.log("CorrectCount:" + correctCount);
        //console.log(gridarray)

        setTimeout(function () {
            $('#loadbar').show();
            $('#quiz').fadeOut();
            questionNo++;
            if ((questionNo + 1) > questionTracker.length) {
                alert("Quiz completed, Now click ok to get your answer");

                $('#myModal').show();
                $('label.element-animation').unbind('click');
                setTimeout(function () {
                    var toAppend = '';
                    $.each(questionTracker, function (i, a) {
                        //console.log("yo:" + JSON.stringify(a))
                        //console.log("to:" + i)

                        toAppend += '<tr>'
                        //toAppend += '<td>' + (i + 1) + '</td>';
                        toAppend += '<td>' + a.Q + '</td>';
                        toAppend += '<td>' + a.A + '</td>';
                        toAppend += '<td>' + a.UC + '</td>';
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
            } else {
                $('#qid').html(questionNo + 1);
                $('input:radio').prop('checked', false);
                setTimeout(function () {
                    $('#quiz').show();
                    $('#loadbar').fadeOut();
                }, 1500);
           
                // $('#question').html(q[questionNo].Q);
                // $($('#f-option').parent().find('label')).html(q[questionNo].C[0]);
                //$($('#s-option').parent().find('label')).html(q[questionNo].C[1]);
                // $($('#t-option').parent().find('label')).html(q[questionNo].C[2]);

           
               
                /*$('#question').html(questionTracker.Q);
                $($('#f-option').parent().find('label')).html(questionTracker.C[0]);
                $($('#s-option').parent().find('label')).html(questionTracker.C[1]);
                $($('#t-option').parent().find('label')).html(questionTracker.C[2]); */

            
                var new_arr = questionTracker.reverse();
                console.log(new_arr)
        
                $.each(new_arr, function (key, value) {
                    new_arr.splice(key, 1);
                    console.log(value);

                    //questionTracker.splice(key, 1);
                    var inctval = key + 1;

                    $('#question').html(value[key].Q);
                    $($('#f-option').parent().find('label')).html(value[key].C[0]);
                    $($('#s-option').parent().find('label')).html(value[key].C[1]);
                    $($('#t-option').parent().find('label')).html(value[key].C[2]);

                    var ShuffledQuestions = shuffle(questions);
                });
                



               /* $.each(questionTracker, function (key, value) {
                    console.log("value");
                    console.log(key)
                    //gridarray.push({ "Id": randomQuestion, "A": q[randomQuestion].A, "C": [q[randomQuestion].C[0], q[randomQuestion].C[1], q[randomQuestion].C[2]], "Q": q[randomQuestion].Q });

                    var new_arr = questionTracker.reverse();
                    console.log(new_arr)
                    //questionTracker.splice(key, 1);
                    var inctval = key + 1;
                    console.log(inctval)
  
                    $('#question').html(value[inctval].Q);
                    $($('#f-option').parent().find('label')).html(value[inctval].C[0]);
                    $($('#s-option').parent().find('label')).html(value[inctval].C[1]);
                    $($('#t-option').parent().find('label')).html(value[inctval].C[2]);

                   
                    /*$('#question').html(q[inctval].Q);
                    $($('#f-option').parent().find('label')).html(q[inctval].C[0]);
                    $($('#s-option').parent().find('label')).html(q[inctval].C[1]);
                    $($('#t-option').parent().find('label')).html(q[inctval].C[2]);
            }); */

            }
        }, 1000);
    });


    $.fn.checking = function (qstn, ck) {
        //var ans = q[questionNo].A;
        //var ans = randomItem.A;

        var ans = q[questionNo].A;
        if (ck != ans)
            return false;
        else
            return true;
    };

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
});	
