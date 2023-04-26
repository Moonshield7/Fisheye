
const sortBody = document.querySelector('.sort_body');
const iconSelectButton = document.querySelector('.select_button-icon');

sortBody.addEventListener('click', (e) => {
	e.stopImmediatePropagation();
	displaySelectOptions(sortBody, iconSelectButton);
});

document.addEventListener('keydown', (e)=> {
	if(e.key === 'Enter'){
		displaySelectOptions(sortBody, iconSelectButton);
	}
});

function displaySelectOptions(sortBody, iconSelectButton) {
	if(sortBody.offsetHeight === 60){
		sortBody.style.zindex = 1;
		sortBody.style.height = '180px';
		iconSelectButton.classList.remove('fa-chevron-down');
		iconSelectButton.classList.add('fa-chevron-up');
	}
	else if(sortBody.offsetHeight === 180){
		sortBody.style.zindex = 3;
		sortBody.style.height = '60px';
		iconSelectButton.classList.add('fa-chevron-down');
		iconSelectButton.classList.remove('fa-chevron-up');
	}
}



