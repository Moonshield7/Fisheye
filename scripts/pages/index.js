async function getPhotographers() {
	// Récupération des données des photographes dans le fichier JSON
	const r = await fetch('/data/photographers.json');
	if(r.ok){
		return r.json();
	}
	// Affichage d'une erreur personnalisée en cas de mauvais url
	throw new Error('Impossible de trouver les données, vérifier l\'url fourni');


}

// Fonction d'affichage des photographes
async function displayData(photographers) {
	const photographersSection = document.querySelector('.photographer_section');

	photographers.forEach((photographer) => {
		// eslint-disable-next-line no-undef
		const photographerModel = photographerFactory(photographer, 'index');
		const userCardDOM = photographerModel.getUserCardDOM();
		photographersSection.appendChild(userCardDOM);
	});
}

async function init() {
	// Récupère les datas des photographes
	const { photographers } = await getPhotographers();
	displayData(photographers);
}
    
init();
    
