const div_tipos = document.querySelector('#tipos-pastel');
const div_porciones = document.querySelector('#porciones');
const div_slider = document.querySelector('.contenedor-slider');

//---------------------------------------------------------------------------

const botones = document.getElementsByClassName('elegir');

for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener('click', () => {
        avanzar_tipos();
    });
}

function avanzar_tipos() {
    div_slider.style.display = 'none';
    div_tipos.style.display = 'block'
}

//---------------------------------------------------------------------------

const btn_regresar = document.getElementById('regresar');

btn_regresar.addEventListener('click', () => {
    regresar_slider();
})

function regresar_slider() {
    div_slider.style.display = 'block';
    div_tipos.style.display = 'none'
}

//---------------------------------------------------------------------------

const btn_seleccionar = document.getElementsByClassName('boton-seleccionar');

for (let i = 0; i < btn_seleccionar.length; i++) {
    btn_seleccionar[i].addEventListener('click', () => {
        avanzar_porciones();
    });
}

function avanzar_porciones() {
    div_porciones.style.display = 'block';
    div_tipos.style.display = 'none';
}

//---------------------------------------------------------------------------

const btn_regresar_tipos = document.getElementById('regresar-tipos');

btn_regresar_tipos.addEventListener('click', () => {
    regresar_tipos();
})

function regresar_tipos() {
    div_porciones.style.display = 'none';
    div_tipos.style.display = 'block'
}