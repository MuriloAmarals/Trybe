// Desafio 1
function compareTrue(a ,b) {
    if(a === true && b === true){
      return true;
    }
    else{
      return false;
    }
  }
  
  // Desafio 2
  function calcArea(base, height) {
    return (base * height)/2;
  }
  
  // Desafio 3
  function splitSentence(string) {
    let array = string.split(' ');
    return array;
  }
  
  // Desafio 4
  function concatName(arrayOfStrings) {
    return arrayOfStrings[arrayOfStrings.length - 1] + ', ' + arrayOfStrings[0];
  }
  
  // Desafio 5
  function footballPoints(wins, ties) {
    return (wins * 3) + ties;
  }
  
  // Desafio 6
  function highestCount(arrayOfNumbers) {
    let maior = arrayOfNumbers[0];
    let cont = 0;
    for(let index = 0; index < arrayOfNumbers.length; index += 1){
    if(arrayOfNumbers[index] >= maior){
    maior = arrayOfNumbers[index];
    }}
    for(let i = 0; i < arrayOfNumbers.length; i += 1){
    if(maior == arrayOfNumbers[i]){
    cont += 1;
    }}
    return cont;
    }
  
  // Desafio 7
  function catAndMouse(mouse,cat1,cat2) {
    
    let distancecat1 = mouse - cat1;
    let distancecat2 = mouse - cat2;
  
    if(distancecat1 < 0){
      distancecat1 = -1 * distancecat1;
    }
    if(distancecat2 < 0){
      distancecat2 = -1 * distancecat2;
    }
    if( distancecat1 > distancecat2){
      return "cat2";
    }
    else if(distancecat2 > distancecat1){
      return "cat1";
    }
    else{
      return "os gatos trombam e o rato foge";
    }
  }
  
  // Desafio 8
  function fizzBuzz(arrayOfNumbers) {
    let array = [];
    for(let index = 0; index < arrayOfNumbers.length; index += 1){
      if(arrayOfNumbers[index] % 3 == 0 && arrayOfNumbers[index] % 5 == 0){
        array.push('fizzBuzz');
      }
      else if(arrayOfNumbers[index] % 3 == 0){
        array.push('fizz');
      }
      else if(arrayOfNumbers[index] % 5 == 0){
        array.push('buzz');
      }
      else{
        array.push('bug!');
      }
    }
    return array;
  }
  
  // Desafio 9
  function encode(string) 
  {
    let newString = "";
    for (let index = 0; index < string.length; index += 1)
    {
      if (string[index] == 'a')
      {
        newString = newString + 1;
      }
      else if (string[index] == 'e')
      {
        newString = newString + 2;
      }
      else if (string[index] == 'i')
      {
        newString = newString + 3;
      }
      else if (string[index] == 'o')
      {
        newString = newString + 4;
      }
      else if (string[index] == 'u')
      {
        newString = newString + 5;
      }
      else
      {
        newString = newString + string[index];
      }
    }
    return newString;
  }
  
  function decode(string) {
    let newString = "";
    for (let index = 0; index < string.length; index += 1)
    {
      if (string[index] == 1)
      {
        newString = newString + 'a';
      }
      else if (string[index] == 2)
      {
        newString = newString + 'e';
      }
      else if (string[index] == 3)
      {
        newString = newString + 'i';
      }
      else if (string[index] == 4)
      {
        newString = newString + 'o';
      }
      else if (string[index] == 5)
      {
        newString = newString + 'u';
      }
      else
      {
        newString = newString + string[index];
      }}
    return newString;
  }

  // Desafio 10
function techList(array, name) {
    let list = [];
    array.sort();
  
    if (array.length === 0) {
      return "Vazio!";
    }
    for (let key in array) {
      array[key] = {
        tech: array[key],
        name: name,
      };
      list.push(array[key]);
    }
    return list;
  }
  
