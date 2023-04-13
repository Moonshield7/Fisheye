//Mettre le code JavaScript lié à la page photographer.html
const params = (new URL(document.location)).searchParams;
let idPhotographer = params.get("id");

console.log(idPhotographer);