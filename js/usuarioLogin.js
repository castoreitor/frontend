let url = "http://localhost:4077/";

// Simula la verificación de inicio de sesión
function isLoggedIn() {
  return localStorage.getItem("userLoggedIn") === "true";
}
function isLoggedout() {
  return localStorage.getItem("userLoggedIn") === "false";
}
// Función para mostrar/ocultar el área del usuario
function toggleUserSection() {
  const userSection = document.getElementById("user-section");
  const register = document.getElementById("register");
  const login = document.getElementById("login");

  if (isLoggedIn()) {
    userSection.style.display = "block"; // Muestra el avatar y el carrito
    register.style.display = "none"; // Oculta el registro
    login.style.display = "none"; // Oculta el login
  } else if (isLoggedout()) {
    location.href = "register.html"; // Redirige a shop.html
    console.log("salir");
    userSection.style.display = "none"; // Oculta el avatar y el carrito
    register.style.display = "block"; // Muestra el registro
    login.style.display = "block"; // Muestra el login
  } else {
    userSection.style.display = "none"; // Oculta el avatar y el carrito
    register.style.display = "block"; // Muestra el registro
    login.style.display = "block"; // Muestra el login
  }
}

// Llama a la función al cargar la página
document.addEventListener("DOMContentLoaded", toggleUserSection);

// Añade el evento al botón de salida
document.getElementById("salir").addEventListener("click", function (event) {
  event.preventDefault();
  logout(); // Llama a logout cuando se presiona el botón de salida
});
