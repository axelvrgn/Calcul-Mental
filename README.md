# Calcul-Mental

Afin de réaliser l'exercice demandé tout en respectant les consignes, j'ai structuré mon programme de la façon suivante : une classe Question avec comme attributs deux nombres, un opérateur, une liste de choix (dont la réponse) et la réponse.
Le générateur de questions est mis en place à travers la fonction generateCalculs() qui prend en paramètre la difficulté choisie par l'utilisateur.
Le fonction generateCalculs() génère puis stocke dans des dictionnaires:
 - des couples de valeurs aléatoires n1 et n2
 - des opérateurs aléatoires à partir de la liste '+','-','x','/'.
 - la réponses de chaque calcul
 - trois choix aléatoires
Enfin une fois que tous les attributs sont générés, une boucle insère les calculs dans la liste "calculs" sous forme d'objet Calcul.# Calcul-Mental