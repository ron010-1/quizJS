let startDiv = document.getElementById("startDiv");
let questionsDiv = document.getElementById("questionsDiv");
let divQuestion = document.getElementById("questions");
let divAnswers = document.getElementById("answers");
let trueOrFalse = document.getElementById("trueOrFalse");

let questionsCounter = 0;
let trueAnswers = 0;

async function readQuestions() {
    const data = await fetch('./questions.json'); //Pega todos os dados usando assincronismo e armazena em data
    const dados = await data.json();//Converte a data em JSON que é o objeto padrão do javaScript
    return dados; //retorna um array
}

function generateNumber() {
    return Math.floor(Math.random() * 50) + 1;
}

//Mandar id.questao pro localStorage

function addQuestion(question) {
    trueOrFalse.innerText = "";
    questionsCounter++;
    let p = document.createElement('p');
    p.id = 'text'
    question.alternatives.forEach((alternative, index) => {
        let button = document.createElement('button');
        button.id = 'alternatives'
        button.innerText = question.alternatives[index];
        divAnswers.appendChild(button);
        button.addEventListener('click', () => {
            if (question.alternatives[index] === question.answer) {
                button.style.backgroundColor = '#9aeabc';
                trueOrFalse.innerText = "Você acertou!";
                trueAnswers++;
            } else {
                button.style.backgroundColor = '#ff9393';
                trueOrFalse.innerText = "Você errou!";
            }
            localStorage.setItem("id", () => {
                const local = localStorage.getItem("id");
                if (local !== null) {
                    localStorage.setItem("id", JSON.stringify([...JSON.parse(local), question.id]))
                }
            });

        })
    });
    p.innerText = question.text;
    divQuestion.appendChild(p);
    if (questionsCounter === 5) {
        questionsDiv.style.display = "none";
        startDiv.style.display = "flex";
        window.alert("Você acertou " + trueAnswers + " perguntas");
        questionsCounter = 0;
        trueAnswers = 0;
        cleanSection();
    }
}

function generateQuestions(questions) {
    let i = 1;
    while (i) {
        let numeroAleatorio = generateNumber();
        let question = questions[numeroAleatorio];
        addQuestion(question);
        i--;
    }
}

function cleanSection(){
    // Seleciona todos os botões com o id 'alternatives' e remove cada um deles
    const buttons = document.querySelectorAll('#alternatives');
    buttons.forEach(button => button.remove()); // Remove cada botão encontrado
    // Limpa o texto da pergunta
    divQuestion.innerHTML = '';
}

async function regenerateQuestion() {
    cleanSection();
    // Limpa o texto da pergunta
    if (divQuestion) {
        divQuestion.innerHTML = '';
    }

    const dados = await readQuestions();
    generateQuestions(dados);
}

async function startGame() {
    startDiv.style.display = "none"; //Apagar botão do HTML.
    questionsDiv.style.display = "flex"; //Mostrar perguntas
    console.log("Botão foi pressionado!");
    const dados = await readQuestions();
    generateQuestions(dados);
}
/*
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
}
*/
