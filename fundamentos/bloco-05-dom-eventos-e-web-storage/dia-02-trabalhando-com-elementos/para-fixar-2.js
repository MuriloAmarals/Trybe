//Exercicio 1
let pai = document.getElementById('pai');
let irmaoElementoOndeVoceEsta = document.createElement('section');
irmaoElementoOndeVoceEsta.id = 'irmaoElementoOndeVoceEsta';
pai.appendChild(irmaoElementoOndeVoceEsta);

//Exercicio 2
let elementoOndeVoceEsta = document.getElementById('elementoOndeVoceEsta');
let filhoDoElementoOndeVoceEsta = document.createElement('section');
filhoDoElementoOndeVoceEsta.id = 'filhoDoElementoOndeVoceEsta';
elementoOndeVoceEsta.appendChild(filhoDoElementoOndeVoceEsta);

//Exercicio 3
let primeiroFilhoDoFilho = document.getElementById('primeiroFilhoDoFilho');
let filhoDoPrimeiroFilhoDoFilho = document.createElement('section');
filhoDoPrimeiroFilhoDoFilho.id = 'filhoDoPrimeiroFilhoDoFilho';
primeiroFilhoDoFilho.appendChild(filhoDoPrimeiroFilhoDoFilho);

//Exercicio 4
let terceiroFilho = filhoDoPrimeiroFilhoDoFilho.parentElement.parentElement.nextElementSibling;
