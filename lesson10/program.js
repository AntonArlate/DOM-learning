/*
Примечание:
К сожалению взятые для примера JSON содержат в ответах теги такие как к примеру <i>Mildred Pierce</i>
Я не стал это исправлять. В целом программа рабочая не считая невалидных данных.
*/

// Импортируем массив объектов из файла data.js
import data from './data.js';

// Получаем случайный объект из массива
let randomObject = data[Math.floor(Math.random() * data.length)];

// Находим элемент .card на странице
const card = document.querySelector('.card');

// Создаем элементы для поля вопроса, поля ввода, кнопок и добавляем их в .card

const questionField = document.createElement('div');
questionField.classList.add('question-field');
card.appendChild(questionField);

const answerField = document.createElement('input');
answerField.type = 'text';
answerField.classList.add('answer-field');
card.appendChild(answerField);

const checkButton = document.createElement('button');
checkButton.textContent = 'Проверить';
checkButton.classList.add('check-button');
card.appendChild(checkButton);

const showAnswerButton = document.createElement('button');
showAnswerButton.textContent = 'Показать ответ';
showAnswerButton.classList.add('show-answer-button');
card.appendChild(showAnswerButton);

const nextButton = document.createElement('button');
nextButton.textContent = 'Следующий';
nextButton.classList.add('next-button');
card.appendChild(nextButton);

// Заполняем поле с вопросом
questionField.textContent = randomObject.question;

// Обработчики событий для кнопок

checkButton.addEventListener('click', () => {
    if (answerField.value === randomObject.answer) {
        answerField.classList.add('correct');
        answerField.classList.remove('incorrect');
    } else {
        answerField.classList.add('incorrect');
        answerField.classList.remove('correct');
    }
});

showAnswerButton.addEventListener('click', () => {
    answerField.value = randomObject.answer;
});

nextButton.addEventListener('click', () => {
    const newRandomObject = data[Math.floor(Math.random() * data.length)];

    questionField.textContent = newRandomObject.question;
    answerField.value = '';
    answerField.classList.remove('correct', 'incorrect');

    randomObject = newRandomObject;
});