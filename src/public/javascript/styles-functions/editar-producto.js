
const cargarProductos = async () => {
    const response = await fetch('/api/productos');
    const productos = await response.json();
    const contenedor = document.querySelector('.carousel');

    for (let i = 0; i < productos.length; i++) {
        contenedor.innerHTML += `
            <div class="carousel-item">
                <img src="${productos.imagen}" alt="Imagen del pastel">
                
                <button class="editar">Editar</button>
            </div>
        `;
    }
};