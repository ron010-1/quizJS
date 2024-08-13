let startButton = document.getElementById("startButton");
let divQuestion = document.getElementById("questions");
let divAnswers = document.getElementById("answers");

async function readQuestions(){
    const data = await fetch('./questions.json'); //Pega todos os dados usando assincronismo e armazena em data
    const dados = await data.json();//Converte a data em JSON que é o objeto padrão do javaScript
    return dados; //retorna um array
}

function generateNumber(){
    return Math.floor(Math.random() * 50) + 1;
}

//Mandar id.questao pro localStorage

function addQuestion(question){
    let p = document.createElement('p');
    question.alternatives.forEach((alternative, index) => {
        let button = document.createElement('button');
        button.innerText = question.alternatives[index];
        divAnswers.appendChild(button);
        button.addEventListener('click', () => {
            if(question.alternatives[index] === question.answer){
                window.alert("Acertou")
            }else{
                window.alert("Você errou");
            }
            localStorage.setItem("id",() => {
                const local = localStorage.getItem("id");
                if(local !== null){
                    localStorage.setItem("id", JSON.stringify([...JSON.parse(local), question.id]))
                }
            });
            
        })
    });
    p.innerText = question.text;
    divQuestion.appendChild(p);
}

function generateQuestions(questions){
    let i = 1;
    while(i){
        let numeroAleatorio = generateNumber();
        let question = questions[numeroAleatorio];
        addQuestion(question);
        i--;
    }
}

async function startGame() {
    startButton.style.display = "none"; //Apagar botão do HTML.
    console.log("Botão foi pressionado!");
    const dados = await readQuestions();
    generateQuestions(dados);
}

