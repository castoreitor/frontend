let url = "http://localhost:4077/";

// Envia los datos para permitir acceso
const comprobar = () => {
  const inputEmail = document.getElementById("email").value;
  const inputPassword = document.getElementById("password").value;

  // Expresión regular para verificar que la contraseña sea exactamente de 4 caracteres
  const passwordRegex = /^.{4,15}$/;

  // Verificar si la contraseña cumple con el formato
  if (!passwordRegex.test(inputPassword)) {
    alert("La contraseña debe tener minimo 4 caracteres y maximo 15.");
    return; // Detiene la ejecución si la contraseña no es válida
  }

  const data = {
    "Correo_electronico": inputEmail,
    "contraseña": inputPassword,
  };

  fetch(url + "login", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.status == 400) {
      alert("Error comprobando - Usuario o contraseña errados");
      console.log(data);
    } else {
      localStorage.setItem("userLoggedIn", "true");
      alert("Acceso con éxito");
      if (data.Correo_electronico === "usuario@supersu.com") {
        location.href = "../admin/menuAdmin.html";
      } else {
        location.href = "../shop/shop.html";
      }
    }
  });
};

// Corre al dar click enviar
document.getElementById("enviar").addEventListener("click", function (event) {
  event.preventDefault();
  comprobar();
});
