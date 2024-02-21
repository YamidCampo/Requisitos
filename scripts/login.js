// Obtener los elementos del formulario
const cedulaInput = document.getElementById('cedula');
const nombreInput = document.getElementById('nombre');
const passwordInput = document.getElementById('password');
const errorCedula = document.getElementById('errorCedula');
const errorNombre = document.getElementById('errorNombre');
const errorPassword = document.getElementById('errorPassword');

const nombreDiv = document.getElementById('nombreDiv');
const passwordDiv = document.getElementById('passwordDiv');
const botonContinuar = document.getElementById('botonContinuar');
const botonesLoginDiv = document.getElementById('botonesLoginDiv');
// continuar
let continuar = false;

const validarCedula = () => {
    // Validaciones del campo cédula
    if (cedulaInput.value === '') { // Verificar si el campo de cédula está vacío
        errorCedula.textContent = 'Por favor, ingrese su cédula';
        return; // Evitar el envío del formulario
    } else if (!/^\d+$/.test(cedulaInput.value)) { // Verificar si la cédula solo contiene valores numéricos
        errorCedula.textContent = 'La cédula solo puede contener números';
        return false; // Evitar el envío del formulario
    } else if (cedulaInput.value.length < 8  || cedulaInput.value.length > 10 ) { // Verificar que la cedula tenga entre 8 y 10 dígitos
        errorCedula.textContent = 'La cédula debe contener de 8 a 10 dígitos';
        return false; // Evitar el envío del formulario
    } else {
        errorCedula.textContent = ''; // Limpiar mensaje de error
    }

    return true;
}

const validarFormularioLogin = () => {

    // Validaciones del campo nombre
    if(nombreInput.value === '') { // Verificar si el campo nombre está vacío
        errorNombre.textContent = 'Por favor, ingrese su nombre'
    } else {
        errorNombre.textContent = ''
    }
    
    // Validaciones del campo de contraseña/password
    if (passwordInput.value === '') {// Verificar si el campo de contraseña está vacío
        errorPassword.textContent = 'Por favor, ingrese su contraseña';
        return; // Evitar el envío del formulario
    } else if (passwordInput.value.length < 8) { // Validar que la contraseña tenga al menos 8 caracteres
        errorPassword.textContent = 'La contraseña debe tener al menos 8 carácteres';
        return; // Evitar el envío del formulario
    } else {
        errorPassword.textContent = ''; // Limpiar mensaje de error
    }
    
    const cedula = cedulaInput.value
    // generar objeto con los datos del usuario
    const formData = {}
    formData[cedula] = {
        nombreUsuario: nombreInput.value,
        password: passwordInput.value

    }
    // Si todas las validaciones pasan, se envía el formulario
    return formData;
}

const guardarUsuario = (formData) => {

    const cedula = cedulaInput.value;

    // Obtener los datos almacenados en el localStorage
    const usuariosGuardados = localStorage.getItem('usuarios');

    // Convertir los datos de JSON a un objeto JavaScript
    const usuarios = JSON.parse(usuariosGuardados);
    
    if(usuarios) {
        const usuario = usuarios[cedula];
        if(usuario) { 
            if((usuario.password !== formData[cedula].password)){
                errorPassword.textContent = 'La contraseña no coincide'
                return;
            } else {
                formData[cedula] = usuario
            }
        }
    }
    // Agregar los datos del nuevo usuario el objeto de usuarios
    const newUsuarios = {...usuarios, ...formData}
    // guardar nuevamente los usuarios en el localStorage
    localStorage.setItem('usuarios', JSON.stringify(newUsuarios))

    localStorage.setItem("usuario", cedula)
}

const continuarFormulario = (event) => {
    event.preventDefault();

    const result = validarCedula()
    if(!result) return;

    cedula = cedulaInput.value
    // obtener los todos los usuarios
    const usuariosGuardados = localStorage.getItem('usuarios');

    const usuarios = JSON.parse(usuariosGuardados)

    // mostrar los otros input (nombre y password) ademas del div de botones del login
    passwordDiv.classList.remove('noMostrar')
    botonesLoginDiv.classList.remove('noMostrar')
    botonesLoginDiv.classList.add('botonesLoginDiv')

    // ocultar boton de continuar
    botonContinuar.classList.add('noMostrar')

    if(!(usuarios && usuarios[cedula])) {  
        nombreDiv.classList.remove('noMostrar')
    }

    continuar = true;
    cedulaInput.disabled = true;
}

const login = () => {
    const formData = validarFormularioLogin()

    if(!formData) return;

    // guardar usuario en el localStorage
    guardarUsuario(formData);

    window.cedulaH = cedulaInput.value;

    window.location.hash = '#calcularImc'
}

const reiniciarFormulario = (event) => {
    
    event.preventDefault();
    continuar = true;
    cedulaInput.value = ''
    cedulaInput.disabled = false;

    // ocultar inputs (password y nombre) y div de botones de login
    nombreDiv.classList.add('noMostrar')
    passwordDiv.classList.add('noMostrar')
    botonesLoginDiv.classList.add('noMostrar')
    botonesLoginDiv.classList.remove('botonesLoginDiv')

    // mostrar boton de continuar
    botonContinuar.classList.remove('noMostrar')
}

// eventos

// escuchar cuando se presiona 'Enter' en el input de cedula
cedulaInput.addEventListener("keyup", function (event) {
    if (event.key === 'Enter' && !continuar) {
        continuarFormulario(event);
    }
});

// escuchar cuando se presiona 'Enter' en el input de password/contraseña
passwordInput.addEventListener("keyup", function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        login();
    }
});