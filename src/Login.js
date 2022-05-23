const btnSubmit = document.getElementById("submit");
btnSubmit.addEventListener("click", () => {
	sendMessage("Iniciando sesion...", false, 1000, "rgb(45, 45, 45)", "white");

	fetch('../data/users.json')
		.then((res) => res.json())
		.then((data) => {
			const inpEmail = document.getElementById("userEmail");
			const inpPass = document.getElementById("userPassword");

			let email = inpEmail.value;
			let password = inpPass.value;

			let error = true;
			data.forEach(x => {
				if (x.email == email && x.password == password) {
					localStorage.setItem("useremail", email);
					error = false;
					setTimeout(() => sendMessage("Se inicio sesion correctamente", false, 1000, "rgb(45, 45, 45)", "rgb(40, 245, 40)"), 1000);
					setTimeout(() => window.location.href = "index.html", 2000);
				}
			});

			if (error == true) {
				setTimeout(() => sendMessage("Error al iniciar sesion", false, 2000, "rgb(45, 45, 45)", "rgb(245, 40, 40)"), 1000);

				const error = document.getElementById("email-error");
				error.innerText = "No se reconoce la combinacion de email y contraseña ingresados.";
				error.style.display = "block";
			}
		})
		.catch((err) => sendMessage(err, true, 2000, "rgb(45, 45, 45)", "rgb(245, 40, 40)"));
});