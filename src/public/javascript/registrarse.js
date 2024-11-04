const div_password = document.getElementById('form_password');
const div_registro = document.getElementById('form_registro');
const inputs = div_registro.getElementsByClassName('input');

const btn_cambiar_form = document.getElementById('btn_cambiar');

let correo, nombre, telefono;

btn_cambiar_form.addEventListener('click', () => {
    let lleno = true;
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value === '') {
            lleno = false;
            break;
        }
    }

    if (lleno) {
        correo = inputs[0].value;
        nombre = inputs[1].value;
        telefono = inputs[2].value;

        div_registro.style.display = 'none';
        div_password.style.display = 'block';

        pasar_form_passwords(correo, nombre, telefono);
    } else {
        alert('Por favor, completa todos los campos antes de continuar.');
    }
});

document.getElementById('form').addEventListener('submit', (event) => {
    document.getElementById('correo').value = correo;
    document.getElementById('nombre').value = nombre;
    document.getElementById('telefono').value = telefono;

    alert(document.getElementById('telefono').value);
});
