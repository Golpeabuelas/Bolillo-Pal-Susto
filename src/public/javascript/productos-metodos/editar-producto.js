const imagen_default_editar = "../../imagenes/img_default.png"

const cargarImagen_editar = document.getElementById('file_editar')
const imagenCargada_editar = document.getElementById('contenedor_imagen')

cargarImagen_editar.addEventListener( 'change', e => {
    if(e.target.files[0]){
        const reader = new FileReader()
        reader.onload = function (e){
            document.getElementById('imagen_editar').value = e.target.result
            imagenCargada_editar.src = e.target.result;
        }
        reader.readAsDataURL(e.target.files[0])
    } else{
        imagenCargada.src = imagen_default_editar
    }
});

function rellenarCard_editar() {
    const cargarNombre = document.getElementById('nombre_editar').value;
    const cargarPrecio = document.getElementById('precio_editar').value;

    document.querySelector("#cargar-nombre").textContent = cargarNombre;
    document.querySelector("#cargar-precio").textContent = cargarPrecio;

    document.getElementById('agregar_editar').style.display = 'block'
}
