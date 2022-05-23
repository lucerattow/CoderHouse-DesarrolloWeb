class Apartment {
	constructor(id, address, caption, rent, expenses, imageArray, area, bedrooms, antiquity) {
		this.id = id;
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


fetch('../data/apartments.json')
	.then((res) => res.json())
	.then((data) => {
		data.forEach(x => displayApartment(x))
	})
	.catch((err) => {
		console.log(err)
	});

let displayApartmentCount = 0;
const divContainer = document.getElementById("apartment-container");
divContainer.innerHTML = "";

function displayApartment(apartment) {
	const { imageArray, rent, expenses, area, bedrooms, antiquity, address, caption } = apartment;
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

	let innerHTML = "";
	innerHTML += `<div class="card-container col-6">`;
	innerHTML += `    <div class="card text-light bg-dark">`;
	innerHTML += `        <div id="carousel${displayApartmentCount}" class="carousel slide card-img-top" data-bs-ride="carousel">`;
	innerHTML += `            <div class="carousel-indicators">`;
	innerHTML += 		          carouserIndicators;
	innerHTML += `            </div>`;
	innerHTML += `            <div class="carousel-inner">`;
	innerHTML += 		          carouselInner;
	innerHTML += `            </div>`;
	innerHTML += `            <button class="carousel-control-prev" type="button" data-bs-target="#carousel${displayApartmentCount}" data-bs-slide="prev">`;
	innerHTML += `	              <span class="carousel-control-prev-icon" aria-hidden="true"></span>`;
	innerHTML += `	              <span class="visually-hidden">Previous</span>`;
	innerHTML += `            </button>`;
	innerHTML += `            <button class="carousel-control-next" type="button" data-bs-target="#carousel${displayApartmentCount}" data-bs-slide="next">`;
	innerHTML += `	              <span class="carousel-control-next-icon" aria-hidden="true"></span>`;
	innerHTML += `	              <span class="visually-hidden">Next</span>`;
	innerHTML += `            </button>`;
	innerHTML += `        </div>`;
	innerHTML += `        <div class="card-body">`;
	innerHTML += `	          <h5 class="card-title">$${rent} +$${expenses} expensas</h5>`;
	innerHTML += `	          <ul>`;
	innerHTML += `                <li>`;
	innerHTML += `		              <div class="icono-pequeño icono-superficie"></div>`;
	innerHTML += `		              <spam>${area} m²</spam>`;
	innerHTML += `                </li>`;
	innerHTML += `                <li>`;
	innerHTML += `		              <div class="icono-pequeño icono-dormitorios"></div>`;
	innerHTML += `		              <spam>${bedrooms}</spam>`;
	innerHTML += `                </li>`;
	innerHTML += `                <li>`;
	innerHTML += `		              <div class="icono-pequeño icono-antiguedad"></div>`;
	innerHTML += `		              <spam>${antiquity}</spam>`;
	innerHTML += `                </li>`;
	innerHTML += `	          </ul>`;
	innerHTML += `	          <h5 class="card-title">${address}</h5>`;
	innerHTML += `	          <p class="card-text">${caption}</p>`;
	innerHTML += `	          <button class="btn btn-primary">Contactar</button>`;
	innerHTML += `        </div>`;
	innerHTML += `    </div>`;
	innerHTML += `</div>`;

	divContainer.innerHTML += innerHTML;
}