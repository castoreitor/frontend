let url = "http://localhost:4077/";

// Función para validar el nombre y apellido
const validarNombreApellido = (nombre) => {
  const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/; // Solo letras y espacios
  return regexNombre.test(nombre);
};

// Función para validar el teléfono (10 dígitos)
const validarTelefono = (telefono) => {
  const regexTelefono = /^\d{10}$/; // 10 dígitos
  return regexTelefono.test(telefono);
};

// Función para validar el correo electrónico
const validarEmail = (email) => {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexEmail.test(email);
};

// Función para validar la contraseña (mínimo 4 caracteres)
const validarContraseña = (contraseña) => {
  return contraseña.length >= 4 && contraseña.length <= 15;
};

// Envia datos creados
const create = () => {
  const nombre = document.getElementById("name").value;
  const apellido = document.getElementById("lastName").value;
  const telefono = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const contraseña = document.getElementById("password").value;

  // Validar datos
  if (!validarNombreApellido(nombre)) {
    alert("Por favor, ingrese un nombre válido (solo letras).");
    return;
  }

  if (!validarNombreApellido(apellido)) {
    alert("Por favor, ingrese un apellido válido (solo letras).");
    return;
  }

  if (!validarTelefono(telefono)) {
    alert("Por favor, ingrese un número de teléfono válido (10 dígitos).");
    return;
  }

  if (!validarEmail(email)) {
    alert("Por favor, ingrese un correo electrónico válido.");
    return;
  }

  if (!validarContraseña(contraseña)) {
    alert("La contraseña debe tener minimo 4 caracteres y maximo 15.");
    return;
  }

  const data = {
    "Nombre": nombre,
    "Apellido": apellido,
    "Telefono": telefono,
    "Correo_electronico": email,
    "Contraseña": contraseña,
  };

  console.log(data);

  fetch(url + "crear", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status == 500) {
        alert("Error interno - Usuario no creado");
      } else {
        alert("Usuario creado");
        location.href = "../auth/login.html";
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// Corre al dar click crear
document.getElementById("crear").addEventListener("click", function (event) {
  event.preventDefault();
  create();
});
