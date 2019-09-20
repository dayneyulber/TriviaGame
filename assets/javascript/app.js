var quizQuestions = [
    {
        question: 'What is the largest US State?',
        choices: ['Texas','California', 'Puerto Rico', 'Alaska'],
        correctAnswer:'Alaska'
    },

    {
        question: 'What is the largest country by area in the world?',
        choices: ['US', 'Canada', 'Russia', 'China'],
        correctAnswer:'Russia'
    },

    {
        question: 'What is the best selling videogame of all time?',
        choices: ['GTA V', 'Minecraft', 'Tetris', 'Super Mario Bros'],
        correctAnswer:'Minecraft'
    },

    {
        question: 'Which country won the 2018 World Cup?',
        choices: ['Brazil', 'Germany', 'France', 'Netherlands'],
        correctAnswer:'France'
    },

    {
        question: 'What is the biggest event that happens in Austin every year?',
        choices: ['UT vs. LSU', 'USGP F1', 'ACL', 'SXSW'],
        correctAnswer:'SXSW'
    },

    {
        question: "What racing series won't come to Austin in 2019",
        choices: ['MOTOGP', 'F1', 'Indycar', 'WEC'],
        correctAnswer:'WEC'
    }]
    // console.log(quizQuestions);

    //Initial Values
    var counter = 5;
    var currentQuestion = 0 ;
    var score = 0;
    var lost = 0;
    var timer;

// time's up
    function nextQuestion() {
        var isQuestionOver = (quizQuestions.length - 1) === currentQuestion;
        if (isQuestionOver) {
            displayResult();
        } else {
            currentQuestion++;
            loadQuestions();
        }
    }

// Images

    var winImages = [
        './assets/images/victory.gif',
        './assets/images/victory2.gif',
        './assets/images/victory3.gif',
    ];

    var loseImages = [
        './assets/images/lost.gif',
        './assets/images/lost2.gif',
        './assets/images/lost3.gif',
    ];

//Timer
    
    function timeUp() {
        clearInterval(timer);

        lost++;
        preloadImage('lost');
        setTimeout(nextQuestion, 2 * 1000);
    }
    
    function countDown() {
        counter--;

        $('#time').html('Time: ' + counter);

        if (counter === 0) {
            timeUp();
        }
    }

//Display questions and options
    function loadQuestions() {
        counter = 15;
        timer = setInterval(countDown, 1000)
        var question = quizQuestions[currentQuestion].question;
        var choices = quizQuestions[currentQuestion].choices;

        $('#time').html('Time: ' + counter);
        $('#game').html(`
        <h4>${question}</h4>
        ${loadChoices(choices)}
        ${loadRemaining()}
    `);
    }

    function loadChoices(choices) {
        var result = '';
        for (var i = 0; i < choices.length; i++) {
            result += `<p class='choice' data-answer='${choices[i]}'>${choices[i]}</p>`;
        }

        return result;
    }

//Event listener
        $(document).on('click', '.choice', function() {
            clearInterval(timer);
            var selectedAnswer = $(this).attr('data-answer');
            var correctAnswer = quizQuestions[currentQuestion].correctAnswer;

            if (correctAnswer === selectedAnswer) {
                score++;
                preloadImage('win');
                setTimeout(nextQuestion, 2 * 1000);
            } else {
                lost++;
                preloadImage('lost')
                setTimeout(nextQuestion, 2 * 1000);
            }
            console.log(selectedAnswer);
        });

        function displayResult () {
            var result = `
            <p> You get ${score} questions(s) right</p>
            <p> You missed ${lost} questions(s)</p>
            <p>Total Questions ${quizQuestions.length} questions(s) right</p>
            <button class='btn btn-primary' id='reset'>Reset Game</button>
            `;

            $('#game').html(result);
        }

// Reseter

        $(document).on('click', '#reset', function() {
            counter = 15;
            currentQuestion = 0 ;
            score = 0;
            lost = 0;
            timer = null;

            loadQuestions(); 