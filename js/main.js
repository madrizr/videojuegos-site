var resultado = document.querySelector('#titulos_recientes');

mostrarRecientes();

function mostrarRecientes(){

	let url = `https://www.freetogame.com/api/games`;

	const api = new XMLHttpRequest();
	api.open('GET', url, true); //true es que si es asincrono.
	api.send();
	var videojuegos;
	api.onreadystatechange = function() {
		if (this.status == 200 && this.readyState == 4){
			videojuegos = JSON.parse(api.responseText);
			//console.log(videojuegos);

			resultado.innerHTML = ''; //debe estar vacia para agregar los datos
			let juegos_recientes = compararFecha(videojuegos);
			for (var i = 0; i < juegos_recientes.length; i++) {
				resultado.innerHTML += `
					<div class="col-lg-4">
				<div class="card border-warning mb-3" style="min-height: 400px">
				  	<div class="mb-2">
				  		<img src="${juegos_recientes[i].thumbnail}" width="100%"></div>
				  	<div class="espacio mx-3">
				  		<h4 class="card-title">${juegos_recientes[i].title}</h4>
				  		<span class="badge bg-success h4">Free</span></div>
				    <div class="mx-3">
				    	<p>${juegos_recientes[i].short_description}</p>
				    	<div class="espacio">
				    		<p>Lanzamiento: ${juegos_recientes[i].release_date}</p>
				    		<div>
				    			<i class="fab fa-microsoft fa-2x"></i>
				    			<i class="fab fa-playstation fa-2x ms-2"></i>
				    		</div></div></div></div></div>`
			}
		}
	}
}


function compararFecha(videojuegos){
	recientes = [];
	for (var i = 0; i < videojuegos.length; i++) {
		var fecha = new Date(videojuegos[i].release_date);
		var fecha_actual = 2021
		fecha = fecha.getFullYear();
		if (fecha === fecha_actual) {
			recientes.push(videojuegos[i]);
		}
	}
	return recientes
}


