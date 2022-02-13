class Calcul {
    constructor(n1, n2, operator, choices, answer) {
    this.n1 = n1;
    this.n2 = n2;
    this.operator = operator;
    this.choices = choices;
    this.answer = answer;
  }
  isCorrectAnswer(choice) {
    return this.answer === choice;
  }
}

var calculs = [];

const operatorsList = ['+', '-', 'x'];
const maxQuestions = 10;
const maxNumber = 100;

let randomNumberMap = new Map([]);
let randomOperatorMap = new Map([]);
let answerMap = new Map([]);
let choicesMap = new Map([]);


for(let i = 0; i < maxQuestions; i++){
    let n1 = Math.floor(Math.random() * maxNumber);
    let n2 = Math.floor(Math.random() * maxNumber);
    randomNumberMap.set(i, [n1, n2]);
}
                            
//Boucle permettant générer 20 opérateurs aléatoires à partir de la liste operatorsList['+', '-', 'x'].
for(let i = 0; i < maxQuestions; i++){
    let op = Math.floor(Math.random() * (3 - 0) + 0);
    randomOperatorMap.set(i, op);
}

for(let i = 0; i < maxQuestions; i++){
    switch (operatorsList[randomOperatorMap.get(i)]) {
        case '+' :
            answerMap.set(i, [randomNumberMap.get(i)[0] + randomNumberMap.get(i)[1]]);
            break;
        case '-' :
            answerMap.set(i, [randomNumberMap.get(i)[0] - randomNumberMap.get(i)[1]]);
            break;
        case 'x' :
            answerMap.set(i, [randomNumberMap.get(i)[0] * randomNumberMap.get(i)[1]]);
            break;
        default :
            console.log('error with operator');
    }
}


for(let i = 0; i < maxQuestions; i++){
    let c1 = Math.floor(Math.random() * maxNumber);
    let c2 = Math.floor(Math.random() * maxNumber);
    let c3 = Math.floor(Math.random() * maxNumber);
    choicesMap.set(i, [c1, c2, c3, answerMap.get(i)[0]]);
}

for(let i = 0; i < maxQuestions; i++){
    calculs.push(new Calcul(randomNumberMap.get(i)[0], randomNumberMap.get(i)[1], operatorsList[randomOperatorMap.get(i)], choicesMap.get(i), answerMap.get(i)[0]));
}

console.log(calculs);


console.log(calculs.length);

class Quiz {
  constructor(calculs) {
    this.score = 0;
    this.calculs = calculs;
    this.currentCalculIndex = 0;
  }
  getCurrentCalcul() {
    return this.calculs[this.currentCalculIndex];
  }
  guess(answer, id) {
    if (this.getCurrentCalcul().isCorrectAnswer(answer)) {
        this.score++;
        document.getElementById(id).style.backgroundColor = "#26F76B";
    }
    else{
        document.getElementById(id).style.backgroundColor = "#C8040E";
    }
    document.getElementById(id).style.color = "white";
    this.currentCalculIndex++;
    for(let i = 0; i < 4; i++){
        document.getElementById("guess" + i).disabled = true;
    }
  }
  hasEnded() {
    return this.currentCalculIndex >= this.calculs.length;
  }
}

// Regroup all  functions relative to the App Display
const display = {
  elementShown: function(id, text) {
    let element = document.getElementById(id);
    element.innerHTML = text;
  },
  endQuiz: function() {
    endQuizHTML = `
      <h1>Quiz terminé !</h1>
      </br></br>
      <h3> Votre score est de : ${quiz.score} / ${quiz.calculs.length}</h3>`;
    this.elementShown("quiz", endQuizHTML);
    //condition permmettant d'attribuer la couleur rouge quand le résultat est en dessous de la moyenne et vers quand il est au dessus.
    if(quiz.score > (quiz.calculs.length/2)){
        document.getElementById("quiz").style.color = "#26F76B";
    }
    else{
        document.getElementById("quiz").style.color = "#C8040E";
    }
  },
  calcul: function() {
    this.elementShown("calcul", quiz.getCurrentCalcul().n1 + " " + quiz.getCurrentCalcul().operator + " " + quiz.getCurrentCalcul().n2 + " = ?");
  },
  choices: function() {
    let choices = quiz.getCurrentCalcul().choices;

    guessHandler = (id, guess) => {
      document.getElementById(id).onclick = function() {
        quiz.guess(guess, id);
        setTimeout(quizApp, 2000);
      }
    }

    
    // mélanger les choix
    choices.sort(()=>Math.random()-0.5 );
    /*
        - afficher les choix,
        - récupérer l'interaction/manipulation des boutons
        - définir le background des boutons en blanc
    */
    for(let i = 0; i < choices.length; i++) {
      this.elementShown("choice" + i, choices[i]);
      guessHandler("guess" + i, choices[i]);
      document.getElementById("guess" + i).style.backgroundColor = "white";
      document.getElementById("guess" + i).style.color = "black";
      document.getElementById("guess" + i).removeAttribute('disabled');
    }
  },
  progress: function() {
    let currentCalculNumber = quiz.currentCalculIndex + 1;
    this.elementShown("progress", "Calcul  : " + currentCalculNumber + " / " + quiz.calculs.length);
  },
};

// Game logic
quizApp = () => {
  if (quiz.hasEnded()) {
    display.endQuiz();
  } 
  else {
    display.calcul();
    display.choices();
    display.progress();
  } 
}
// Create Quiz
let quiz = new Quiz(calculs);
quizApp();

console.log(quiz);




