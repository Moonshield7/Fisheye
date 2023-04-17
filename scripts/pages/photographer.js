//Mettre le code JavaScript lié à la page photographer.html
const params = (new URL(document.location)).searchParams;
let idPhotographer = params.get("id");

// console.log(idPhotographer);

async function getData(target) {
    // Récupération des données des photographes dans le fichier JSON
    const r = await fetch('/data/photographers.json')
    // console.log(await r);
    if(r.ok){
        const rJSON = await r.json();
        // console.log(rJSON);
        const photographers = rJSON.photographers
        // console.log(photographers);
        const medias = rJSON.media;


        if(target === "photographer"){
            const currentPhotographer = photographers.find(photographer => photographer.id == idPhotographer);
            // console.log("Photographe :", currentPhotographer)
        
            return currentPhotographer;
        }
        if(target === "media"){
            const mediasArray = [];
            // console.log(mediasArray)
            for(let i = 0; i < medias.length; i++){
                if(medias[i].photographerId == idPhotographer){
                    mediasArray.push(medias[i]);
                }
                
            }
            return mediasArray;
        }

    }
}

async function displayDataMedias(mediasArray, photographer){
    const gallery = document.querySelector(".gallery");

    console.log(mediasArray);

    mediasArray.forEach((media) => {
        if (media.photographerId === photographer.id) {
            const mediaModel = mediaFactory(media);
            const mediaCardDOM = mediaModel.getGallery();
            gallery.appendChild(mediaCardDOM);
        }
    })
}



async function displayDataPhotographer(photographer) {
    const photographerHeader = document.querySelector('.photograph-header')

    const blob = photographerFactory(photographer, "gallery");
    const plop = blob.getPhotographHeader();
    photographerHeader.appendChild(plop);
}

async function init(){
    const photographer = await getData("photographer");
    displayDataPhotographer(photographer);

    const medias = await getData("media");
    // const { medias } = await getData("media");
    displayDataMedias(medias, photographer);
}

init();