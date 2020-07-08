$(document).ready(function () {

    //define variables
    var currentQuestion;
    var correctAnswer;
    var incorrectAnswer;
    var unanswered;
    var seconds;
    var time;
    var answered;
    var userSelect;
    var messages = {
            correct: "I am an enchanter." + "<br" > +"There are some who call me...Tim.",
            incorrect: "Tis but a scratch" + "<br>" + "It's just a flesh wound...",
            endTime: "On second thoughts, let us not go to Camelot. It is a silly place.",
            finished: "You fight with the strength of many men, Sir Knight"

        },

        //all questions are in one array of objects
        var triviaQuestions = [{
            question: "What is the airspeed velocity of a coconut laden swallow?",
            answer: ["Swedish or Italian?", "Swallows are too silly to carry coconuts!", "European or African?", "Do swallows know what coconuts are?"],
            correct: "2",
            image: (""),
            answerText: "A five pound bird could not carry a one pound coconut." + "It could be carried by an African swallow." + "Yea, but not a European swallow that's my point." +
                "Oh yea, I agree with that.",

        }, {

            question: "What do the Knights do whenever they're able?",
            answer: ["Polish armor", "Flirt with fair maidens", "Eat venison", "Dance"],
            correct: "3",
            image: (""),
            answerText: "We're Knights of the Round Table, we dance whene'er we're able...",

        }, {
            question: "The French catapault what animal first, over the castle wall?",
            answer: ["Cow", "Dog", "Llama", "Goat"],
            correct: "0",
            image: (""),
            answerText: "no comment",
        }, {
            question: "What is the King's name?",
            answer: ["Lancelot", "Alfred", "William", "Arthur"],
            correct: "3",
            image: (""),
            answerText: "I am Arthur, King of the Britons",

        }, {
            question: "What fruit do the French use in their taunts?",
            answer: ["Blueberry", "Crabapple", "Elderberry", "Oranges"],
            correct: "3",
            image: (""),
            answerText: "Your mother was a hamster and your father smelt of elderberries…"

        }, {
            question: "What animal forces the Knights to retreat?",
            answer: ["Fox", "Rabbit", "Boar", "Bear"],
            correct: "2",
            image: (""),
            answerText: "Brother Maynard - bring forth the holy hand grenade!",

        }, {
            question: "Who sold the shrubbery to Arthur?",
            answer: ["Thomas", "Patsy", "Neil", "Roger"],
            correct: "3",
            image: (""),
            answerText: "What else would a Shrubbery dealer be named?",

        }, {
            question: "Who is King Arthur's servant?",
            answer: ["Roger", "Patsy", "Galahad", "Guy"],
            correct: "1",
            image: (""),
            answerText: "Come, Patsy",

        }, {
            question: "What is the first thing the Black Knight says to King Arthur?",
            answer: ["Halt!", "None Shall Pass.", "Danger Ahead.", "You Can't Pass."],
            correct: "1",
            image: (""),
            answerText: "Tis but a scratch.",

        }, {
            question: "What animal is mentioned throughout the credits?",
            answer: ["Moose", "Caribou", "Snake", "Eel"],
            correct: "0",
            image: (""),
            answerText: "A moose once bit my sister.",

        }, ]
    //functions

    //this hides the game when the page is loaded
    $("#gameCol").hide();

    //this captures user click on start button to create new game
    $("#startBtn").on("click", function () {
        $(this).hide();
        newGame();
    });

    //this captures user click of the reset button to create new game
    $("#startOverBtn").on("click", function () {
        $(this).hide();
        newGame();
    });

    //this sets the page up for new game empties all areas and shows the game area
    function newGame() {
        $("#gameCol").show();
        $("#finalMessage").empty();
        $("#correctAnswers").empty();
        $("#incorrectAnswers").empty();
        $("#unanswered").empty();
        $("gif").hide();
        $("#gifCaption").hide();
        currentQuestion = 0;
        correctAnswer = 0;
        incorrectAnswer = 0;
        unanswered = 0;
        newQuestion();
    }

    //function to display the next question
    function newQuestion() {
        $("#message").empty();
        $("#correctedAnswer").empty();
        $("#gif").hide();
        $("#gifCaption").hide();
        answered = true;
    };

    //now we actually display the new question
    $("#currentQuestion").html("Question" + (currentQuestion + 1) + "of" + triviaQuestions.length);
    $(".question").html(triviaQuestions[currentQuestion].question);

    //function to display new question's answer options in multiple choice
    for (var i = 0; i <= 5; i++) {
        var choices = $("<div>");
        choices.text(triviaQuestions[currentQuestion].answerList[i]);
        choices.attr({
            "data-index": i
        });
        choices.addClass("thisChoice");
        $(".answerList").append(choices);

    };

    //timer time! or atleast the countdown
    countdown();

    //user clicks on an answer this pauses the timer, and displays the correct answer to the question
    $(".thisChoice").on("click", function () {
        userSelect = $(this).data("index");
        clearInterval(time);
        answerPage();
    });

    //function for the real countdown
    function countdown() {
        seconds = 10;
        $("#timeLeft").html("00:" + seconds);
        answered = true;
        //delay timer start by one second
        time = setInterval(showCountdown, 1000);
    }

    //display the countdown!
    function showCountdown() {
        seconds--;

        if (seconds < 10) {
            $("#timeLeft").html("00:0" + seconds);
        } else {
            $("#timeLeft").html("00:" + seconds)
        }
        if (seconds < 1) {
            clearInterval(time);
            answered = false;
            answerPage();
        }
    }

    //function to take user to answer page after the user selects an answer or time is up
    function answerPage() {
        $("#currentQuestion").empty();
        $(".thisChoice").empty();
        $(".question").empty();
        $("#gif").show();
        $("gifCaption").show();

        var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
        var rightAnswerIndex = triviaQuestions[currentQuestion].answer;

        //this add gif to corresponding question
        var gifImageLink = triviaQuestions[currentQuestion].image;
        var newGif = $("<img>");
        newGif.attr("src", gifImageLink);
        newGif.addClass("gifImg");
        $("#gif").html(newGif);

        //adds text below image
        var gifCaption = triviaQuestions[currentQuestion].answerText;
        newCaption = $("<div>");
        newCaption.html(gifCaption);
        $("#gifCaption").html(newCaption);

        //checks to see if user answer is correct, incorrect, or unanswered

        if ((userSelect == rightAnswerIndex) && (answered === true)) {
            correctAnswer++;
            $("#message").html(messages.correct);
        } else if ((userSelect != rightAnswerIndex) && (answered === true)) {
            incorrectAnswer++;
            $("#message").html(messages.incorrect);
            $("#correctedAnswer").html("The correct answer you nitwit is" + rightAnswerIndex);
        } else {
            unanswered++;
            $("#message").html(messages.endTime);
            $("#correctedAnswer").html("The correct answer you nitwit is" + rightAnswerIndex);
            answered = true;
        }

        if (currentQuestion == (triviaQuestions.length - 1)) {
            setTimeout(scoreboard, 6000);
        } else {
            currentQuestion++;
            setTimeout(newQuestion, 6000);
        }
    }

    //game stat time
    function scoreboard() {
        $("#timeLeft").empty();
        $("#message").empty();
        $("#correctedAnswer").empty();
        $("#gif").hide();
        $("#gifCaption").hide();

        $("#finalMessage").html(messages.finished);
        $("#correctAnswers").html("Correct Answers: " + correctAnswer);
        $("#incorrectAnswers").html("Incorrect Answers: " + incorrectAnswer);
        $("#unanswered").html("Unanswered: " + unanswered);
        $("#startOverBtn").addClass("reset");
        $("#startOverBtn").show();
        $("#startOVerBtn").html("Let us play again");
    }

});

 
