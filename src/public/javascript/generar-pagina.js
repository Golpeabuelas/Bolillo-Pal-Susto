const cargarProductos = async () => {
    const response = await fetch('/api/productos');
    const productos = await response.json();
    const contenedor = document.querySelector('.contenedor-productos');

    for (let i = 0; i < productos.length; i++) {
        contenedor.innerHTML += `
            <div class="producto">
                <img src="${productos[i].imagen}" class="img-producto">
                <div class="datos-producto">
                    <h2>${productos[i].nombre}</h2>
                    <p>${productos[i].precio}</p>
                </div>
            </div>
        `;
    }
};

cargarProductos();