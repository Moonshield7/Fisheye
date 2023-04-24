/* eslint-disable no-undef */
//Recherche de l'ID du photographe dans l'url de page
const params = (new URL(document.location)).searchParams;
let idPhotographer = params.get('id');

// Récupération des données
async function getData(target) {
	const r = await fetch('/data/photographers.json');
	if(r.ok){
		const rJSON = await r.json();
		const photographers = rJSON.photographers;
		const medias = rJSON.media;

		// Récupération des données du photographe grâce à son ID
		if(target === 'photographer'){
			const currentPhotographer = photographers.find(photographer => photographer.id == idPhotographer);
        
			return currentPhotographer;
		}
		// Récupération des médias du photographe grâce à son ID, stockées dans un tableau
		if(target === 'media'){
			const mediasArray = [];
			for(let i = 0; i < medias.length; i++){
				if(medias[i].photographerId == idPhotographer){
					mediasArray.push(medias[i]);
				}
			}
			return mediasArray;
		}

	}
}

// Affichage de la gallerie du photographe
async function displayDataMedias(mediasArray){
	const gallery = document.querySelector('.gallery');
	gallery.innerHTML = '';

	mediasArray.forEach((media) => {
		// eslint-disable-next-line no-undef
		const mediaModel = mediaFactory(media, 'gallery');
		const mediaCardDOM = mediaModel.getGallery();
		gallery.appendChild(mediaCardDOM);
	});
}

// Affichage des informations du photographe
async function displayDataPhotographer(photographer, likeAmount) {
	const photographerHeader = document.querySelector('.photograph-header');
	photographerHeader.innerHTML = '';

	const photographerModel = photographerFactory(photographer, 'gallery', likeAmount);
	const photographerDOM = photographerModel.getPhotographHeader();
	photographerHeader.appendChild(photographerDOM);
}

// #### GESTION DE LA LIGHTBOX ####

// Affichage de la lightbox lorsque l'on clique sur l'un des médias de la gallerie
function displayLightbox(medias){
	const clickableArray = document.querySelectorAll('.clickable');
	clickableArray.forEach(picture => {
		picture.addEventListener('click', () => {
			openLightbox();
			displayLightboxMedia(medias, picture.id);
		});
	});
}
async function init(){
	// Logo accessible via la navigation clavier
	const logo = document.querySelector('.logo');
	logo.focus();

	// Constantes à utiliser :
	const photographer = await getData('photographer');
	const medias = await getData('media');
        
	// Nombre de likes
	let likeAmount = 0;
	function getInitialLikes(){
		medias.forEach((media) => {
			likeAmount += media.likes;
		});
	}
	getInitialLikes();

	// Affichage de la gallerie des médias du photographe sélectionné
	displayDataMedias(medias, photographer);
	addLike(likeAmount);



	//Tri des images
	const sortSelect = document.getElementById('sort-select');
	const gallery = document.querySelector('.gallery');
	sortSelect.addEventListener('change', ()=>{
		if(sortSelect.value === 'popularity'){
			medias.sort((a, b) => {
				return b.likes - a.likes;
			});
		}
		else if(sortSelect.value === 'date'){
			medias.sort((a, b) => {
				if(a.date < b.date){
					return 1;
				}
				if(a.date > b.date){
					return -1;
				}
				return 0;
			});
		}
		else if(sortSelect.value === 'title'){
			medias.sort((a, b) => {
				if(a.title < b.title){
					return -1;
				}
				if(a.title > b.title){
					return 1;
				}
				return 0;
			});
		}
		gallery.innerHTML = '';
		likeAmount = 0;
		getInitialLikes();
		displayDataMedias(medias, photographer);
		displayLightbox(medias);
		addLike(likeAmount);
        
	});

	// Affichage des données du photographe sélectionné
	displayDataPhotographer(photographer, likeAmount);    
	displayLightbox(medias);


}

init();
