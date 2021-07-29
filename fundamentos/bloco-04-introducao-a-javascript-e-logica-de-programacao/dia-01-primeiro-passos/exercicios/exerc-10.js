let valorcusto = 1;
let valorvenda = 3;

if (valorcusto >= 0 && valorvenda >= 0) {
  let totalcusto = valorcusto * 1.2;
  let lucro = (valorvenda - totalcusto) * 1000;
  console.log(lucro);
} else {
  console.log("Error, os valores não podem ser negativos");
};