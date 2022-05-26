/* Objetos:
--------------------------------------------------------*/
class Apartment {
	constructor(id, url, type, location, address, caption, rent, expenses, imageArray, area, bedrooms, antiquity) {
		this.id = id;
		this.url = url;
		this.type = type;
		this.location = location;
		this.address = address;
		this.caption = caption;
		this.rent = parseFloat(rent);
		this.expenses = parseFloat(expenses);
		this.imageArray = imageArray;
		this.area = area;
		this.bedrooms = bedrooms;
		this.antiquity = antiquity;
	}
}

/* Elementos HTML:
--------------------------------------------------------*/
const inp_address_location = document.getElementById("inp-add-loc");

const chk_departamento = document.getElementById("chk-type-departamento");
const chk_ph = document.getElementById("chk-type-ph");
const chk_casa = document.getElementById("chk-type-casa");
const chk_quinta = document.getElementById("chk-type-quinta");
const chk_local = document.getElementById("chk-type-local");

const div_apartment_container = document.getElementById("apartment-container");

const btn_clear_filter = document.getElementById("btn-clear-filter");
const btn_apply_add_loc = document.getElementById("btn-apply-add-loc")
const btn_apply_type = document.getElementById("btn-apply-type");

/* Metodos y Funciones:
--------------------------------------------------------*/
function displayApartment(apartment) {
	const { url, imageArray, rent, expenses, area, bedrooms, antiquity, address, caption } = apartment;
	displayApartmentCount++;

	let carouserIndicators = "";
	let carouselInner = "";
	imageArray.forEach(function callback(value, index) {
		if (index == 0) {
			carouserIndicators += `<button type="button" data-bs-target="#carousel${displayApartmentCount}" data-bs-slide-to="${index}" class="active" aria-current="true" aria-label="Slide ${index + 1}"></button>`;
			carouselInner += `<div class="carousel-item active h-100"><img src="${value}" class="d-block w-100" alt="propiedades ${displayApartmentCount} ${index}"></div>`;
		}
		else {
			carouserIndicators += `<button type="button" data-bs-target="#carousel${displayApartmentCount}" data-bs-slide-to="${index}" aria-label="Slide ${index + 1}"></button>`;
			carouselInner += `<div class="carousel-item h-100"><img src="${value}" class="d-block w-100" alt="propiedades ${displayApartmentCount} ${index}"></div>`;
		}
	});

	div_apartment_container.innerHTML += `
		<div class="card-container col-6">
			<div class="card text-light bg-dark">
				<div id="carousel${displayApartmentCount}" class="carousel slide card-img-top" data-bs-ride="carousel">
					<div class="carousel-indicators">
						${carouserIndicators}
					</div>
					<div class="carousel-inner">
						${carouselInner}
					</div>
					<button class="carousel-control-prev" type="button" data-bs-target="#carousel${displayApartmentCount}" data-bs-slide="prev">
						<span class="carousel-control-prev-icon" aria-hidden="true"></span>
						<span class="visually-hidden">Previous</span>
					</button>
					<button class="carousel-control-next" type="button" data-bs-target="#carousel${displayApartmentCount}" data-bs-slide="next">
						<span class="carousel-control-next-icon" aria-hidden="true"></span>
						<span class="visually-hidden">Next</span>
					</button>
				</div>
				<div class="card-body">
					<h5 class="card-title">$${rent} +$${expenses} expensas</h5>
					<ul>
						<li>
							<div class="icono-pequeño icono-superficie"></div>
							<spam>${area} m²</spam>
						</li>
						<li>
							<div class="icono-pequeño icono-dormitorios"></div>
							<spam>${bedrooms}</spam>
						</li>
						<li>
							<div class="icono-pequeño icono-antiguedad"></div>
							<spam>${antiquity}</spam>
						</li>
					</ul>
					<h5 class="card-title">${address}</h5>
					<p class="card-text">${caption}</p>
					<a href="${url}" target="_blank" class="btn btn-primary">Visitar</a>
				</div>
			</div>
		</div>`;
}

function displayFilters() {
	const filtrosAplicados = document.getElementById("filtros-aplicados");
	filtrosAplicados.innerHTML = "";

	if (search != "") {
		search.forEach(x => filtrosAplicados.innerHTML += `<li class="tags d-inline-block rounded-pill bg-secondary">${x}</span></li>`)
	}

	if (propType != "") {
		chk_departamento.checked = false;
		chk_ph.checked = false;
		chk_casa.checked = false;
		chk_quinta.checked = false;
		chk_local.checked = false;

		propType.forEach(x => {
			filtrosAplicados.innerHTML += `<li class="tags d-inline-block rounded-pill bg-secondary">${x}</span></li>`
			switch (x) {
				case "departamento":
					chk_departamento.checked = true;
					break;
				case "ph":
					chk_ph.checked = true;
					break;
				case "casa":
					chk_casa.checked = true;
					break;
				case "quinta":
					chk_quinta.checked = true;
					break;
				case "local":
					chk_local.checked = true;
					break;
			}
		});
	}
}

//Arreglar como se aplican los filtros
function applyFilter(deptos) {
	output = [];
	deptos.forEach(item => {
		search.forEach(x => {
			if (item.address.includes(x) || item.location.includes(x)) {
				output.push(item);
			}
		})
		if (!(propType.length == 1 && propType[0] == "")) {
			if (!propType.includes(item.type) && output.includes(item)) {
				output.splice(output.indexOf(item), 1);
			}
		}
	})
	return output;
}

/* Ejecucion al iniciar la pagina:
--------------------------------------------------------*/

//Obtengo los filtros aplicados y los muestro
const urlParams = new URLSearchParams(window.location.search);
let search = urlParams.get('search').split(",");
let propType = urlParams.get('propType').split(",");
displayFilters();

//Preparo el contenedor y las variables que se necesitan para el conteo de resultados (asignar sus id)
let displayApartmentCount = 0;
div_apartment_container.innerHTML = "";

//Obtengo los datos de los departamentos
fetch('../data/apartments.json')
	.then((res) => res.json())
	.then((data) => {
		data = applyFilter(data);
		data.forEach(x => displayApartment(x))
	})
	.catch((err) => {
		sendMessage(err, true, 5000, "rgb(245, 45, 45)", "white");
	});

/* Filtros:
--------------------------------------------------------*/
//Elimino los filtros
btn_clear_filter.addEventListener("click", () => {
	window.location.href = `Buscar.html?search=&propType=`;
})

//Filtro de "direccion y localidad"
btn_apply_add_loc.addEventListener("click", () => {
	if (inp_address_location.value != "") {
		if (search.length == 1 && search[0] == "") search.pop();
		search.push(inp_address_location.value.toLowerCase());
		window.location.href = `Buscar.html?search=${search}&propType=${propType}`;
	}
});

//filtro de "Tipo de propiedad"
btn_apply_type.addEventListener("click", () => {
	propType = []

	if (chk_departamento.checked) propType.push("departamento");
	if (chk_ph.checked) propType.push("ph");
	if (chk_casa.checked) propType.push("casa");
	if (chk_quinta.checked) propType.push("quinta");
	if (chk_local.checked) propType.push("local");

	window.location.href = `Buscar.html?search=${search}&propType=${propType}`;
})