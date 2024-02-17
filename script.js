
let interpretacionCajon = document.getElementById("interpretacionDiv")
let divHeaderIntertretacion = document.getElementById("headerIntertretacion")
interpretacionCajon.classList.add("noMostrar")

// Función que llama a calcularImc() e interpretacion()
function procesarCalculoImc() {
    calcularImc();
    interpretacion();
}

// Agregar event listener al botón de calcular
document.getElementById("botonCalcular").addEventListener("click", procesarCalculoImc);

// Agregar event listener al documento para escuchar el evento de presionar una tecla
document.addEventListener("keydown", function(event) {
    // Verificar si la tecla presionada es Enter
    if (event.keyCode === 13) {
        // Llamar a la función procesarCalculoImc() cuando se presiona Enter
        procesarCalculoImc();
    }
});

function calcularImc() {
    let altura = parseFloat(document.getElementById("alturaUsuario").value);
    let peso = parseFloat(document.getElementById("pesoUsuario").value);
    console.log(peso);

function calcularImc(){
  divHeaderIntertretacion.className = '';
  divHeaderIntertretacion.classList.add("headerIntertretacion")
    let altura = parseFloat(document.getElementById("alturaUsuario").value)
    let peso = parseFloat(document.getElementById("pesoUsuario").value)
    console.log(peso)

    elementErrorAltura.textContent = '';
    elementErrorPeso.textContent = '';

    if (isNaN(altura)) {
        elementErrorAltura.textContent = 'Debes ingresar la altura';
        return;
    }
    if (isNaN(peso)) {
        elementErrorPeso.textContent = 'Debes ingresar el peso';
        return;
    }
    if (altura < 0.8 || altura > 3) {
        elementErrorAltura.textContent = "La altura debe estar entre 0.8 y 3 metros";
        return;
    }
    if (peso < 15 || peso > 700) {
        elementErrorPeso.textContent = "El peso debe estar entre 15 y 700 kg";
        return;
    }

    // Aquí el cálculo
    let imc = peso / (altura ** 2);
    imc = imc.toFixed(2);
    return imc;
}

function interpretacion() {
    let imc = calcularImc();
    let resultado;

    if (!imc) {
        cerrarInterpretacion();
        return;
    }

    switch (true) {
        case (imc < 18.5):

           resultado = "Se encuentra dentro del rango de peso bajo"; 
           divHeaderIntertretacion.classList.add("fondoAzul")
           break
        case (imc >= 18.5 && imc < 25):
          resultado = "Se encuentra dentro del rango de peso normal o saludable";
          divHeaderIntertretacion.classList.add("fondoVerde")
          break;
        case (imc >= 25.0 && imc < 30):
          resultado = "Se encuentra dentro del rango de sobrepeso. ";
          divHeaderIntertretacion.classList.add("fondoNaranja")
          break;
        case (imc >= 30 && imc < 35):
          resultado = "Se encuentra dentro del rango de obesidad I";
          divHeaderIntertretacion.classList.add("fondoRojo")
          break;
        case (imc >= 35 && imc < 40):
          resultado = "Se encuentra dentro del rango de obesidad II. ";
          divHeaderIntertretacion.classList.add("fondoRosado")
          break;
        default:
          resultado = "se encuentra dentro del rango de obesidad III.";
          divHeaderIntertretacion.classList.add("fondoMorado")
          break;
      }


    let cajonInterpretacion = document.getElementById("cajaInterpretacion");
    let cajonMostrarImc = document.getElementById("mostrarImc");
    cajonInterpretacion.textContent = resultado;
    cajonMostrarImc.textContent = "Su IMC es de: " + imc;

    interpretacionCajon.classList.remove("noMostrar");
}

function cerrarInterpretacion() {
    interpretacionCajon.classList.add("noMostrar");
}
