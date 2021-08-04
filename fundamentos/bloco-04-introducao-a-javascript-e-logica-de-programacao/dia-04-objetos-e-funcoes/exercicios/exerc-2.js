//Exercício 1
function verificaPalindrome(word){
    for(index in word){
      if(word[index] != word[(word.length - 1) - index]){
        return false;
      }
    }
    return true;
  }
  function verificaPalindrome(string) {
    let reverse = string.split('').reverse().join('');
    if (reverse === string) {
      return true;
    } else {
      return false;
    }
  }
//Exercício 2
function indiceDoMaior(numeros) {
    let indiceMaior = 0;
    for (let indice in numeros) {
      if (numeros[indiceMaior] < numeros[indice]) {
        indiceMaior = indice;
      }
    }
    return indiceMaior;
  }
  //Exercício 3
  function indiceDoMenor(numeros) {
    let indiceMenor = 0;
    for (let indice in numeros) {
      if (numeros[indiceMenor] > numeros[indice]) {
        indiceMenor = indice;
      }
    }
    return indiceMenor;
  }
  //Exercício 4
  function maiorPalavra(palavras) {
    let maiorPalavra = palavras[0];
    for (let indice in palavras) {
      if (maiorPalavra.length < palavras[indice].length) {
        maiorPalavra = palavras[indice];
      }
    }
    return maiorPalavra;
  }
  //Exercício 5
  function maisRepetido(numeros) {
    let contRepetido = 0;
    let contNumero = 0;
    let indexNumeroRepetido = 0;
    for (let index in numeros) {
      let verificaNumero = numeros[index];
      for (let index2 in numeros) {
        if (verificaNumero === numeros[index2]) {
          contNumero += 1;
        }
      }
      if (contNumero > contRepetido) {
        contRepetido = contNumero;
        indexNumeroRepetido = index;
      }
      contNumero = 0;
    }
    return numeros[indexNumeroRepetido];
  }
  
  function maisRepetido(numeros) {
    let num = {};
  
    for (let index = 0; index < numeros.length; index += 1) {
      let valor = numeros[index];
      if (num[valor] === undefined) {
        num[valor] = 1;
      } else {
        num[valor] = num[valor] + 1;
      }
    }
  
    let contRepetido = 0;
    let contNumero = 0;
  
    for (let prop in num) {
      if (contRepetido < num[prop]) {
        contRepetido = num[prop];
        contNumero = prop;
      }
    }
  
    return contNumero;
  }
  //Exercício 6
  function somaTodosNumeros(numeros) {
    let total = 0;
    for (let index = 1; index <= numeros; index += 1) {
      total = total + index;
    }
    return total;
  }
  //Exercício 7
  function verificaFimPalavra(palavra, fimPalavra) {
    palavra = palavra.split('');
    fimPalavra = fimPalavra.split('');
    controle = true;
    for (let index = 0; index < fimPalavra.length; index += 1) {
      if (palavra[palavra.length - fimPalavra.length + index] != fimPalavra[index]) {
        controle = false;
      }
    }
    return controle;
  }
  
  function verificaFimPalavra(palavra, fimPalavra) {
    let inversoPalavra = palavra.split('').reverse().join('');
    let inversoFimPalavra = fimPalavra.split('').reverse().join('');
    let result;
  
    for (let index = 0; index < inversoFimPalavra.length; index += 1) {
      if (inversoPalavra[index] !== inversoFimPalavra[index]) {
        result = false;
        break;
      } else {
        result = true;
      }
    }
    
    return result;
  }