const adventure = require('../src/setupTeardown');
/*
Num universo não tão distante, um grupo de aventureiros da Trybe enfrentam uma série de testes.
O grupo parte em direção ao sucesso, mas,
devido a ameaça de criaturas temíveis, o grupo não chegará inteiro ao fim.
Após cada aventura um de nossos aventureiros cairá.
Cada um dos testes abaixo verifica a quantidade de aventureiros após cada iteração.
Sua missão aqui é:

  - Use a função randomAttack do objeto adventure
  que remove um dos aventureiros toda vez que é chamada,
  ela deve funcionar entre cada teste.
  Opcional:
  - Para ficar mais visível, imprima na tela após cada teste o grupo de aventureiros restante.
  - No fim dos testes, imprima uma mensagem com o nome do aventureiro que sobreviveu.

PS: Os codinomes dos aventureiros são reais! Tentem descobrir quem é quem!

ATENÇÃO!!! Edite apenas este arquivo. Não altere os arquivos da pasta 'src'.
*/

describe('4 - Quem sobreviveu?', () => {
  // Adicione seu código aqui
  test('Primeiro ataque', () => {
    adventure.randomAttack();
  });

  test('depois da primeira aventura', () => {
    expect(adventure.specialists.length).toBe(5);
  });

  test('Sobreviventes após primeiro e segundo ataque', () => {
    console.table(adventure.specialists);
    adventure.randomAttack();
  });

  test('depois da segunda aventura', () => {
    expect(adventure.specialists.length).toBe(4);
  });

  test('Sobreviventes após segundo e terceiro ataque', () => {
    console.table(adventure.specialists);
    adventure.randomAttack();
  });

  test('depois da terceira aventura', () => {
    expect(adventure.specialists.length).toBe(3);
  });

  test('Sobreviventes após terceiro e quarto ataque', () => {
    console.table(adventure.specialists);
    adventure.randomAttack();
  });

  test('depois da quarta aventura', () => {
    expect(adventure.specialists.length).toBe(2);
  });

  test('Sobreviventes após quarto e quinto ataque', () => {
    console.table(adventure.specialists);
    adventure.randomAttack();
  });

  test('depois da quinta aventura', () => {
    expect(adventure.specialists.length).toBe(1);
  });

  test('Sobrevivente após quinto ataque e vencedor da aventura', () => {
    console.table(adventure.specialists);
  });
});
