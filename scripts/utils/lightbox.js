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
    lightbox.children[lightbox.children.length - 1].innerHTML = '';
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