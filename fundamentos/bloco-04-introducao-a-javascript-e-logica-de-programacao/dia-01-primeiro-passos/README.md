# Para Fixar

1.1  Crie uma constante chamada  `myName`  e atribua a ela o seu nome (Exemplo: Carolina);
1.2  Crie uma constante chamada  `birthCity`  e atribua a ela a sua cidade natal;
1.3  Crie uma variável chamada  `birthYear`  e atribua a ela o ano em que você nasceu;
1.4  Utilize o  `console.log()`  para imprimir as constantes e variáveis que você criou;
1.5 Altere o valor atribuído à variável  `birthYear`  para 2030. Faça um  `console.log(birthYear)`  novamente para ver o que acontece!
1.6  Altere o valor atribuído à constante  `birthCity`  . Faça um  `console.log(birthCity)`  novamente! Você saberia explicar por que recebemos uma mensagem de erro? 🤔

2.1  Crie uma variável chamada  `base`  e uma variável chamada  `altura`  e atribua os seus respectivos valores: 5 e 8;
2.2  Crie uma variável chamada  `area`  e atribua a ela o resultado da multiplicação da base pela altura. Dica: lembre-se de usar  sempre o  `console.log()`  para imprimir as variáveis e checar os resultados das operações!
2.3  Crie uma variável chamada  `perimetro`  e atribua a ela a soma de todos os lados do retângulo;

3.1  Crie uma variável que receba a nota de uma pessoa candidata em um desafio técnico, e atribua a ela um valor entre 1 e 100;
3.2  Implemente uma lógica que verifique se a pessoa candidata foi aprovada, reprovada ou se ela está na lista de espera. Para isso, considere as seguintes informações:

-   Se a nota for maior ou igual a 80, imprima "Parabéns, você foi aprovada(o)!"
-   Se a nota for menor que 80 e maior ou igual a 60, imprima "Você está na nossa lista de espera"
-   Se a nota for menor que 60, imprima "Você foi reprovada(o)"

3.3  Crie uma estrutura condicional utilizando o  `if`  ,  `else if`  e  `else`  para criar o seu algoritmo, e os operadores lógicos que se aplicam a cada situação.
3.4  Altere o valor da nota para verificar se as condições que você implementou funcionam;

4.1  Crie uma variável para armazenar o estado da pessoa candidata no processo seletivo, que pode ser:  `'aprovada'`  ,  `'lista'`  ou  `'reprovada'`  ;
4.2  Crie uma estrutura condicional com o  `switch/case`  que irá imprimir as mensagens do exercício anterior se o estado da pessoa candidata for  `'aprovada'`  ,  `'lista'`  ou  `'reprovada'`  . Como  `default`  , imprima a mensagem de  `'não se aplica'`  .

# Agora a prática

1.  Faça cinco programas, um para cada operação aritmética básica. Seu programa deve ter duas variáveis,  `a`  e  `b`  , definidas no começo com os valores que serão operados. Faça programas para:

-   Adição (a + b)
-   Subtração (a - b)
-   Multiplicação (a * b)
-   Divisão (a / b)
-   Módulo (a % b)

2.  Faça um programa que retorne o maior de dois números. Defina no começo do programa duas variáveis com os valores que serão comparados.
    
3.  Faça um programa que retorne o maior de três números. Defina no começo do programa três variáveis com os valores que serão comparados.
    
4.  Faça um programa que, dado um valor definido numa variável, retorne "positive" se esse valor for positivo, "negative" se for negativo e "zero" caso contrário.
    
5.  Faça um programa que defina três variáveis com os valores dos três ângulos internos de um triângulo. Retorne  `true`  se os ângulos representarem os ângulos de um triângulo e  `false`  , caso contrário. Se algum ângulo for inválido o programa deve retornar uma mensagem de erro.
  
-   Um ângulo será considerado inválido se não tiver um valor positivo.
    

6.  Escreva um programa que receba o nome de uma peça de xadrez e retorne os movimentos que ela faz.

-   Como desafio, faça o programa funcionar tanto se receber o nome de uma peça com letras maiúsculas quanto com letras minúsculas,  _sem_ aumentar a quantidade de condicionais.
    
-   Como dica, você pode pesquisar uma função que faz uma  _string_ ficar com todas as letras minúsculas  _(lower case)_ .
    
-   Se a peça passada for inválida, o programa deve retornar uma mensagem de erro.
    
-   Exemplo:  `bishop`  (bispo) ->  `diagonals`  (diagonais)
    

7.  Escreva um programa que converte uma nota dada em porcentagem (de 0 a 100) em conceitos de A a F. Siga essas regras:

-   Porcentagem >= 90 -> A
    
-   Porcentagem >= 80 -> B
    
-   Porcentagem >= 70 -> C
    
-   Porcentagem >= 60 -> D
    
-   Porcentagem >= 50 -> E
    
-   Porcentagem < 50 -> F
    
-   O programa deve retornar uma mensagem de erro e encerrar se a nota passada for menor que 0 ou maior que 100.
    

8.  Escreva um programa que defina três números em variáveis e retorne  `true`  se pelo menos uma das três for par. Caso contrário, ele retorna  `false`  .

-   _**Bonus:** use somente um  `if`  ._

9.  Escreva um programa que defina três números em variáveis e retorne  `true`  se pelo menos uma das três for ímpar. Caso contrário, ele retorna  `false`  .

-   _**Bonus:** use somente um  `if`  ._

10.  Escreva um programa que se inicie com dois valores em duas variáveis diferentes: o custo de um produto e seu valor de venda. A partir dos valores, calcule quanto de lucro (valor de venda descontado o custo do produto) a empresa terá ao vender mil desses produtos.

-   Atente que, sobre o custo do produto, incide um imposto de 20%.
    
-   Seu programa também deve emitir uma mensagem de erro e encerrar caso algum dos seus valores de entrada seja menor que zero.
    
-   O lucro de um produto é o resultado da subtração do valor de venda pelo custo do mesmo, sendo que o imposto de 20% também faz parte do valor de custo.
    
    -   valorCustoTotal = valorCusto + impostoSobreOCusto
    -   lucro = valorVenda - valorCustoTotal (lucro de um produto)

11.  Uma pessoa que trabalha de carteira assinada no Brasil tem descontados de seu salário bruto o INSS e o IR. Faça um programa que, dado um salário bruto, calcule o líquido a ser recebido.
