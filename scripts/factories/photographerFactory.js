// eslint-disable-next-line no-unused-vars
function photographerFactory(data, page, likeAmount) {
	const { name, portrait, city, country, tagline, price, id } = data;

	const picture = `assets/photographers/${portrait}`;

	// Photo de profil
	const img = document.createElement( 'img' );
	img.setAttribute('src', picture);
	img.setAttribute('alt', `Portrait de ${name}`);
	// Nom du photographe
	const h2 = document.createElement( 'h2' );
	h2.textContent = name;
	// Localisation
	const h3 = document.createElement('h3');
	h3.textContent = `${city}, ${country}`;
	h3.setAttribute('aria-label', `Localisation ${city}, ${country}`);
	h3.setAttribute('tabindex', '0');
	// Slogan
	const h4 = document.createElement('h4');
	h4.textContent = tagline;
	h4.setAttribute('aria-label', `Slogan : ${tagline}`);
	h4.setAttribute('tabindex', '0');
	// Prix
	const h5 = document.createElement('h5');
	h5.textContent = `${price}€/jour`;
	h5.setAttribute('aria-label', `Prix : ${price}€ par jour`);
	h5.setAttribute('tabindex', '0');
	// Nom du photographe pour la modale
	const h2bis = document.createElement( 'h2' );
	h2bis.textContent = name;

	function getUserCardDOM() {
		const article = document.createElement( 'article' );

		// Element a qui englobe la photo et le titre
		const linkContainer = document.createElement('a');
		linkContainer.setAttribute('href', `photographer.html?id=${id}`);
		linkContainer.setAttribute('aria-label', name);

		// Ajout des éléments ci-dessus au DOM
		article.appendChild(linkContainer);
		linkContainer.appendChild(img);
		linkContainer.appendChild(h2);
		article.appendChild(h3);
		article.appendChild(h4);
		article.appendChild(h5);
		return (article);
	}

	function getPhotographHeader(){
		const article = document.createElement('article');
		const button = document.createElement('button');
		button.textContent = 'Contactez-moi';
		button.setAttribute('class', 'contact_button');
		button.setAttribute('onclick', 'displayModal()');
		button.setAttribute('aria-label', 'Contactez-moi');
		button.setAttribute('tabindex', '0');
		const encart = document.createElement('div');
		encart.setAttribute('class', 'encart');
		encart.setAttribute('tabindex', '0');

		//nb like total
		const likesContainer = document.createElement('div');
		const heartIcon = document.createElement('i');  
		heartIcon.setAttribute('class', 'fa-solid fa-heart gallery-like');

		const nombreLikes = document.createElement('h5');
		nombreLikes.innerText = `${likeAmount}`;
		nombreLikes.setAttribute('aria-label', `Nombre de j'aime : ${likeAmount}`);
		nombreLikes.classList.add('total-likes');

		h2.setAttribute('tabindex', '0');
		img.setAttribute('tabindex', '0');
		h5.setAttribute('tabindex', '-1');

		const modalTitle = document.getElementById('modal_title');
        
		encart.appendChild(likesContainer);
		likesContainer.appendChild(nombreLikes);
		likesContainer.appendChild(heartIcon);
		encart.appendChild(h5);
		article.appendChild(h2);
		article.appendChild(h3);
		article.appendChild(h4);
		article.appendChild(button);
		article.appendChild(img);
		article.appendChild(encart);
		modalTitle.appendChild(h2bis);
		return (article);
	}

	return { name, picture, getUserCardDOM, getPhotographHeader };
}

