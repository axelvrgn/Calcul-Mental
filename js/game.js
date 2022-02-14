
/*Classe Calcul avec pour attributs :
n1: le premmier nombre de l'opération
n2: le second nombre de l'opération
operateur: l'opérateur
choices: propositions de réponse au calcul
answer: la réponse au calcul
*/
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
const operatorsList = ['+', '-', 'x', '/'];
const maxQuestions = 10;

let maxNumber = 0;
let randomNumberMap = new Map([]);
let randomOperatorMap = new Map([]);
let answerMap = new Map([]);
let choicesMap = new Map([]);

function generateCalculs(thedifficulty){
//Switch permettant de définir la variable maxNumber en fonction de la dificulté.
  switch(thedifficulty){
    case "facile":
      maxNumber = 20;
      break;
    case "moyen":
      maxNumber = 100;
      break;
    case "difficile":
      maxNumber = 200;
      break;
    default:
      console.log("error with thedifficulty");
  }

  //Boucle permettant de générer n couples de nombres aléatoires et les insérer dans un dictionnaire : randomNumberMap.
  for(let i = 0; i < maxQuestions; i++){
    //si la difficulté est "difficile" alors les nombres aléatoires sont des chiffres à deux décimales.
    if(thedifficulty == "difficile"){
      let n1 = Math.floor(Math.random() * maxNumber) / 100;
      let n2 = Math.floor(Math.random() * maxNumber) / 100;
      randomNumberMap.set(i, [n1, n2]);
    }
    //sinon ce sont des nombres entiers.
    else{
      let n1 = Math.floor(Math.random() * maxNumber);
      let n2 = Math.floor(Math.random() * maxNumber);
      randomNumberMap.set(i, [n1, n2]);
    }
  }
                              
  //Boucle permettant de générer n opérateurs aléatoires à partir de la liste operatorsList['+', '-', 'x', '/'] puis les insérer dans un dictionnaire : randomOperatorMap.
  for(let i = 0; i < maxQuestions; i++){
    //si la difficulté est "difficile" alors on génère des opérateurs aléatoires à partir de la liste complète de operatorList.
    if(thedifficulty == "difficile"){
      let op = Math.floor(Math.random() * (4 - 0) + 0);
      randomOperatorMap.set(i, op);
    }
    //si la difficulté est "moyen" alors on génère des opérateurs aléatoires à partir de la liste réduite de operatorList : +, - , x.
    else if(thedifficulty == "moyen"){
      let op = Math.floor(Math.random() * (3 - 0) + 0);
      randomOperatorMap.set(i, op);
    }
    //si la difficulté est "facile" alors on génère des opérateurs aléatoires à partir de la liste très réduite de operatorList : + et -.
    else{
      let op = Math.floor(Math.random() * (2 - 0) + 0);
      randomOperatorMap.set(i, op);
    }
  }

  //Boucle permettant de calculer les réponses de chaque calcul généré puis les insérer dans un dictionnaire : answerMap.
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
      case '/':
        answerMap.set(i, [randomNumberMap.get(i)[0] / randomNumberMap.get(i)[1]]);
        break;
      default :
        console.log('error with operator');
    }
  }

  //Boucle permettant de générer 3 propositions aléatoires pour chaque calcul, puis les insérer avec la réponse dans un dictionnaire.
  for(let i = 0; i < maxQuestions; i++){
    //si la difficulté est "difficile" alors on génère trois chiffres aléatoires avec deux décimales.
    if(thedifficulty == "difficile"){
      let c1 = Math.floor(Math.random() * maxNumber) / 100;
      let c2 = Math.floor(Math.random() * maxNumber) / 100;
      let c3 = Math.floor(Math.random() * maxNumber) / 100;
      choicesMap.set(i, [c1, c2, c3, answerMap.get(i)[0]]);
    }
    //sinon on génère trois entiers aléatoires.
    else{
      let c1 = Math.floor(Math.random() * maxNumber);
      let c2 = Math.floor(Math.random() * maxNumber);
      let c3 = Math.floor(Math.random() * maxNumber);
      choicesMap.set(i, [c1, c2, c3, answerMap.get(i)[0]]);
    }
  }

  //Boucle permettant de construire les calculs en fonction du nombre de questions.
  for(let i = 0; i < maxQuestions; i++){
    calculs.push(new Calcul(randomNumberMap.get(i)[0], randomNumberMap.get(i)[1], operatorsList[randomOperatorMap.get(i)], choicesMap.get(i), answerMap.get(i)[0]));
  }
  return calculs;
}

/*Classe Quiz avec pour attributs :
  score: initialisé à 0
  calculs: la liste de calculs initialisé à vide
  currenCalculIndex: l'index du calcul de départ initialisé à 0
  isStarted: booléen initialisé à false signifiant que le jeu n'a pas commencé.
  difficulty: difficulté du quiz initialisé à vide.
*/

class Quiz {
  constructor() {
    this.score = 0;
    this.calculs = [];
    this.currentCalculIndex = 0;
    this.isStarted = false;
    this.difficulty = "";
  }
  //méthode qui permet de vérifier si la partie a commencée.
  noStart() {
    return this.currentCalculIndex == 0 && this.isStarted == false ;
  }
  //méthode permettant de récupérer l'index du cacul sur lequel l'utilisateur est.
  getCurrentCalcul() {
    return this.calculs[this.currentCalculIndex];
  }
  //méthode permettant de vérifier si la réponse choisie est correcte puis ajouter ou non un point au compteur.
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
  //methode permettant de définir la difficulté et passer le booléen à true lorsqu'elle est appelée.
  guessDiff(level) {
    this.difficulty = level;
    this.isStarted = true;
    this.calculs = generateCalculs(this.difficulty);
  }
  //méthode permettant de définir la fin du jeu, c'est à dire lorsque l'index du calcul est égale à la taille de la liste de calculs.
  hasEnded() {
    return this.currentCalculIndex >= this.calculs.length && this.currentCalculIndex != 0;
  }
  isStart(){
    return this.isStarted == true && this.currentCalculIndex < this.calculs.length;
  }
}

//Fonction permettant d'afficher les éléments du quizz
const display = {
  elementShown: function(id, text) {
    let element = document.getElementById(id);
    element.innerHTML = text;
  },
  //ce qui va apparaître à la fin du jeu
  endQuiz: function() {
    endQuizHTML = `
      <h1>Quiz terminé !</h1>
      </br></br>
      <h3> Votre score est de : ${quiz.score} / ${quiz.calculs.length}</h3>`;
    this.elementShown("quiz", endQuizHTML);
    
    //condition permettant d'attribuer la couleur rouge quand le résultat est en dessous de la moyenne et vers quand il est au dessus.
    if(quiz.score > (quiz.calculs.length/2)){
        document.getElementById("quiz").style.color = "#26F76B";
    }
    else{
        document.getElementById("quiz").style.color = "#C8040E";
    }
  },
  startQuiz: function() {
    startQuiz = `
      <h1 class="title-levels">Choisir un niveau</h1>
      <button id="diff0" class="btnlevel">        
        <p id="level0"></p>
      </button>

      <button id="diff1" class="btnlevel">
        <p id="level1"></p>
      </button>
      
      <button id="diff2" class="btnlevel">
        <p id="level2"></p>
      </button>`;
    this.elementShown("levelRequest", startQuiz);
  },
  //Mise en forme du calcul en fonction de l'index
  calcul: function() {
    this.elementShown("calcul", quiz.getCurrentCalcul().n1 + " " + quiz.getCurrentCalcul().operator + " " + quiz.getCurrentCalcul().n2 + " = ?");
  },
  //récupération des choix en fonction de l'index du calcul
  choices: function() {
    let choices = quiz.getCurrentCalcul().choices;
    //méthode permettant de récupérer la réponse choisie
    guessHandler = (id, guess) => {
      document.getElementById(id).onclick = function() {
        quiz.guess(guess, id);
        //attente de 2 secondes après avoir cliquer sur la réponse et avant de passer au prochain calcul
        setTimeout(quizApp, 2000);
      }
    }
    // mélange des choix
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
  levels: function() {
    let levels = ['facile','moyen','difficile'];
    guessDiffHandler = (id, level) => {
      document.getElementById(id).onclick = function() {
        quiz.guessDiff(level);
        //attente de 2 secondes après avoir cliquer sur la réponse et avant de passer au prochain calcul
        document.getElementById("levelRequest").hidden = true;
        quizApp();
      }
    }
    //méthode permettant de récupérer la réponse choisie
    for(let i = 0; i < levels.length; i++) {
      this.elementShown("level" + i, levels[i]);
      guessDiffHandler("diff" + i, levels[i]);
    }
  },
  progress: function() {
    let currentCalculNumber = quiz.currentCalculIndex + 1;
    this.elementShown("progress", "Calculs : " + currentCalculNumber + " / " + quiz.calculs.length);
  },
};

//logique du jeu
quizApp = () => {
  if(quiz.hasEnded()) {
    display.endQuiz();
  }
  else if(quiz.noStart()){
    display.startQuiz();
    display.levels();
  } 
  else{
    display.calcul();
    display.choices();
    display.progress();
  } 
}
//création du quiz.
let quiz = new Quiz();
quizApp();
console.log(calculs);
console.log(quiz);




