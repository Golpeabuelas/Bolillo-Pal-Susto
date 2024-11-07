const imagen_default = "../../imagenes/img_default.png"

const cargarImagen = document.getElementById('file')
const imagenCargada = document.getElementById('contenedor_imagen')

cargarImagen.addEventListener( 'change', e => {
    if(e.target.files[0]){
        const reader = new FileReader()
        reader.onload = function (e){
            document.getElementById('imagen').value = e.target.result
            imagenCargada.src = e.target.result;
        }
        reader.readAsDataURL(e.target.files[0])
    } else{
        imagenCargada.src = imagen_default
    }
});

function rellenarCard() {
    const cargarNombre = document.getElementById('nombre').value;
    const cargarPrecio = document.getElementById('precio').value;

    document.querySelector("#cargar-nombre").textContent = cargarNombre;
    document.querySelector("#cargar-precio").textContent = cargarPrecio;

    document.getElementById('agregar').style.display = 'block'
}