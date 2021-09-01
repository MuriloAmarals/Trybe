const lesson1 = {
    materia: 'Matemática',
    numeroEstudantes: 20,
    professor: 'Maria Clara',
    turno: 'manhã',
  };
  
  const lesson2 = {
    materia: 'História',
    numeroEstudantes: 20,
    professor: 'Carlos',
  };
  
  const lesson3 = {
    materia: 'Matemática',
    numeroEstudantes: 10,
    professor: 'Maria Clara',
    turno: 'noite',
  };

  const addNewKey = (obj, key, value) => obj[key] = value;
addNewKey(lesson2, 'turno', 'noite');

  const listKeys = (obj) =>  Object.keys(obj);
console.log(listKeys(lesson1));

  const sizeObj = (obj) =>  Object.keys(obj).length;
console.log(sizeObj(lesson1));

  const listValues = (obj) =>  Object.values(obj);
console.log(listValues(lesson1));

  const allLessons = Object.assign({}, { lesson1, lesson2, lesson3 });
console.log(allLessons);

  function studentsTotal(lesson){
    const keys = Object.keys(lesson);

    let total = 0;

    for (let i = 0; i < keys.length; i += 1){
      const currentKey = keys[i];
      total += lesson[currentKey].numeroEstudantes;
    }
  }
console.log(studentsTotal(allLessons))

const getValueByNumber = (obj,number) => Object.values(obj)[number];
console.log(getValueByNumber);

const verifyPair = (obj, key, value) => {
  const arr = Object.entries(obj);
  let isEqual = false;
  for (let index in arr) {
    if (arr[index][0] === key && arr[index][1] === value) isEqual = true;
  }
  return isEqual;
};
console.log(verifyPair(lesson2,'professor','Carlos'));



