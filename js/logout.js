let url = "http://localhost:4077/";

function logout() {
  return localStorage.getItem("userLoggedIn") === "false";
}

function toggleUserSection() {
  const userSection = document.getElementById("user-section");
  const register = document.getElementById("register");
  const login = document.getElementById("login");

  if (logout()) {
    userSection.style.display = "none"; // Muestra el avatar y el carrito
    register.style.display = "block"; // Oculta el registro
    login.style.display = "block"; // y el login
    console.log("no muestra");
  } else {
    userSection.style.display = "block"; // Oculta el avatar y el carrito
    register.style.display = "none";
    login.style.display = "none";
    console.log("muestra");
  }
}

// Llama a la función al cargar la página
document.addEventListener("DOMContentLoaded", toggleUserSection);

document.getElementById("salir").addEventListener("click", function (event) {
  event.preventDefault();
  logout();
});
