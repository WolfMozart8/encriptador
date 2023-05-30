// La letra "e" es convertida para "enter"
// La letra "i" es convertida para "imes"
// La letra "a" es convertida para "ai"
// La letra "o" es convertida para "ober"
// La letra "u" es convertida para "ufat"

const mediaQuery = window.matchMedia("(max-width: 768px)"); // comprueba si esta en movil

const input = document.getElementById("texto");
const texto = document.querySelector(".texto-encriptado");
const mensajeError = document.querySelector(".error");
const mensaje = document.querySelector(".mensaje"); // mensaje advertencia

// comprueba la pantalla al inicio para mostrar u ocultar mensaje
mediaQuery.matches ? mensaje.classList.add("movil") : mensaje.classList.remove("movil")


// botones
const btnEncriptar = document.querySelector(".encriptar");
const btnDesncriptar = document.querySelector(".desencriptar");
const btnCopiar = document.querySelector(".copiar");

btnEncriptar.addEventListener("click", encriptar);
btnDesncriptar.addEventListener("click", desencriptar);
btnCopiar.addEventListener("click", copiarTexto);

// verifica si el mediaQuery esta activado, y asi ocultar el mensaje de advertencia
mediaQuery.addEventListener("change", (e) => {
  e.matches ? mensaje.classList.add("movil") : mensaje.classList.remove("movil")
})

const conTextoDiv = document.getElementById("con-texto")
const sinTextoDiv = document.getElementById("sin-texto")

function encriptar() {
  let valor = input.value;

  if (mediaQuery.matches) { // verifica si está en movil o tablet (pantalla pequeña)

    valor = trasformarTexto(valor) // nuevo valor sin mayusculas ni acentos
  }
  else {  // en escritorio (pantalla mas grande)
    if (!esValido(valor)) { // Si el texto no es valido no se completa la funcion
      return
    }
  }

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

  if (valor == "") { // intercambia el cuadro de la salida de texto
    conTextoDiv.classList.remove("activo")
    sinTextoDiv.classList.add("activo")
  } else {
    conTextoDiv.classList.add("activo")
    sinTextoDiv.classList.remove("activo")
  }
}
function desencriptar() {
  const valor = input.value;

  if (!esValido(valor)) { // Si el texto no es valido no se completa la funcion
    return
  }

  let nuevoTexto = valor
    .replaceAll("ai", "a")
    .replaceAll("enter", "e")
    .replaceAll("imes", "i")
    .replaceAll("ober", "o")
    .replaceAll("ufat", "u");

    texto.textContent = nuevoTexto;

    if (valor == "") { // intercambia el cuadro de la salida de texto
      conTextoDiv.classList.remove("activo")
      sinTextoDiv.classList.add("activo")
    } else {
      conTextoDiv.classList.add("activo")
      sinTextoDiv.classList.remove("activo")
    }
    
  input.value = "";
}

function esValido (texto) {
  const caracteresValidos = /^[a-z\s]+$/;

  if (caracteresValidos.test(texto) || texto == "") {
    input.classList.remove("invalido")
    mensaje.classList.remove("invalido")
    mensajeError.classList.remove("invalido")

    return true
  }

  else {
    input.classList.add("invalido")
    mensaje.classList.add("invalido")
    mensajeError.classList.add("invalido")

    return false
  }
}
function trasformarTexto (texto) {
  const minusculas = texto.toLowerCase()
  const sinAcentos = minusculas
                                .replaceAll("á", "a")
                                .replaceAll("é", "e")
                                .replaceAll("í", "i")
                                .replaceAll("ó", "o")
                                .replaceAll("ú", "u")
  
  return sinAcentos
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
