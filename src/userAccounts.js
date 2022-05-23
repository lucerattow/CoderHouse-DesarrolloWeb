//Defino todos los objetos que voy a usar:
//------------------------------------------------

class userAccount {
	constructor(id, email, password, picture, name, lastname, telephone) {
		this.id = id;
		this.email = email;
		this.password = password;

		this.picture = picture;
		this.name = name;
		this.lastname = lastname;
		this.telephone = telephone;

		this.subscriptions = new userSubscriptions();
	}
}

class userSubscriptions {
	constructor() {
		this.option1 = false;
		this.option2 = false;
		this.option3 = false;
		this.option4 = false;
	}
}

//Gestion de usuarios:
//------------------------------------------------

fetch('../data/users.json')
	.then((res) => res.json())
	.then((data) => {
		login(data);
	});

const login = (Accounts) => {
	const useremail = localStorage.getItem("useremail");
	const ulUser = document.getElementById("header-user");

	let user = (useremail != null) ? Accounts.find(x => x.email == useremail) : null;

	if (user != null) {
		const { picture, name, lastname } = user;
		ulUser.innerHTML = `
		<li>
			<img class="img-circular img-smaller" src="${picture}" alt="Foto de usuario">
		</li>
		<li class="nav-item dropdown">
			<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
				<span>${name} ${lastname}</span>
			</a>
			<ul class="dropdown-menu dropdown-menu-dark bg-dark" aria-labelledby="navbarDropdown">
				<li><a class="dropdown-item" href="Perfil.html">Mi cuenta</a></li>
				<li><a class="dropdown-item disabled" href="#">Favoritos</a></li>
				<li><hr class="dropdown-divider"></li>
				<li><a class="dropdown-item disabled" href="#">Mis propiedades</a></li>
				<li><hr class="dropdown-divider"></li>
				<li><a class="dropdown-item" href="#" id="LogOut">Cerrar Sesion</a></li>
			</ul>
		</li>`;
	} else {
		ulUser.innerHTML = `
			<li>
				<img class="img-circular img-smaller" src="../images/users/default.jpg" alt="Foto de usuario">
			</li>
			<li class="nav-item dropdown">
				<a class="nav-link" href="../views/Login.html" id="navbarDropdown" role="button">
					<span>Iniciar Sesion</span></a>
			</li>`;
	}

	const btnLogOut = document.getElementById("LogOut");

	if (btnLogOut != null) {
		btnLogOut.addEventListener("click", btnLogOut_click);
	}
}

const btnLogOut_click = () => {
	localStorage.removeItem("useremail");
	location.reload();
}