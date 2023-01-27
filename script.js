// function for hiding buttons + answers in one loop

function hideButtons() {
    for (let j = 0; j < 5; j++) {
        document.getElementById("option" + j).style.display = "none";
        document.getElementById("result").style.display = "none";
    }
}

// function to show options after test restarts

function showButtons() {
    for (let j = 0; j < 5; j++) {
        document.getElementById("option" + j).style.display = "inline-block";
    }
}

// function to show the end button

function showTestEnd() {
    document.getElementById("testend-btn").style.display = "inline-block";
}

// on load hide some elements which aren't needed

window.onload = function () {
    hideButtons();
};

// array of questions - could be simplified to one question however as they are all the same

const questions = [
    'Which country is this?',
    'Which country is this?',
    'Which country is this?',
    'Which country is this?',
    'Which country is this?',
    'Which country is this?',
    'Which country is this?',
    'Which country is this?',
    'Which country is this?',
    'Which country is this?'
]

// array of answers

const answers = [
    ['botswana', 'kenya', 'ethiopia', 'turkey', 'ukraine'],
    ['sweden', 'denmark', 'belgium', 'france', 'germany'],
    ['hungary', 'slovakia', 'czechia', 'moldova', 'north macadonia'],
    ['pakistan', 'kazakhstan', 'uzbekistan', 'turkmenistan', 'kyrgyzstan'],
    ['venezuela', 'brazil', 'peru', 'chile', 'suriname'],
    ['texas', 'russia', 'spain', 'greece', 'italy'],
    ['finland', 'japan', 'china', 'philippines', 'malaysia'],
    ['libya', 'namibia', 'kenya', 'zimbabwe', 'zambia'],
    ['serbia', 'netherlands', 'estonia', 'norway', 'bulgaria'],
    ['vietnam', 'laos', 'cambodia', 'thailand', 'bhutan']
]

// array of images src strings

const images = [
    'svgs/botswana.svg',
    'svgs/denmark.svg',
    'svgs/slovakia.svg',
    'svgs/uzbekistan.svg',
    'svgs/venezuela.svg',
    'svgs/italy.svg',
    'svgs/japan.svg',
    'svgs/kenya.svg',
    'svgs/norway.svg',
    'svgs/vietnam.svg'
];

// arrays to store correct / incorrect answer responses

const correctResponse = [
    'well done!',
    'you got it!',
    'spot on!',
    'you can hold the map!',
    'superb!',
];

const incorrectResponse = [
    'not quite',
    'that'+"'"+'s quite far away',
    'try again!',
    'better luck next time!',
    'not this time'
];

// variable to store random number

var pickRandom = 0;

// function to pick random whole number to give a different correct / incorrect answer message

function randomNumber(pickRandom)
{
    let x = Math.floor((Math.random() * 5));
    return x;
}

// variables for sound effects

var correctSound = document.getElementById("myAudio01");
var wrongSound = document.getElementById("myAudio02");

// variable to select corresponding image

const image = document.querySelector('.image');

// variables for score and way to store which question we are on

var questionIndex = 0;
var score = 0;

// function to start test uses a for loop to generate answers for radio buttons and hides / shows various elements

function startTest() {
    showButtons();
    document.getElementById('question-list').innerHTML = questions[questionIndex];
    for (let i = 0; i < 10; i++) {
        document.getElementById('otext' + i).innerHTML = answers[questionIndex][i];
        image.src = images[questionIndex];
        document.getElementById("start-btn").style.display = "none";
        document.getElementById("testTitle").style.display = "none";
        document.getElementById("check-answer").style.display = "inline-block"
    }
}

// function to progress to next question, does so by increasing question index + uses loop to show next answers
// from the answer array + loads corresponding image to the current question

function nextQuestion() {
    questionIndex += 1;
    document.getElementById('question-list').innerHTML = questions[questionIndex];
    for (let i = 0; i < 10; i++) {
        document.getElementById('otext' + i).innerHTML = answers[questionIndex][i];
        image.src = images[questionIndex];
        document.getElementById("result").style.display = "none";
        document.getElementById("check-answer").style.display = "inline-block";
        document.getElementById("next-question").style.display = "none";
        document.getElementById("motivational-emoji").style.display = "none";
    }
}

// function to end test, displays result, hides various elements and shows restart button

function testEnd() {
    document.getElementById("motivational-emoji").style.display = "none";
    document.getElementById("testTitle").style.display = "flex";
    document.getElementById("testTitle").style.fontSize = "48px";
    document.getElementById('testTitle').innerHTML = "you got " + score + "/10 answers correct!";
    document.getElementById("testend-btn").style.display = "none";
    document.getElementById("restart-test").style.display = "inline-block";
    document.getElementById("restart-test").style.justifyContent = "center";
    document.getElementById("restart-test").style.position = "relative";
    document.getElementById("restart-test").style.top = "50vh";

    document.getElementById("question-list").style.display = "none";
    document.getElementById("result").style.display = "none";
    document.getElementById("svg").style.display = "none";
    for (let k = 0; k < 5; k++) {
        document.getElementById("option" + k).style.display = "none";
        document.getElementById("otext" + k).style.display = "none";

    }


}

// resets everything to the beginning of the test

function restartTest() {
    document.getElementById("restart-test").style.display = "none";
    document.getElementById("testTitle").style.display = "none";
    document.getElementById("question-list").style.display = "flex";
    document.getElementById("svg").style.display = "inline-block";
    for (let h = 0; h < 5; h++) {
        document.getElementById("otext" + h).style.display = "block";
    }
    score = 0;
    questionIndex = 0;
    startTest();

}

// function for if a correct answer is made before the final question

function progressThroughCorrectly() {
    correctSound.play();
    document.getElementById("result").style.display = "inline-block";
    document.getElementById('result').innerHTML = correctResponse[randomNumber(pickRandom)];
    document.getElementById("motivational-emoji").style.display = "flex";
    document.getElementById('motivational-emoji').innerHTML = "ヽ(•‿•)ノ";
    document.getElementById("check-answer").style.display = "none"
    document.getElementById("next-question").style.display = "inline-block"
    score += 1;
}

// function for if an incorrect answer is made before the final question

function progressThroughIncorrectly() {
    wrongSound.play();
    document.getElementById("result").style.display = "inline-block";
    document.getElementById('result').innerHTML = incorrectResponse[randomNumber(pickRandom)];
    document.getElementById("motivational-emoji").style.display = "flex";
    document.getElementById('motivational-emoji').innerHTML = "(・_・;)";
    document.getElementById("check-answer").style.display = "none"
    document.getElementById("next-question").style.display = "inline-block"
}

// function to check which answer was made, if it is correct answer we add a point to the score,
// if it is incorrect no point is added to the score, on the final question a specific function is required 
// to display the end of the test rather than just another question

function check() {
    for (let i = 0; i < 5; i++) {
        if (document.getElementById('option' + i).checked) {
            var answer = document.getElementById('option' + i).value;
        }
    }
    if (questionIndex == 0) {
        if (answer == 0) {
            progressThroughCorrectly();
        } else {
            progressThroughIncorrectly();
        }
    }
    if (questionIndex == 1) {
        if (answer == 1) {
            progressThroughCorrectly();
        } else {
            progressThroughIncorrectly();
        }
    }
    if (questionIndex == 2) {
        if (answer == 1) {
            progressThroughCorrectly();

        } else {
            progressThroughIncorrectly();
        }
    }
    if (questionIndex == 3) {
        if (answer == 2) {
            progressThroughCorrectly();
        } else {
            progressThroughIncorrectly();
        }
    }
    if (questionIndex == 4) {
        if (answer == 0) {
            progressThroughCorrectly();
        } else {
            progressThroughIncorrectly();
        }
    }
    if (questionIndex == 5) {
        if (answer == 4) {
            progressThroughCorrectly();
        } else {
            progressThroughIncorrectly();
        }
    }
    if (questionIndex == 6) {
        if (answer == 1) {
            progressThroughCorrectly();
        } else {
            progressThroughIncorrectly();
        }
    }
    if (questionIndex == 7) {
        if (answer == 2) {
            progressThroughCorrectly();
        } else {
            progressThroughIncorrectly();
        }
    }
    if (questionIndex == 8) {
        if (answer == 3) {
            progressThroughCorrectly();
        } else {
            progressThroughIncorrectly();
        }
    }
    if (questionIndex == 9) {
        if (answer == 0) {
            correctSound.play();
            document.getElementById("result").style.display = "inline-block";
            document.getElementById('result').innerHTML = correctResponse[randomNumber(pickRandom)];
            document.getElementById("motivational-emoji").style.display = "flex";
            document.getElementById('motivational-emoji').innerHTML = "ヽ(•‿•)ノ";
            document.getElementById("check-answer").style.display = "none"
            document.getElementById("testend-btn").style.display = "inline-block";
            score += 1;
        } else {
            wrongSound.play();
            document.getElementById("result").style.display = "inline-block";
            document.getElementById('result').innerHTML = incorrectResponse[randomNumber(pickRandom)];
            document.getElementById("motivational-emoji").style.display = "flex";
            document.getElementById('motivational-emoji').innerHTML = "(・_・;)";
            document.getElementById("check-answer").style.display = "none"
            document.getElementById("testend-btn").style.display = "inline-block";
        }
    }

}
