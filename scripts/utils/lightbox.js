const lightbox = document.getElementById("lightbox_modal");
const closeLightboxButton = document.getElementById("lightbox_close-button");

// Ouverture de la lightbox
function openLightbox(){
    lightbox.style.display = "flex";
    lightbox.setAttribute("aria-hidden", "false");
    background.style.display ="block";
    main.setAttribute("aria-hidden", "true");
    body.classList.add("no-scroll");
    closeLightboxButton.focus();
}

// Fermeture de la lightbox, permettant de vider son contenu sans avoir à recharger la page
function closeLightbox() {
    const currentContent = document.getElementById('current-content');
    lightbox.removeChild(currentContent);
    lightbox.style.display = "none";
    lightbox.setAttribute("aria-hidden", "true");
    background.style.display ="none";
    main.setAttribute("aria-hidden", "false");
    body.classList.remove("no-scroll");
}

// Fermeture de la lightbox au click sur la croix
closeLightboxButton.addEventListener('click', ()=> {
    closeLightbox();
})

// Fermeture de la lightbox via la touche echap
document.addEventListener('keydown', (e) => {
    const keyCode = e.keyCode ? e.keyCode : e.which;
    if(lightbox.style.display === "flex" && keyCode === 27){
        closeLightbox();
    }
})

async function displayLightboxMedia(mediasArray, id) {
    // Utilisation d'une variable pour changer d'index dans le tableau des medias
    let j = 0;
    let index;

    // Affichage de la lightbox sur la photo cliquée grâce à son ID
    for(let i = 0; i < mediasArray.length ; i++){
        if(mediasArray[i].id == id || mediasArray[i].id == id){
            index = i;
            const lightbox = document.getElementById('lightbox_modal');
            const lightboxModel = mediaFactory(mediasArray[i], "lightbox");
            const lightboxDOM = lightboxModel.getLightboxPicture();
            lightbox.appendChild(lightboxDOM);
            // Fonction de navigation entre les images
            before(i);
            after(i);
            
        }
    }
    
    document.addEventListener("keydown", (e) => {
        if(lightbox.style.display === "flex"){
            if(e.key === "ArrowLeft" || (e.key === "Enter" && document.activeElement === document.getElementById("left"))){
                j--;
                newIndex = index+j;
                if(newIndex >= 0){
                    navigateLightbox(index, newIndex, mediasArray);
                } else {
                    index = mediasArray.length-1;
                    j = 0
                    newIndex = index + j;
                    console.log("Retour au dernier media");
                    navigateLightbox(index, newIndex, mediasArray);
                }
            }
            if(e.key === "ArrowRight" || (e.key === "Enter" && document.activeElement === document.getElementById("right"))){
                j++;
                newIndex = index+j;
                if( newIndex < mediasArray.length){
                    navigateLightbox(index, newIndex, mediasArray);
                } else {
                    index = 0;
                    j = 0
                    newIndex = index + j;
                    console.log("Retour au premier media");
                    navigateLightbox(index, newIndex, mediasArray);
                }
            }

        }
    })
    // Affichage de la nouvelle image grâce au nouvel index calculé
    function navigateLightbox(i, newIndex, mediasArray){
        // Récupération du contenu actuellement affiché
        const currentContent = document.getElementById('current-content');
        lightbox.removeChild(currentContent);
        let lightboxModelChanged = mediaFactory(mediasArray[newIndex], "lightbox");
        let lightboxDOMChanged = lightboxModelChanged.getLightboxPicture();
        lightbox.appendChild(lightboxDOMChanged);
        before(i);
        after(i);
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