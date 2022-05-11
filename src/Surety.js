const sureValue = 2.5;
const inst3 = 1.1;
const inst6 = 1.2;
const inst12 = 1.4;

const span = document.getElementById("calc-result");
const btnCalc = document.getElementById("calcular");
btnCalc.addEventListener("click", btnCalcSurety_click);

function btnCalcSurety_click() {
	const txtRent = document.getElementById("txtRent");
	const txtYear = document.getElementById("cbDuracion");
	const txtExpe = document.getElementById("txtExpe");
	const txtServ = document.getElementById("txtServ");
	let rent = parseFloat(txtRent.value);
	let expe = parseFloat(txtExpe.value);
	let year = parseInt(txtYear.value);
	let serv = parseFloat(txtServ.value);

	if (!valueValidate(rent) || !valueValidate(expe) || !valueValidate(year) || !valueValidate(serv)) {
		span.innerText = "Uno de los valores ingresados no es valido, debe ser un numero mayor a 0";
		span.style.display = "block";
		span.style.color = "rgb(245, 40, 40)";
	} else {
		let value = suretyCalc(rent, expe) + serv;
		span.innerText =
			`El valor del seguro para ALQUILER:\n` +
			`Total en 1 pago: $${value}\n` +
			`Cuota en 3 pagos: $${parseInt(installmentsCalc(value, 3) / 3)}; Total: $${installmentsCalc(value, 3)}\n` +
			`Cuota en 6 pagos: $${parseInt(installmentsCalc(value, 6) / 6)}; Total: $${installmentsCalc(value, 6)}\n` +
			`Cuota en 12 pagos: $${parseInt(installmentsCalc(value, 12) / 12)}; Total: $${installmentsCalc(value, 12)}\n`;
		span.style.display = "block";
		span.style.color = "rgb(40, 245, 40)";
	}
}

let valueValidate = value => {
	if (value <= 0) return false;
	if (isNaN(value)) return false;
	return true;
};

let suretyCalc = (rent, expenses) => (rent + expenses) * sureValue;

let installmentsCalc = (subtotal, installments) => {
	if (installments != 1 && installments != 3 && installments != 6 && installments != 12) return subtotal;

	switch (installments) {
		case 3:
			return parseInt(subtotal * inst3);
		case 6:
			return parseInt(subtotal * inst6);
		case 12:
			return parseInt(subtotal * inst12);
	}
};
