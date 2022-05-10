const btnSubmit = document.getElementById("submit");

btnSubmit.addEventListener("click", btnSubmit_click);

function btnSubmit_click() {
	const inpEmail = document.getElementById("userEmail");
	const inpPass = document.getElementById("userPassword");

	let email = inpEmail.value;
	let password = inpPass.value;

	let error = true;
	AccountsList.forEach(x => {
		if (x.email == email && x.password == password) {
			localStorage.setItem("useremail", email);
			error = false;
			window.location.href = "index.html";
		}
	});

	if (error == true) {
		const error = document.getElementById("email-error");
		error.innerText = "No se reconoce la combinacion de email y contraseña ingresados.";
		error.style.display = "block";
	}
}
