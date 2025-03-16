let url = "http://localhost:4077/";

// Función para mostrar datos en la tabla
const mostrarData = (data) => {
  let body = "";
  data.forEach((producto) => {
    body += `<tr>
      <td>${producto.ID_producto}</td>
      <td>${producto.Nombre}</td>
      <td>${producto.Categoria}</td>
      <td>${producto.Descripcion}</td>
      <td>${producto.Precio_unitario}</td>
      <td>${producto.Stock}</td>
      <td>
       <button onclick="ponerData('${producto.ID_producto}', '${producto.Nombre}', '${producto.Categoria}', '${producto.Descripcion}', '${producto.Precio_unitario}', '${producto.Stock}')">Editar</button>
      </td>
      <td>
        <button onclick="deleteProducto('${producto.ID_producto}')">Eliminar</button>
      </td>
      </tr>`;
  });
  document.getElementById("data").innerHTML = body;
};

// Función para verificar si los campos están llenos
const verificarCamposLlenos = () => {
  const campos = [
    document.getElementById("ID_producto").value,
    document.getElementById("Nombre").value,
    document.getElementById("Categoria").value,
    document.getElementById("Descripcion").value,
    document.getElementById("Precio_unitario").value,
    document.getElementById("Stock").value,
  ];

  // Comprueba si algún campo está vacío
  return campos.every((campo) => campo.trim() !== "");
};

// Función para crear un nuevo producto
const createProducto = () => {
  // Si algún campo está vacío, muestra una alerta y no continúa
  if (!verificarCamposLlenos()) {
    alert(
      "Por favor, complete todos los campos antes de registrar el producto."
    );
    return;
  }

  const data = {
    ID_producto: document.getElementById("ID_producto").value,
    Nombre: document.getElementById("Nombre").value,
    Categoria: document.getElementById("Categoria").value,
    Descripcion: document.getElementById("Descripcion").value,
    Precio_unitario: document.getElementById("Precio_unitario").value,
    Stock: document.getElementById("Stock").value,
  };

  console.log("Datos", data);

  fetch(url + "crearProducto", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status == 500) {
        alert("Error interno - Producto no creado");
      } else {
        alert("Producto Creado");
      }
    })
    .catch((err) => console.log(err));
};

// Event listener para crear el producto al dar click en el botón
document.getElementById("crearProducto").addEventListener("click", (event) => {
  event.preventDefault();
  createProducto();
});

const busqueda = () => {
  const ID = document.getElementById("ID").value;

  const data = {
    "ID": ID,
  };
  console.log(ID, "busqueda ID");
  //console.log(url + "consultar2/" + ID);
  console.log(data, "busqueda");
  fetch(url + "consultar2/" + ID, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.status == 400) {
      alert("Error comprobando - Producto no encontrado");
    } else {
      alert("Producto encontrado con Exito");
      res.json().then((data) => mostrarProductos(data));
    }
  });
};

const mostrarProductos = (data) => {
  let body = "";
  data.forEach((producto) => {
    body += `<tr>
      <td>${producto.ID_producto}</td>
      <td>${producto.Nombre}</td>
      <td>${producto.Categoria}</td>
      <td>${producto.Descripcion}</td>
      <td>${producto.Precio_unitario}</td>
      <td>${producto.Stock}</td>
      <td>
        <button onclick="ponerData('${producto.ID_producto}', '${producto.Nombre}', '${producto.Categoria}', '${producto.Descripcion}', '${producto.Precio_unitario}', '${producto.Stock}')">Editar</button>
      </td>
      <td>
        <button onclick="deleteProducto('${producto.ID_producto}')">Eliminar</button>
      </td>
      </tr>`;
  });
  document.getElementById("data").innerHTML = body;
};
//poner datos en el formulario

const ponerData = (
  ID_producto,
  Nombre,
  Categoria,
  Descripcion,
  Precio_unitario,
  Stock
) => {
  document.getElementById("ID_producto").value = ID_producto;
  document.getElementById("Nombre").value = Nombre;
  document.getElementById("Categoria").value = Categoria;
  document.getElementById("Descripcion").value = Descripcion;
  document.getElementById("Precio_unitario").value = Precio_unitario;
  document.getElementById("Stock").value = Stock;

  console.log(ID_producto); // UNDEFINED
};

//Corre al dar click consultar
document
  .getElementById("consultaProducto")
  .addEventListener("click", function (event) {
    event.preventDefault();
    busqueda();
  });

//muestra todo el inventario
const inventario = () => {
  fetch(url + "consultaProducto", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => mostrarData(data))
    .catch((error) => console.log(error));
};

document
  .getElementById("inventario")
  .addEventListener("click", function (event) {
    event.preventDefault();
    inventario();
  });

// seccion de editar
const editar = () => {
  const ID_producto = document.getElementById("ID_producto").value;
  const Nombre = document.getElementById("Nombre").value;
  const Categoria = document.getElementById("Categoria").value;
  const Descripcion = document.getElementById("Descripcion").value;
  const Precio_unitario = document.getElementById("Precio_unitario").value;
  const Stock = document.getElementById("Stock").value;

  const dataedit = {
    "ID_producto": ID_producto,
    "Nombre": Nombre,
    "Categoria": Categoria,
    "Descripcion": Descripcion,
    "Precio_unitario": Precio_unitario,
    "Stock": Stock,
  };

  fetch(url + "editar", {
    method: "PUT",
    body: JSON.stringify(dataedit),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.status == 500) {
      alert("Error editando");
    } else {
      alert("Editado con exito");
      formulario.addEventListener("productForm", function () {
        formulario.reset();
      });
    }
  });
};

//Corre al dar click editar
document.getElementById("editar").addEventListener("click", function (event) {
  event.preventDefault();
  editar();
});

//Borrar producto
const deleteProducto = (ID_producto) => {
  console.log(ID_producto);

  fetch(url + "borrar", {
    method: "DELETE",
    body: JSON.stringify({ "ID_producto": ID_producto }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.status == 500) {
      alert("Error interno");
    } else {
      alert("Producto eliminado");
    }
  });
};
