/*-------Exclusivo de Menu desplegable----*/
document.querySelector('.btn_menu').addEventListener('click', menuDesplegable);

function menuDesplegable() {
	document.querySelector('.u-list-nav').classList.toggle('show');
}
