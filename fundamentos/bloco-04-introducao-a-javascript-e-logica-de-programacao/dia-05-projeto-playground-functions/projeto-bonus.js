// Desafio 11
function generatePhoneNumber(arr) {
    let number = arr;
  
    if (number.length != 11) {
      return "Array com tamanho incorreto.";
    } else if (numberRepetition(arr) || numberCheck(arr)) {
      return "não é possível gerar um número de telefone com esses valores";
    } else {
      return (
        "(" +
        number[0] +
        number[1] +
        ")" +
        " " +
        number[2] +
        number[3] +
        number[4] +
        number[5] +
        number[6] +
        "-" +
        number[7] +
        number[8] +
        number[9] +
        number[10]
      );
    }
  }
  
  function numberRepetition(arr) {
    let sum = 0;
    let number = arr;
  
    for (let i = 0; i <= number.length; i += 1) {
      for (let j = 0; j <= number.length; j += 1) {
        if (number[i] === number[j]) {
          sum += 1;
        }
      }
      if (sum === 3) {
        return true;
      } else {
        sum = 0;
      }
    }
  }
  
  function numberCheck(arr) {
    let array = arr;
  
    for (let i = 0; i < array.length; i += 1) {
      if (array[i] > 9 || array[i] < 0) {
        return true;
      }
    }}

// Desafio 12
function triangleCheck(lineA, lineB, lineC) {
  if (lineA >= lineB + lineC || lineB >= lineA + lineC || lineC >= lineB + lineA) {
    return false;
  } else {
    return true;
  }
}

// Desafio 13
function hydrate(string) {
  let r = /\d+/g;
  let stringNumbers = string.match(r);
  let sum = 0;

  for (let i = 0; i < stringNumbers.length; i += 1) {
    sum += parseInt(stringNumbers[i]);
  }

  if (sum === 1) {
    return '1 copo de água';
  } else {
    return sum + ' copos de água';
  }
}