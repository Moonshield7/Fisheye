function mediaFactory(data, page){
    const {id, photographerId, title, image, video, likes, date, price} = data;

        //Récupération des url des photos et vidéos
        const imagePathUrl = `assets/Photos/${photographerId}/${image}`;
        const videoPathUrl = `assets/Photos/${photographerId}/${video}`;
        
        // Création des éléments du DOM
            // Container : article
        const article = document.createElement('article');
            // Section de texte sous l'image
        const pictureText = document.createElement('section')
        pictureText.setAttribute("class", "picture-text");
            // Titre de l'image
        const pictureName = document.createElement('h3');
        pictureName.classList.add = "picture-title"
        pictureName.textContent = `${title}`;
        pictureName.setAttribute("tabindex", "0");
        
            // Nombre de likes de l'image
        const likesContainer = document.createElement('div');
        likesContainer.setAttribute("class", "like-amount");
        const heartIcon = document.createElement('i')
        heartIcon.setAttribute('class', 'fa-solid fa-heart gallery-like');
        heartIcon.setAttribute("tabindex", "0");
        const pictureLikes = document.createElement('h3');
        pictureLikes.innerHTML = `${likes}`;
        pictureLikes.setAttribute("tabindex", "0");
        pictureLikes.setAttribute("aria-label", `${likes} likes - icône coeur`);
        
    
        if(page === "gallery") {
            // Fonction qui permet d'afficher la gallerie
            function getGallery() {
                // Si l'image est une vidéo, on récupère une miniature
                if(data.video){
                    const videoContent = document.createElement('video');
                    videoContent.setAttribute("width", "300");
                    videoContent.setAttribute("height", "250");
                    videoContent.setAttribute("tabindex", "0");
                    videoContent.classList.add("clickable");
                    videoContent.setAttribute("aria-label", `Vidéo : ${title}`)
                    videoContent.setAttribute("id", id);
                    videoContent.innerHTML = `<source src="${videoPathUrl}#t=0.1" type="video/mp4">`;
                    article.appendChild(videoContent);
                } 
                // Si l'image est une photo :
                if(data.image) {
                    const pictureContent = document.createElement('img');
                    pictureContent.src = imagePathUrl;
                    pictureContent.classList.add("clickable");
                    pictureContent.setAttribute("id", id);
                    pictureContent.setAttribute("alt", "");
                    pictureContent.setAttribute("tabindex", 0);
                    article.appendChild(pictureContent);
                }
            
                article.appendChild(pictureText);
                pictureText.appendChild(pictureName);
                pictureText.appendChild(likesContainer);
                likesContainer.appendChild(pictureLikes);
                likesContainer.appendChild(heartIcon);
            
                return article;
            }
        }

        if(page === "lightbox") {
            // Fonction qui permet d'afficher la lightbox
            function getLightboxPicture(){
                article.setAttribute('id', 'current-content')
                // Récupération de la section dans laquelle les éléments apparaîtront
                const principalSection = document.createElement('section');
                // Création de la flèche gauche
                const arrowLeft = document.createElement('div');
                arrowLeft.classList.add("arrow");
                arrowLeft.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
                arrowLeft.setAttribute("id", "left");
                arrowLeft.setAttribute("aria-label", "Image précédente");
                arrowLeft.setAttribute("tabindex", "0");

                // Création de la flèche droite
                const arrowRight = document.createElement('div');
                arrowRight.classList.add("arrow");
                arrowRight.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
                arrowRight.setAttribute("id", "right");
                arrowRight.setAttribute("aria-label", "Image suivante");
                arrowRight.setAttribute("tabindex", "0");
                
                // Ajout des éléments dans la lightbox
                article.appendChild(arrowLeft);
                article.appendChild(principalSection);
                article.appendChild(arrowRight);
    
                // Si l'image est une vidéo :
                if(data.video){
                    const videoContent = document.createElement('video');
                    videoContent.setAttribute("width", "1050");
                    videoContent.setAttribute("height", "900");
                    videoContent.setAttribute("controls", "yes")
                    videoContent.innerHTML = `<source src="${videoPathUrl}" type="video/mp4">`;
                    videoContent.setAttribute("aria-label", title)
                    principalSection.appendChild(videoContent);
                } 
                // Si l'image est une photo :
                if(data.image) {
                    const pictureContent = document.createElement('img');
                    pictureContent.src = imagePathUrl;
                    pictureContent.setAttribute("attr", title)
                    pictureContent.setAttribute("tabindex", "0");
                    principalSection.appendChild(pictureContent);
                }
    
                principalSection.appendChild(pictureName);
                
                return article;
            }
        }



    
        return { getGallery, getLightboxPicture };
}