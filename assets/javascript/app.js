// Questions and answers Array
var questions = [
  {
    question: 'What movie is the character Shooter Mcgavin in?',
    answers: [
      { answer: 'A. Happy Gilmore', value: true },
      { answer: 'B. Click', value: false },
      { answer: 'C. Beverly Hills Ninja', value: false },
      { answer: 'D. The Wedding Singer', value: false }
    ]
  },
  {
    question: 'What movie is does Adam Sandlers character get paid in meatballs?',
    answers: [
      { answer: 'A. Happy Gilmore', value: false },
      { answer: 'B. Click', value: false },
      { answer: 'C. Beverly Hills Ninja', value: false },
      { answer: "D. The Wedding Singer", value: true }
    ]
  },
  {
    question: 'What football position did Sandler’s character play in ‘The Waterboy’?',
    answers: [
      { answer: 'A. kicker', value: false },
      { answer: 'B. punter', value: false },
      { answer: 'C. linebacker', value: true },
      { answer: 'D. tight end', value: false }
    ]
  },
  {
    question: 'Where did Kevin’s girlfriend used to work in ‘Big Daddy’?',
    answers: [
      { answer: 'A. Outback', value: false },
      { answer: 'B. Hooters', value: true },
      { answer: 'C. Cheerleaders', value: false },
      { answer: 'D. Ruby Tuesday', value: false }
    ]
  },
  {
    question: "What’s Mr. Deeds' first name?",
    answers: [
      { answer: 'A. Longfellow', value: true },
      { answer: 'B. Sean', value: false },
      { answer: 'C. Kelly', value: false },
      { answer: 'D. Steve', value: false }
    ]
  },
  {
    question: 'What was Mr. Deeds dream job?',
    answers: [
      { answer: 'A. Writing cards for Hallmark', value: true },
      { answer: 'B. Super Hero', value: false },
      { answer: 'C. Plumer', value: false },
      { answer: 'D. Golfer', value: false }
    ]
  },
  {
    question: 'Which actor sold Sandler the universal remote in Click?',
    answers: [
      { answer: 'A. Christopher Walken', value: true },
      { answer: 'B. Michael Bolton', value: false },
      { answer: 'C. Betty Ross', value: false },
      { answer: 'D. Michael Jackson', value: false }
    ]
  }
];

// Global variables
var game;
var counter = 0;
var clock;
var timer = 30;
var correctCounter = 0;
var incorrectCounter = 0;
var unansweredCounter = 0;

$(document).ready(function() {
  // Start the game when that start button is clicked
  $('.answers').css('visibility', 'hidden');
  $('body').on('click', '.start-btn', function(event) {
    event.preventDefault();
    startGame();
    $('.answers').css('visibility', 'visible');
  });

  $('body').on('click', '.answer', function(event) {
    // console.log($(this));
    chosenAnswer = $(this).text();
    var answerCounter = questions[counter].answers;

    var answer = $('.answer');
    for (var i = 0; i < answerCounter.length; i++) {
      if (chosenAnswer === answerCounter[i].answer && answerCounter[i].value === true) {
        clearInterval(clock);
        var right = $(this).attr('class', 'right-answer answer');
        rightAnswer();
      } else if (chosenAnswer === answerCounter[i].answer && answerCounter[i].value === false) {
        clearInterval(clock);
        $(this).attr('class', 'wrong-answer answer');
        $('.first-answer').css('background-color', 'green');
        $('.first-answer').css('color', 'white');
        wrongAnswer();
      }
    }
  });

  $('body').on('click', '.reset-button', function(event) {
    event.preventDefault();
    resetGame();
  });
});

function rightAnswer() {
  correctCounter++;
  $('.time').html(timer);
  $('.right').html('<p>Right answers: ' + correctCounter + '</p><br>');
  setTimeout(questionCounter, 2000);
}

function wrongAnswer() {
  incorrectCounter++;
  $('.time').html(timer);
  $('.wrong').html('<p>Wrong answers: ' + incorrectCounter + '</p>');
  setTimeout(questionCounter, 2000);
}

function unanswered() {
  unanswered++;
  $('.main').append("<p class='times-up'>Time's up!</p>");
  $('.right-answer').css('background-color', 'blue');
  $('.times-up')
    .delay(2000)
    .fadeOut(400);
  setTimeout(questionCounter, 2000);
}

// Start the game
function startGame() {
  $('.start-page').css('display', 'none');
  $('.questions-page').css('visibility', 'visible');
  $('.timer').html('<p>Time remaining: <span class="time">30</span></p>');

  $('.question').html(questions[counter].question);
  var showingAnswers =
    '<p class="answer first-answer">' +
    questions[counter].answers[0].answer +
    '</p><p class="answer">' +
    questions[counter].answers[1].answer +
    '</p><p class="answer">' +
    questions[counter].answers[2].answer +
    '</p><p class="answer">' +
    questions[counter].answers[3].answer +
    '</p>';

  $('.answers').html(showingAnswers);

  timerHolder();
}

function questionCounter() {
  if (counter < 6) {
    counter++;
    startGame();
    timer = 30;
    timerHolder();
  } else {
    finishGame();
  }
}

// Timer function
function timerHolder() {
  clearInterval(clock);
  clock = setInterval(seconds, 1000);
  function seconds() {
    if (timer === 0) {
      clearInterval(clock);
      unanswered();
    } else if (timer > 0) {
      timer--;
    }
    $('.time').html(timer);
  }
}

// Finishing the game
function finishGame() {
  var final = $('.main')
    .html("<p>That's QuackTastic, here's your score!<p><br><br>")
    .append('<p>Correct Answers: ' + correctCounter + '</p><br>')
    .append('<p>Wrong Answers: ' + incorrectCounter + '</p>');
  $(final).attr('<div>');
  $(final).attr('class', 'final');
  $('.final').append('<p><a class="btn btn-primary btn-lg reset-button" href="#">Restart the game!</a></p>');
}

// Reset the game
function resetGame() {
  counter = 0;
  correctCounter = 0;
  incorrectCounter = 0;
  unansweredCounter = 0;
  timer = 30;
  startGame();
  timerHolder();
}
