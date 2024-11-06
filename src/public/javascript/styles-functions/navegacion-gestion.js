const div_añadir = document.getElementById('form_añadir')
const div_editar = document.getElementById('form_editar')
const div_borrar = document.getElementById('form_borrar')

const btn_añadir = document.getElementById('btn_añadir')
const btn_editar = document.getElementById('btn_editar')
const btn_borrar = document.getElementById('btn_borrar')

btn_añadir.addEventListener('click', () => {
    mostrar_form_añadir()
})

function mostrar_form_añadir() {
    div_añadir.style.display = 'block';
    div_editar.style.display = 'none';
    div_borrar.style.display = 'none';
}

btn_editar.addEventListener('click', () => {
    mostrar_form_editar()
})

function mostrar_form_editar() {
    div_añadir.style.display = 'none';
    div_editar.style.display = 'block';
    div_borrar.style.display = 'none';
}

btn_borrar.addEventListener('click', () => {
    mostrar_form_borrar()
})

function mostrar_form_borrar() {
    div_añadir.style.display = 'none';
    div_editar.style.display = 'none';
    div_borrar.style.display = 'block';
}