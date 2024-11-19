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
                    <p>${productos[i].precio}</p>
                </div>
            </div>
        `;
    }

    console.log('perro')
}; 

const cargarUsuario = async () => {
    const response = await fetch('/cargarSesion');
    const id_usuario_nuevo = await response.json();

    return id_usuario_nuevo
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
        
        if (objeto_json.permisos === 1) {
            contenedor_gestionar_inventario.innerHTML += `
                <a href="gestionar_inventario" class="item_navegacion enlace">GESTIONAR INVENTARIO</a>
                <a href="gestionar_inventario"><img src="../imagenes/header/croissant.png" class="icono_header"></a>
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
        contenedor_gestionar_inventario.style.display = 'block';
    }
};

iniciar();
