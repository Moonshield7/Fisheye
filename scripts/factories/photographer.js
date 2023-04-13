function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );

        // Element a qui englobe la photo et le titre
        const linkContainer = document.createElement('a');
        linkContainer.setAttribute("href", `photographer.html?id=${id}`);
        linkContainer.setAttribute("aria-label", name);

        // Photo de profil
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", "");

        // Nom du photographe
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        // Localisation
        const h3 = document.createElement('h3')
        h3.textContent = `${city}, ${country}`
        h3.setAttribute("aria-label", `Localisation : ${city}, ${country}`);
        h3.setAttribute('tabindex', "0");

        // Slogan
        const h4 = document.createElement('h4');
        h4.textContent = tagline;
        h4.setAttribute("aria-label", `Slogan : ${tagline}`);
        h4.setAttribute('tabindex', "0");

        // Prix
        const h5 = document.createElement('h5');
        h5.textContent = `${price}€/jour`;
        h5.setAttribute("aria-label", `Prix : ${price}€ par jour`);
        h5.setAttribute('tabindex', "0");

        // Ajout des éléments ci-dessus au DOM
        article.appendChild(linkContainer);
        linkContainer.appendChild(img);
        linkContainer.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(h4);
        article.appendChild(h5);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}

