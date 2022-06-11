'use strict';

document.querySelector('#btn-agregar').addEventListener('click', agregar1);
document.querySelector('#btn-agregar3').addEventListener('click', agregar3);
document.querySelector('#btn-borrar').addEventListener('click', vaciarTabla);

let zapatos = [
	{
		tipo: 'Deportivo',
		genero: 'Masculino',
		talle: '39',
	},
];
mostrar();

function agregar1(event) {
	event.preventDefault();

	let tipo = document.querySelector('.shoe-type').value;
	let genero = document.querySelector('.shoe-genre').value;
	let talle = document.querySelector('.shoe-size').value;

	let datosRegistrados = {
		tipo: tipo,
		genero: genero,
		talle: talle,
	};
	zapatos.push(datosRegistrados);
	console.table(zapatos);
	mostrar();
}

function mostrar() {
	let tabla = document.querySelector('#tbody');
	tabla.innerHTML = '';
	for (let n of zapatos) {
		tabla.innerHTML += `<tr>
                                <td> ${n.tipo}</td>
                                <td> ${n.genero}</td>
                                <td> ${n.talle}</td>
                            </tr>`;
	}
}

function agregar3(event) {
	event.preventDefault();

	let tipo = document.querySelector('.shoe-type').value;
	let genero = document.querySelector('.shoe-genre').value;
	let talle = document.querySelector('.shoe-size').value;

	let datos = {
		tipo: tipo,
		genero: genero,
		talle: talle,
	};
	for (let i = 0; i < 3; i++) {
		zapatos.push(datos);
		mostrar();
	}
}

function vaciarTabla(event) {
	event.preventDefault();
	zapatos = [];
	mostrar();
}
