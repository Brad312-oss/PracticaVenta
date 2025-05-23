const API_CLIENTES = 'http://localhost:3000/api/clientes';
const API_PRODUCTOS = 'http://localhost:3000/api/productos';
const API_VENTAS = 'http://localhost:3000/api/ventas';

document.getElementById('formventa').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id_cliente = document.getElementById('cliente').value;
    const id_producto = document.getElementById('producto').value;
    const cantidad = document.getElementById('cantidad').value;
    
    const res = await fetch(API_VENTAS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ id_cliente, id_producto, cantidad})
    });

    const data = await res.json();
    if(res.ok) {
        alert(data.mensaje);
        document.getElementById('formVenta').reset();
        cargarVentas();
    } else {
        alert('Error: ' +data.error);
    }
});

async function cargarClientesYProductos() {
    const clientes = await(await fetch(API_CLIENTES)).json();
    const productos = await(await fetch(API_PRODUCTOS)).json();

    const clienteSelect = document.getElementById('cliente');
    clienteSelect.innerHTML = '<option value=""> Seleccione cliente </option>';
    clientes.foreach ( c => {
        clienteSelect.innerHTML += `<option value="${c.id}">${c.nombre}</option>`
    });
    const productoSelect = document.getElementById('producto');
    productoSelect.innerHTML = '<option value=""> Seleccione producto </option>';
    productos.foreach ( c => {
        productoSelect.innerHTML += `<option value="${p.id}">${p.nombre_prod} ( Stock: ${p.stock})</option>`
    });
}

async function cargarVentas() {
    const ventas = await(await fetch(API_VENTAS)).json();
    const tabla = document.getElementById ('tablaVentas');
    tabla.innerHTML = '';
    ventas.forEach(v => {
        tabla.innerHTML += `
        <tr>
        <td>${v.id}</td>
        <td>${v.cliente}</td>
        <td>${v.producto}</td>
        <td>${v.cantidad}</td>
        <td>${v.precio_unitario}</td>
        <td>${v.total}</td>
        <td>${new Date(v.fecha).toLocaleString()}</td>
        </tr>`;
    });
}
cargarClientesYProductos();
cargarVentas();