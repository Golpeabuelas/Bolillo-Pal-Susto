const contenedor_inventario = document.getElementById('contenedor_inventario');
const contenedor_gestionar_inventario = document.getElementById('gestionar');
const contenedor_id = document.getElementById('id_cargada');

let permisos = false;

const cargarProductos = async () => {
    const response = await fetch('/api/productos');
    const productos = await response.json();

    for (let i = 0; i < productos.length; i++) {
        contenedor_inventario.innerHTML += `
            <div class="contenedor_producto">
                <img src="${productos[i].imagen}" class="imagen_producto">
                
                <div class="contenedor_datos_producto">
                    <h2>${productos[i].nombre}</h2>
                    <p>$${productos[i].precio}</p>
                </div>
            </div>
        `;
    }

    console.log('perro')
}; 


const iniciar = async () => {
    await cargarProductos();

    if (permisos) {
        contenedor_gestionar_inventario.style.display = 'block';
    }
};

iniciar();
