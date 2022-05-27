'use strict';

function captcha(ancho) {
	var resultado = '';
	var characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var longCaracteres = characters.length;
	for (var i = 0; i < ancho; i++) {
		resultado += characters.charAt(Math.floor(Math.random() * longCaracteres));
	}
	return resultado;
}
document.querySelector('#captchaResult').innerHTML = captcha(5);

let enviar = document.querySelector('#enviar');
enviar.addEventListener('click', verificarFormulario);

function verificarFormulario(e) {
	e.preventDefault();
	let captchaInput = document.querySelector('#inpCaptcha');
	let captchaGenerado = document.querySelector('#captchaResult');
	let datosRegis = document.querySelector('#datosRegis');
	if (captchaGenerado.textContent === captchaInput.value) {
		console.log('Salio!');
		datosRegis.innerHTML = 'Datos registrados exitosamente!';
	} else {
		console.log('No salio!');
		captchaInput.value = '';
		captchaInput.placeholder = 'Captcha incorrecto';
	}

	let nombre = document.querySelector('#Nombre');
	let apellido = document.querySelector('#Apellido');
	let email = document.querySelector('#Email');
	if (nombre.value === '' || apellido.value === '' || email.value === '') {
		datosRegis.innerHTML = 'Por favor rellene todas las casillas';
	}
}
