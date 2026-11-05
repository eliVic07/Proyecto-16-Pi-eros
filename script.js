// Referencias a los elementos del HTML
const desplegable = document.getElementById("desplegable");
const boton = document.getElementById("boton");
const texto = document.getElementById("texto");
const lista = document.getElementById("lista");
const opciones = lista.querySelectorAll("li");

// Abrir la lista
function abrir() {
  lista.hidden = false;
  desplegable.classList.add("abierto");
  boton.setAttribute("aria-expanded", "true");
}

// Cerrar la lista
function cerrar() {
  lista.hidden = true;
  desplegable.classList.remove("abierto");
  boton.setAttribute("aria-expanded", "false");
}

// Seleccionar una opción: la resalta, la muestra en el botón y cierra
function seleccionar(opcion) {
  opciones.forEach(function (item) {
    item.classList.remove("seleccionado");
    item.setAttribute("aria-selected", "false");
  });

  opcion.classList.add("seleccionado");
  opcion.setAttribute("aria-selected", "true");

  texto.textContent = opcion.textContent;
  texto.classList.remove("placeholder");

  cerrar();
  boton.focus();
}

// Clic en el botón: abre o cierra
boton.addEventListener("click", function () {
  if (lista.hidden) {
    abrir();
  } else {
    cerrar();
  }
});

// Clic (o Enter / Espacio) en cada opción
opciones.forEach(function (opcion) {
  opcion.addEventListener("click", function () {
    seleccionar(opcion);
  });

  opcion.addEventListener("keydown", function (evento) {
    if (evento.key === "Enter" || evento.key === " ") {
      evento.preventDefault();
      seleccionar(opcion);
    }
  });
});

// Clic fuera del desplegable: lo cierra
document.addEventListener("click", function (evento) {
  if (!desplegable.contains(evento.target)) {
    cerrar();
  }
});

// Tecla Escape: lo cierra
document.addEventListener("keydown", function (evento) {
  if (evento.key === "Escape" && !lista.hidden) {
    cerrar();
    boton.focus();
  }
});
