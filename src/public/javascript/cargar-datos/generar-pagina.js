let permisos = false;

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

const cargarUsuario = async () => {
    const response = await fetch('/cargarSesion');
    const id_usuario_nuevo = await response.json();
    const contenedor_id = document.querySelector('#id_cargada');

    contenedor_id.value = id_usuario_nuevo.id_sesion;
};

const verificarPermisos = async () => {
    const responseUser = await fetch('/cargarSesion');
    const cargar_id_usuario = await responseUser.json();
    const id_usuario = cargar_id_usuario.id_sesion;

    try {
        const response = await fetch('/consultarPermisos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_usuario }),
        });

        const objeto_json = await response.json();
        const contenedor = document.getElementById('gestionar');
        
        if (objeto_json.permisos == 1) {
            contenedor.innerHTML += `
                <a href="gestionar-inventario" class="item-navegacion enlace" style="margin-right: 1rem;">GESTIONAR INVENTARIO</a>
                <a href="gestionar-inventario"><img src="../imagenes/header/croissant.png" class="icono-header"></a>
            `;
            permisos = true;
        
        }
        
    } catch (error) {
        console.error('Error al cargar sesión en la nueva página:', error);
    }
};

const iniciar = async () => {
    await cargarUsuario();
    await cargarProductos();
    await verificarPermisos();

    if (permisos) {
        const contenedor = document.getElementById('gestionar');
        contenedor.style.display = 'block';
    }
};

iniciar();
