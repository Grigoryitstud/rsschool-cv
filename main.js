const option1 = document.querySelector('.option1'),
    option2 = document.querySelector('.option2'),
    option3 = document.querySelector('.option3'),
    option4 = document.querySelector('.option4');

const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question');

const numberOfQuestion = document.getElementById('number-of-question');
const numberOfAllQuestions = document.getElementById('number-of-all-questions');

const project = document.getElementsByClassName('project')


let indexOfQuestion,
    indexOfPage = 0;

const answersTracker = document.getElementById('answers-tracker');
const btnNext = document.getElementById('btn-next');

let score = 0;

const correctAnswer = document.getElementById('correct-answer'),
    numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'),
    btnTryAgain = document.getElementById('btn-try-again');

const questions = [
    {
        question: 'Якога супрацоунiка вы шукаеце?',
        options: [
            'Ведае усё',
            "Жадаючы навучыца фронтэнду",
            "Ведае дзе знайсцi працу",
            "Вясёлы хлопец проста патрэбны"
        ],
        rightAnswer: 2
    },
    {
        question: "Перашкодзіць вопыт жыцейскi кандыдату?",
        options: [
            "Не мы вырвбляем ЁУ пралажэнне",
            "Не разважалi аб гэтым",
            "Не перашкодзiць",
            "УГУ-ГАГА"
        ],
        rightAnswer: 3
    },
    {
        question: "Маеце магчымасць павялічваць складанасць задач?",
        options: [
            "Не нам гэта не патрэбна",
            "Калi можаш штосцi навошта вучыць iншае",
            "Я не разумею вас",
            "Шукаем тых хто пройдзе з намi вялiкi шлях"
        ],
        rightAnswer: 4
    },
    {
        question: "У жыццi i працы ёсць праблемы?",
        options: [
            "Не ёсць лiшь ситуацii",
            "Шмат у нас их",
            "Мы не маем сiлы вырашыць усi сiтуацii",
            "У вас амаль атрымалася не вывiрайце гэты адказ"
        ],
        rightAnswer: 1
    }
];

numberOfAllQuestions.innerHTML = questions.length; // колич. вопросов


const load = () => {
    question.innerHTML = questions[indexOfQuestion].question; // номер вапроса
    // мапим ответы

    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1;
    indexOfPage++;
};

let completedAnswers = [];

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false; //якорь для проверки одинаковых вопросов

    if (indexOfPage == questions.length) {
        quizOver()
    } else {
        if (completedAnswers.length > 0) {
            completedAnswers.forEach(item => {
                if (item == randomNumber) {
                    hitDuplicate = true;
                }
            })
            if (hitDuplicate) {
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if (completedAnswers.length == 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    }
    completedAnswers.push(indexOfQuestion);
};

const checkAnswer = el => {
    if (el.target.dataset.id == questions[indexOfQuestion].rightAnswer - 1) {
        el.target.classList.add('correct');
        updateAnswerTracker('correct');
        if (score < project.length) {
            project[score].classList.add('show');
        }
        score++;

    } else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disableOptions();
}

for (option of optionElements) {
    option.addEventListener('click', e => checkAnswer(e));
}

const disableOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if (item.dataset.id == questions[indexOfQuestion].rightAnswer - 1) {
            item.classList.add('correct');
        }
    })
}

const enableOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong');
    })
}

const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
}

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
}

const validate = () => {
    if (!optionElements[0].classList.contains('disabled')) {
        alert('chouse the answer!')
    } else {
        randomQuestion();
        enableOptions();
    }
}

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestions2.innerHTML = questions.length;
};

const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener('click', () => {
    validate();
})

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});




