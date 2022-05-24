class Apartment {
	constructor(id, address, type, caption, rent, expenses, imageArray, area, bedrooms, antiquity) {
		this.id = id;
		this.address = address;
		this.type = type;
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
		const urlParams = new URLSearchParams(window.location.search);
		let address = urlParams.get('address');
		let propType = urlParams.get('propType');

		data.filter(x => x.address.includes(address) && x.type == propType)
			.forEach(x => {
				displayApartment(x);
			})
	})
	.catch((err) => {
		sendMessage(err, true, 5000, "rgb(245, 45, 45)", "white");
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

	divContainer.innerHTML += `
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
					<button class="btn btn-primary">Contactar</button>
				</div>
			</div>
		</div>`;
}