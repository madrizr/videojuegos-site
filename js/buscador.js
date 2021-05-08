var buscar = document.getElementById('buscar');
var picture_one = document.getElementById('buscar_one');
var picture_two = document.getElementById('buscar_two');
var picture_three = document.getElementById('buscar_three');
var game_description = document.getElementById('description');
var caracteristica = document.getElementById('caracteristica')


buscar.addEventListener('submit', function(e){
	e.preventDefault();
	loading();
	var titulo_capturado = capturarString(caracteristica, buscar);
	
	if(titulo_capturado){
		let url_id = 'https://www.freetogame.com/api/filter?tag=%203d.mmorpg.fantasy.pvp%20&%20platform%20=%20pc';
		const list = new XMLHttpRequest();
		list.open('GET', url_id, true);
		list.send();

		list.onreadystatechange = function(){
			if (this.status == 200 && this.readyState == 4) {
			let lista = JSON.parse(list.responseText);
			//console.log(lista[0].id)
			let resultado = compararBuscar(lista, titulo_capturado, caracteristica);
			
			if (resultado) {
				let url_description = 'https://www.freetogame.com/api/game?id=';
				mostrarJuego(caracteristica, resultado);}
		}}
	}
})



// COMPARA LA BUSQUEDA DEL USUARIO CON TODOS LOS NOMBRES EXISTENTES.
function compararBuscar(lista, nombre_comparar, id_espacio_mensaje){

	for (let juego of lista) {
		//console.log(juego.title)
		let titulo_sin_formato = juego.title;
		titulo_sin_formato = titulo_sin_formato.toLowerCase();
		//console.log(titulo_sin_formato);
		if (nombre_comparar == titulo_sin_formato) {
			var resultado = juego.id;
			return resultado
		}else{
			id_espacio_mensaje.innerHTML = `
		<div class="d-flex justify-content-center">
			<div class="col-1"><img src="assets/404.png" class="img-fluid"></div>
			<h4 class="pt-4">we can't find the game you're looking for</h4>
		</div>
		`
		}
	}
}
// VALIDA SI SE INTRODUJERON VALORES Y CONVIERTE EL VALOR INTRODUCIDO A MINUSCULAS
function capturarString(id_espacio_mensaje, get_element){
	let datos_capturados = new FormData(get_element);

	if (datos_capturados.get('buscar_juego') != '') {
		let dato = datos_capturados.get('buscar_juego');
		dato = dato.toLowerCase();
		return dato
	}else{
		id_espacio_mensaje.innerHTML = `
		<div class="d-flex justify-content-center">
			<div class="col-1"><img src="assets/404.png" class="img-fluid"></div>
			<h4 class="pt-4">we can't find the game you're looking for</h4>
		</div>
		`
	}
}

// MOSTRAR LAS CARACTERISTICAS DEL JUEGO EN LA SECCION BUSCAR
function mostrarJuego(id_espacio_mostrar, objeto_juego){
	fetch('https://www.freetogame.com/api/game?id='+ objeto_juego)
	.then(respuesta => respuesta.json())
	.then(res => {

		caracteristica.innerHTML = `
		<div class="col-lg-6 col-12">
			<div class="row d-flex justify-content-center">
				<div class="col-6" id="buscar_one">
				<div class="card border-danger">
				<img src="${res.screenshots[0].image}" class="img-fluid"></div>
				</div>
				
				<div class="col-6" id="buscar_two">
				<div class="card border-danger">
				<img src="${res.screenshots[2].image}" class="img-fluid"></div>
				</div>

				<div class="col-8 mt-3" id="buscar_three">
				<div class="card border-danger">
				  	<img src="${res.thumbnail}" class="img-fluid"></div>
				  	<div class="text-center d-grid mt-3">
				  		<a class="btn-lg btn-success" target="_blank" href="${res.game_url}" style="text-decoration: none;">Play now ${res.title}<i class="fas fa-sign-in-alt text-white ms-2"></i></a>
				  	</div>
				</div>
			</div>		
		</div>

		<div class="col-lg-6 col-12 mt-lg-0 mt-5" id="description">
		<h2>${res.title}</h2>
			<h6>Fecha de Lanzamineto: ${res.release_date}</h6>
			<h6>Desarrolladores: ${res.developer}</h6>
			<h6>Genero: ${res.genre}</h6>
			<div class="espacio mt-4">
				<div class="card border-primary p-3">FREE</div>
				<div class="d-flex"><i class="fab fa-microsoft fa-3x"></i><h5 class="ms-3 pt-2 ">${res.platform}</h5></div></div>
			<div class="mt-5">
				<h4>Acerca de ${res.title}:</h4>
				<p class="my-4">${res.description}</p>

				<h4>Requerimientos minimos</h4>
				<div class="espacio row mt-3">
					<div class="col-6">
					<p>Os: <br>${res.minimum_system_requirements.os}</p>
					<p>Prosesador: <br>${res.minimum_system_requirements.processor}</p>
					<p>Memoria: <br>${res.minimum_system_requirements.memory}</p>
					</div>
					<div class="col-6">
					<p>Graficos: <br>${res.minimum_system_requirements.graphics}</p>
					<p>Disco: <br>${res.minimum_system_requirements.storage}</p>	
					</div>
				</div>
			</div>
		</div>
		`
	}) 
}

// MOSTRAR SPINNER DE CARGA MIENTRAS CARGAN LOS ARCHIVOS.
function loading(){
	caracteristica.innerHTML = `
<div class="d-flex justify-content-center">
	<div class="sk-fading-circle">
	  <div class="sk-circle1 sk-circle"></div>
	  <div class="sk-circle2 sk-circle"></div>
	  <div class="sk-circle3 sk-circle"></div>
	  <div class="sk-circle4 sk-circle"></div>
	  <div class="sk-circle5 sk-circle"></div>
	  <div class="sk-circle6 sk-circle"></div>
	  <div class="sk-circle7 sk-circle"></div>
	  <div class="sk-circle8 sk-circle"></div>
	  <div class="sk-circle9 sk-circle"></div>
	  <div class="sk-circle10 sk-circle"></div>
	  <div class="sk-circle11 sk-circle"></div>
	  <div class="sk-circle12 sk-circle"></div>
	</div>
</div>`;
}
