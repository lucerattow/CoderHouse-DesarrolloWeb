//Defino todos los objetos que voy a usar:
//------------------------------------------------

class userAccount {
	constructor(email, password, picture, name, lastname, telephone) {
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

//Defino todos los array que voy a usar:
//------------------------------------------------

const AccountsList = [];
AccountsList.push(
	new userAccount("lucasceratto@gmail.com", "abc123", "../images/users/lucasceratto@gmail.com.jpg", "Lucas", "Ceratto", "11 7362 3950")
);
AccountsList.push(
	new userAccount("lucasceratto2@gmail.com", "abc123", "../images/users/lucasceratto2@gmail.com.jpg", "Lucas", "Ceratto", "11 7362 3950")
);

//Gestion de usuarios:
//------------------------------------------------

const useremail = localStorage.getItem("useremail");
let user = null;

const ulUser = document.getElementById("header-user");

if (useremail != null) {
	AccountsList.forEach(x => {
		if (x.email == useremail) user = x;
	});
}

if (user != null) {
	ulUser.innerHTML = `
    <li>
        <img class="img-circular img-smaller" src="${user.picture}" alt="Foto de usuario">
    </li>
    <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <span>${user.name} ${user.lastname}</span>
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
            <img class="img-circular img-smaller" src="../Images/users/default.jpg" alt="Foto de usuario">
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

function btnLogOut_click() {
	localStorage.removeItem("useremail");
	location.reload();
}
