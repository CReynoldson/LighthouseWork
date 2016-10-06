var students = [
  { id: 1, name: "bruce",    age: 40 },
  { id: 2, name: "zoidberg", age: 22 },
  { id: 3, name: "alex",     age: 22 },
  { id: 4, name: "alex",     age: 30 }
];

students.sort(sortByName)

function sortByName(a, b){
  var nameA = a.name.toUpperCase();
  var nameB = b.name.toUpperCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return sortByAge(a.age, b.age);
}

function sortByAge(a, b){
  var ageA = a;
  var ageB = b;
  if (ageA < ageB){
    return 1;
  }
  if (ageB < ageA){
    return -1;
  }
  return 0;
}

console.log(students);

