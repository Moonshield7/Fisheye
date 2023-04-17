function mediaFactory(data){
    const {id, photographerId, title, image, video, likes, date, price} = data;

    //Récupération des url des photos et vidéos
    const imagePathUrl = `assets/Photos/${photographerId}/${image}`;
    const videoPathUrl = `assets/Photos/${photographerId}/${video}`;
    
    // Création des éléments du DOM
        // Container : article
    const article = document.createElement('article');
        // Lien qui contient l'image clickable
    const imageLink = document.createElement('a');
    imageLink.setAttribute("aria-label", `${title}`)
        // Si l'image est une photo :
    const pictureContent = document.createElement('img');
    pictureContent.src = imagePathUrl;
        // Si l'image est une vidéo, on récupère une miniature
    const videoContent = document.createElement('video');
    videoContent.setAttribute("width", "300");
    videoContent.setAttribute("height", "250");
    videoContent.innerHTML = `<source src="${videoPathUrl}#t=0.1" type="video/mp4">`;
        // Section de texte sous l'image
    const pictureText = document.createElement('section')
    pictureText.setAttribute("class", "picture-text");
        // Titre de l'image
    const pictureName = document.createElement('h3');
    pictureName.textContent = `${title}`;
    pictureName.setAttribute("tabindex", "0");
    
        // Nombre de likes de l'image
    const pictureLikes = document.createElement('h3');
    pictureLikes.textContent = `${likes} ♥`;
    pictureLikes.setAttribute("tabindex", "0");
    pictureLikes.setAttribute("aria-label", `${likes} likes - icône coeur`);
    pictureLikes.setAttribute("class", "like-amount");

    // Fonction qui permet d'afficher la gallerie
    function getGallery() {
        article.appendChild(imageLink);
        if(video !== undefined){
            imageLink.appendChild(videoContent);
            imageLink.href = videoPathUrl;
        } 
        if(image !== undefined) {
            imageLink.appendChild(pictureContent);
            imageLink.href = imagePathUrl;
        }

        article.appendChild(pictureText);
        pictureText.appendChild(pictureName);
        pictureText.appendChild(pictureLikes);

        return article;
    }

    return { getGallery };

}