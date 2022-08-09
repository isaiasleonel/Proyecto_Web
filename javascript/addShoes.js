'use strict';

document.querySelector('#btn-agregar').addEventListener('click', agregar1);
// document.querySelector('#btn-agregar3').addEventListener('click', agregar3);
// document.querySelector('#btn-borrar').addEventListener('click', vaciarTabla);

// let zapatos = [];
//Se crea URLS de mockapi
const url = 'https://62c1ee322af60be89ed011cc.mockapi.io/Modelos';
let id = 0;
let datosRegistrados = {};
mostrar();
async function agregar1(event) {
	event.preventDefault();
	let tipo = document.querySelector('.shoe-type').value;
	let genero = document.querySelector('.shoe-genre').value;
	let talle = document.querySelector('.shoe-size').value;

	datosRegistrados = {
		tipo: tipo,
		genero: genero,
		talle: talle,
	};
	try {
		let res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(datosRegistrados),
		});
		if (res.status == 200) {
			alert('Enviado');
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
		if ((res.status = 200)) {
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
		if ((res.status = 200)) {
			alert('borrado');
		}
	} catch (error) {
		console.log(error);
	}
	mostrar();
}

// function agregar3(event) {
// 	event.preventDefault();

// 	let tipo = document.querySelector('.shoe-type').value;
// 	let genero = document.querySelector('.shoe-genre').value;
// 	let talle = document.querySelector('.shoe-size').value;

// 	let datos = {
// 		tipo: tipo,
// 		genero: genero,
// 		talle: talle,
// 	};
// 	for (let i = 0; i < 3; i++) {
// 		zapatos.push(datos);
// 		mostrar();
// 	}
// }

// function vaciarTabla(event) {
// 	event.preventDefault();
// 	zapatos = [];
// 	mostrar();
// }
