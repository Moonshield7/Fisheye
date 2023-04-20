//Recherche de l'ID du photographe dans l'url de page
const params = (new URL(document.location)).searchParams;
let idPhotographer = params.get("id");

// Récupération des données
async function getData(target) {
    const r = await fetch('/data/photographers.json')
    if(r.ok){
        const rJSON = await r.json();
        const photographers = rJSON.photographers
        const medias = rJSON.media;

        // Récupération des données du photographe grâce à son ID
        if(target === "photographer"){
            const currentPhotographer = photographers.find(photographer => photographer.id == idPhotographer);
        
            return currentPhotographer;
        }
        // Récupération des médias du photographe grâce à son ID, stockées dans un tableau
        if(target === "media"){
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
    const gallery = document.querySelector(".gallery");

    mediasArray.forEach((media) => {
            const mediaModel = mediaFactory(media, "gallery");
            const mediaCardDOM = mediaModel.getGallery();
            gallery.appendChild(mediaCardDOM);
    })
}

// Affichage des informations du photographe
async function displayDataPhotographer(photographer) {
    const photographerHeader = document.querySelector('.photograph-header')

    const photographerModel = photographerFactory(photographer, "gallery");
    const photographerDOM = photographerModel.getPhotographHeader();
    photographerHeader.appendChild(photographerDOM);
}

// #### GESTION DE LA LIGHTBOX ####

async function displayLightboxMedia(mediasArray, id) {
    // Utilisation d'une variable pour changer d'index dans le tableau des medias
    let j = 0;

    // Affichage de la lightbox sur la photo cliquée grâce à son ID
    for(let i = 0; i < mediasArray.length ; i++){
        if(mediasArray[i].id == id || mediasArray[i].id == id){
            const lightbox = document.getElementById('lightbox_modal');
            const lightboxModel = mediaFactory(mediasArray[i], "lightbox");
            const lightboxDOM = lightboxModel.getLightboxPicture();
            lightbox.appendChild(lightboxDOM);
            // Fonction de navigation entre les images
            before(i);
            after(i);
        }
    }

    // Affichage de la nouvelle image grâce au nouvel index calculé
    function navigateLightbox(i, newIndex, mediasArray){
        lightbox.children[lightbox.children.length - 1].innerHTML = '';
        let lightboxModelChanged = mediaFactory(mediasArray[newIndex], "lightbox");
        let lightboxDOMChanged = lightboxModelChanged.getLightboxPicture();
        lightbox.appendChild(lightboxDOMChanged);
        before(i);
        after(i)
    }

    // Fonction qui permet d'afficher l'image précédente dans le tableau des médias. Si cliqué depuis la première image, renvoie à la fin du tableau.
    function before(i){
        const previous = document.getElementById("left");
        previous.addEventListener('click', ()=> {
            j--;
            newIndex = i+j;
            if(newIndex >= 0){
                navigateLightbox(i, newIndex, mediasArray);
            } else {
                i = mediasArray.length-1;
                j = 0
                newIndex = i + j;
                console.log("Retour au dernier media");
                navigateLightbox(i, newIndex, mediasArray);
            }
        })
    }

    // Fonction qui permet d'afficher l'image suivante dans le tableau des médias. Si cliqué depuis la dernière image, renvoie au début du tableau.
    function after(i){
        const following = document.getElementById("right");
        following.addEventListener('click', ()=> {
            j++;
            newIndex = i+j;
            if( newIndex < mediasArray.length){
                navigateLightbox(i, newIndex, mediasArray);
            } else {
                i = 0;
                j = 0
                newIndex = i + j;
                console.log("Retour au premier media");
                navigateLightbox(i, newIndex, mediasArray);
            }
        })
    }
}

async function init(){
    // Logo accessible via la navigation clavier
    const logo = document.querySelector(".logo");
    logo.focus();
    
    // Affichage des données du photographe sélectionné
    const photographer = await getData("photographer");
    displayDataPhotographer(photographer);

    // Affichage de la gallerie des médias du photographe sélectionné
    const medias = await getData("media");
    displayDataMedias(medias, photographer);
    
    // Affichage de la lightbox lorsque l'on clique sur l'un des médias de la gallerie
    const clickableArray = document.querySelectorAll('.clickable');
    clickableArray.forEach(picture => {
        picture.addEventListener('click', ()=> {
            openLightbox();
            displayLightboxMedia(medias, picture.id)
        })
    })

}

init();
