let anguloA = 50;
let anguloB = 100;
let anguloC = 30;

let somaangulos = anguloA + anguloB + anguloC;

let todosangulospositivos = anguloA > 0 && anguloB > 0 && anguloC > 0;

if(todosangulospositivos){
  if (somaangulos === 180) {
    console.log(true);
  } else {
    console.log(false);
  };
} else {
  console.log('Erro: ângulo inválido');
}