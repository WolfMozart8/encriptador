// La letra "e" es convertida para "enter"
// La letra "i" es convertida para "imes"
// La letra "a" es convertida para "ai"
// La letra "o" es convertida para "ober"
// La letra "u" es convertida para "ufat"

const input = document.getElementById("texto");
const texto = document.querySelector(".texto-encriptado");

const btnEncriptar = document.querySelector(".encriptar");
const btnDesncriptar = document.querySelector(".desencriptar");
const btnCopiar = document.querySelector(".copiar");

btnEncriptar.addEventListener("click", encriptar);
btnDesncriptar.addEventListener("click", desencriptar);
btnCopiar.addEventListener("click", copiarTexto);

conTextoDiv = document.getElementById("con-texto")
sinTextoDiv = document.getElementById("sin-texto")

function encriptar() {
  const valor = input.value;
  let nuevoTexto = "";

  for (let i = 0; i < valor.length; i++) {
    const letra = valor[i];

    switch (letra) {
      case "a":
        nuevoTexto += "ai";
        break;
      case "e":
        nuevoTexto += "enter";
        break;
      case "i":
        nuevoTexto += "imes";
        break;
      case "o":
        nuevoTexto += "ober";
        break;
      case "u":
        nuevoTexto += "ufat";
        break;
      default:
        nuevoTexto += letra;
        break;
    }
  }
  texto.textContent = nuevoTexto;
  input.value = "";

  if (valor == "") {
    conTextoDiv.classList.remove("activo")
    sinTextoDiv.classList.add("activo")
  } else {
    conTextoDiv.classList.add("activo")
    sinTextoDiv.classList.remove("activo")
  }
}
function desencriptar() {
  const valor = input.value;
  let nuevoTexto = valor
    .replaceAll("ai", "a")
    .replaceAll("enter", "e")
    .replaceAll("imes", "i")
    .replaceAll("ober", "o")
    .replaceAll("ufat", "u");

    texto.textContent = nuevoTexto;

    if (valor == "") {
      conTextoDiv.classList.remove("activo")
      sinTextoDiv.classList.add("activo")
    } else {
      conTextoDiv.classList.add("activo")
      sinTextoDiv.classList.remove("activo")
    }
    



  input.value = "";


}

function copiarTexto() {
  navigator.clipboard
    .writeText(texto.textContent)
    .then(function () {
      // Éxito
      console.log("¡Texto copiado al portapapeles!");
    })
    .catch(function (error) {
      // Error
      console.error("Error al copiar al portapapeles:", error);
    });
}
