'use strict';

document.addEventListener('DOMContentLoaded', loadHTML_home());
async function loadHTML_home() {
	const url = 'https://62c1ee322af60be89ed011cc.mockapi.io/Modelos';
	let datosRegistrados = {};
	let partialRender = document.querySelector('#partial-render');

	//boton Home de Partial Render
	// async function loadHTML_home(home) {
	try {
		let res = await fetch('./indexviejo.html');
		let html = await res.text();
		if (res.status == 200) {
			partialRender.innerHTML = html;
		}
	} catch (error) {
		console.log(error);
		// }
	}
	document.querySelector('#index').addEventListener('click', loadHTML_home);

	//boton catalogo de Partial Render

	async function loadHTML() {
		try {
			let res = await fetch('./catalogo.html');
			let html = await res.text();
			if (res.status == 200) {
				partialRender.innerHTML = html;
				// Damos funcion para que lo pueda agarrar
				document
					.querySelector('#btn-agregar')
					.addEventListener('click', agregar1);
				document
					.querySelector('#SelecTalle')
					.addEventListener('change', filtro);
				mostrar();
			}
		} catch (error) {
			console.log(error);
		}
	}
	document.querySelector('#catalogo').addEventListener('click', loadHTML);

	async function agregar1(event) {
		event.preventDefault();
		let tipo = document.querySelector('.shoe-type');
		let genero = document.querySelector('.shoe-genre');
		let talle = document.querySelector('.shoe-size');

		datosRegistrados = {
			tipo: tipo.value,
			genero: genero.value,
			talle: talle.value,
		};
		try {
			let res = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify(datosRegistrados),
			});
			if (res.status == 200 && tipo.value !== '') {
				console.log('Enviado');
				mostrar();
			} else {
				alert('complete los campos');
			}
		} catch (error) {
			console.log(error);
		}
		mostrar();
	}

	async function mostrar() {
		let tabla = document.querySelector('#tbody');
		tabla.innerHTML = '';
		try {
			let res = await fetch(url);
			let json = await res.json();
			console.log(json);
			for (const usuario of json) {
				tabla.innerHTML += `<tr>
			<td> ${usuario.tipo}</td>
			<td> ${usuario.genero}</td>
			<td> ${usuario.talle}</td>
			<td> <button data-editar ="${usuario.id}" class= "btn-edit"> Editar </button></td>
			<td> <button class= "btn-delete" data-borrar= ${usuario.id}> Borrar </button></td>
			</tr>`;
				document.querySelectorAll('.btn-edit').forEach((boton) => {
					boton.addEventListener('click', editarFil);
				});
				document.querySelectorAll('.btn-delete').forEach((boton) => {
					boton.addEventListener('click', deleteFil);
				});
			}
		} catch (error) {
			console.log(error);
		}
	}

	//  -------------Filtro para la tabla dinamica-----------------

	async function filtro() {
		let input = document.querySelector('#SelecTalle');
		let filtro, eleccion, tr, td;
		filtro = input.value;
		tr = document.getElementsByTagName('tr');

		for (let i = 0; i < tr.length; i++) {
			td = tr[i].getElementsByTagName('td')[2];
			eleccion = td.innerHTML;
			if (filtro == 'todos') {
				tr[i].style.display = '';
			} else if (filtro == 'S') {
				if (eleccion <= 18) {
					tr[i].style.display = '';
				} else {
					tr[i].style.display = 'none';
				}
			} else if (filtro == 'M') {
				if (eleccion >= 19 && eleccion <= 36) {
					tr[i].style.display = '';
				} else {
					tr[i].style.display = 'none';
				}
			} else if (filtro == 'L') {
				if (eleccion >= 37) {
					tr[i].style.display = '';
				} else {
					tr[i].style.display = 'none';
				}
			}
		}
	}
	// ------------------------------Editar por filas ------------------
	async function editarFil() {
		let changeDate = this.dataset.editar;
		console.log(changeDate);
		let type = prompt(' COLOQUE EL TIPO ');
		let genre = prompt('COLOQUE EL GENERO');
		let size = Number(prompt('COLOQUE LA TALLA'));
		datosRegistrados = {
			tipo: type,
			genero: genre,
			talle: size,
		};
		try {
			let res = await fetch(`${url}/${changeDate}`, {
				method: 'PUT',
				headers: {
					'Content-type': ' application/json',
				},
				body: JSON.stringify(datosRegistrados),
			});
			if (res.status == 200) {
				alert('modificado');
			}
		} catch (error) {
			console.log(error);
		}
		mostrar();
	}
	async function deleteFil() {
		let deleteId = this.dataset.borrar;
		console.log(deleteId);
		try {
			let res = await fetch(`${url}/${deleteId}`, {
				method: 'DELETE',
			});
			if (res.status == 200) {
				alert('borrado');
			}
		} catch (error) {
			console.log(error);
		}
		mostrar();
	}

	// ---------Boton contacto con partial render-----------------

	async function loadHTML_contacto() {
		try {
			let res = await fetch('./contacto.html');
			let html = await res.text();
			if (res.status == 200) {
				partialRender.innerHTML = html;
				document
					.querySelector('#enviar')
					.addEventListener('click', verificarFormulario);
				// jiji = captcha(5);
			}
		} catch (error) {
			console.log(error);
		}
	}
	document
		.querySelector('#contacto')
		.addEventListener('click', loadHTML_contacto);

	function captcha(ancho) {
		let resultado = '';
		let characters =
			'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		let longCaracteres = characters.length;
		for (let i = 0; i < ancho; i++) {
			resultado = characters.charAt(Math.floor(Math.random() * longCaracteres));
			console.log(resultado);
		}
		return resultado;
	}
	// let jiji = (document.querySelector('#captchaResult').innerHTML += 'soy yo)');

	//---------------------Verificamos el captcha------------------
	function verificarFormulario(e) {
		e.preventDefault();
		let captchaInput = document.querySelector('#inpCaptcha');
		let captchaGenerado = document.querySelector('#captchaResult');
		let datosRegis = document.querySelector('#datosRegis');
		if (captchaGenerado.textContent === captchaInput.value) {
			datosRegis.innerHTML = 'Datos registrados exitosamente!';
		} else {
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
}
