// Ecouteur d'évènement pour l'affichage dynamique de likes
// eslint-disable-next-line no-unused-vars
function addLike(likeAmount){
	const heartButtons = document.querySelectorAll('.gallery-like');
	heartButtons.forEach(heart => {
		let isLiked = 0;
		heart.addEventListener('click', () => {
			if(isLiked === 0){
				isLiked += 1;
				likeAmount +=1;
				heart.style.color = '#df2783';
				let currentLikes = parseInt(heart.parentElement.firstChild.textContent);
				currentLikes += 1; 
				heart.parentElement.firstChild.textContent = currentLikes;
			} else {
				isLiked = 0;
				likeAmount -=1;
				heart.style.color = '';
				let currentLikes = parseInt(heart.parentElement.firstChild.textContent);
				currentLikes -= 1; 
				heart.parentElement.firstChild.textContent = currentLikes;
			}
			const totalLikes = document.querySelector('.total-likes');
			totalLikes.textContent = likeAmount;
		});
		document.addEventListener('keydown', (e)=>{
			if(e.key === 'Enter'){
				if(document.activeElement === heart){
					if(isLiked === 0){
						isLiked += 1;
						likeAmount +=1;
						heart.style.color = '#df2783';
						let currentLikes = parseInt(heart.parentElement.firstChild.textContent);
						currentLikes += 1; 
						heart.parentElement.firstChild.textContent = currentLikes;
					} else {
						isLiked = 0;
						likeAmount -=1;
						heart.style.color = '';
						let currentLikes = parseInt(heart.parentElement.firstChild.textContent);
						currentLikes -= 1; 
						heart.parentElement.firstChild.textContent = currentLikes;
					}
					const totalLikes = document.querySelector('.total-likes');
					totalLikes.textContent = likeAmount;
				}
			}
            
		});
	});

}