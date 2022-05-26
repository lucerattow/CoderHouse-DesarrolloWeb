setTimeout(() => sendMessage("Web en desarrollo", true, 3000, "rgb(45, 45, 45)", "white"), 5000);

const propType = document.getElementById("prop-type");
const propDir = document.getElementById("prop-dir");
const btnSearch = document.getElementById("btn-search");

btnSearch.addEventListener("click", Search);

function Search() {
    window.location.href = `Buscar.html?search=${propDir.value.toLowerCase()}&propType=${propType.value.toLowerCase()}`;
}