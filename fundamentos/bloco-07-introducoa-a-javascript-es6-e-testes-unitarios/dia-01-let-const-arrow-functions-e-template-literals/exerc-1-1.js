// function testingScope(escopo) {
//     if (escopo === true) {
//       var ifScope = 'Não devo ser utilizada fora do meu escopo (if)';
//       ifScope = ifScope + ' ótimo, fui utilizada no escopo !';
//       console.log(ifScope);
//     } else {
//       var elseScope = 'Não devo ser utilizada fora meu escopo (else)';
//       console.log(elseScope);
//     }
//     console.log(ifScope + ' o que estou fazendo aqui ? :O'); // Se necessário esta linha pode ser removida.
//   }


// Mudando para Arrow Functions e Template Literals:

const testingScope = (escopo) => {
    const ifScope = 'Não devo ser utilizada fora do meu escopo';
    if (escopo === true) {     
        console.log(`${ifScope} (if) ótimo, fui utilizada no escopo !`);
    } else {
        console.log(`${ifScope} (else) o que estou fazendo aqui ? :O`);
    }
}

testingScope(true);