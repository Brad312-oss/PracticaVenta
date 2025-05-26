const API_URL = 'http://localhost:3000/api/productos';

document.getElementById('formProducto').addEventListener('submit', async (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const stock = document.getElementById('stock').value;
  const precio = document.getElementById('precio').value;

  try {
    const respuesta_prod = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, stock, precio })
    });

    const datos_prod = await respuesta_prod.json();

    if (respuesta_prod.ok) {
      alert(datos_prod.mensaje);
      document.getElementById('formProducto').reset();
      cargarProductos();
    } else {
      alert('Error al agregar producto: ' + datos_prod.error);
    }
  } catch (error) {
    alert('Error al conectar con el servidor');
    console.error(error);
  }
});

async function cargarProductos() {
    const res_prod = await fetch(API_URL);
    const datos_prod = await res_prod.json();
    const tabla_prod = document.getElementById('tablaProductos');
    tabla_prod.innerHTML = '';
    datos_prod.forEach(producto => {
        tabla_prod.innerHTML += `
        <tr>
        <td>${producto.id}</td>
        <td>${producto.nombre}</td>
        <td>${producto.stock}</td>
        <td>${producto.precio}</td>
        </tr>
        `;
    })
}
cargarProductos();