let get_id_usuario = '';

document.getElementById('log-in').addEventListener('submit', async (event) => {
    event.preventDefault();

    const correo = document.getElementById('correo').value;
    const password = document.getElementById('password').value;

    await iniciarSesion(correo, password);
});

async function iniciarSesion(correo, password) {
    try {
        const response = await fetch('/iniciarSesion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ correo, password }),
        });

        if (!response.ok) {
            throw new Error('Error al iniciar sesión: ' + response.status);
        }

        const objeto_json = await response.json();
        get_id_usuario = objeto_json.id_usuario;

        await cargarNuevoUsuario();
        cambiarPagina();
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
    }
}

async function cargarNuevoUsuario() {
    const response = await fetch('/cargarSesion');
    const usuario_viejo = await response.json();
    const id_usuario_viejo = usuario_viejo.id_sesion
    const id_usuario_nuevo = get_id_usuario;

    try {
        const response = await fetch('/actualizarSesionIniciada', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_usuario_viejo, id_usuario_nuevo }),
        });
    } catch (error) {
        console.error('Error al cargar sesión en la nueva página:', error);
    }
} 

function cambiarPagina() {
    window.location.href = 'http://localhost:3000/index';
}


