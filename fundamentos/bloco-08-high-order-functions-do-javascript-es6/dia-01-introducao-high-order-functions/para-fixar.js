const stringAcordando = () => 'Acordando!!';
const stringCafe = () => 'Bora tomar um café!!';
const stringDormir = () => 'Partiu dormir!!';

const hof = (func) => func ();

console.log(hof(stringAcordando));
console.log(hof(stringCafe));
console.log(hof(stringDormir));