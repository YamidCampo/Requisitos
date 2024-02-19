let interpretacionCajon = document.getElementById("interpretacionDiv")
let divHeaderIntertretacion = document.getElementById("headerIntertretacion")
interpretacionCajon.classList.add("noMostrar")


function calcularImc(){
  divHeaderIntertretacion.className = '';
  divHeaderIntertretacion.classList.add("headerIntertretacion")
    let altura = parseFloat(document.getElementById("alturaUsuario").value)
    let peso = parseFloat(document.getElementById("pesoUsuario").value)
    console.log(peso)

    const elementErrorAltura = document.getElementById('errorAlturaUsuario')
    const elementErrorPeso = document.getElementById('errorPesoUsuario')

    elementErrorAltura.textContent = ''
    elementErrorPeso.textContent = ''

    if (isNaN(altura)){
      elementErrorAltura.textContent = 'Debes ingresar la altura'
      return
    }
    if(isNaN(peso)) {
      elementErrorPeso.textContent = 'Debes ingresar el peso'
      return
    }
    if (altura < 0.8 || altura > 3){
      elementErrorAltura.textContent = "La altura debe estar entre 0.8 y 3 metros"
        return
    }   
    if (peso < 15 || peso > 700){
      elementErrorPeso.textContent = "El peso debe estar entre 15 y 700 kg"
      return
    }

    // Aqui el calculo
    let imc = peso / (altura**2);
    imc= imc.toFixed(2);
    return imc

}

function intepretacion(){
    let imc = calcularImc()
    let resultado;

    if(!imc) {
      cerrarInterpretacion()
      return
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

    let cajonInterpretacion = document.getElementById("cajaInterpretacion")
    let cajonMostrarImc = document.getElementById("mostrarImc")
    cajonInterpretacion.textContent = resultado
    cajonMostrarImc.textContent = "Su IMC es de: " + imc

    interpretacionCajon.classList.remove("noMostrar")
}


function cerrarInterpretacion(){
  interpretacionCajon.classList.add("noMostrar")
}

var alturaInput = document.getElementById("alturaUsuario");
var pesoInput = document.getElementById("pesoUsuario");

alturaInput.addEventListener("keyup", function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        intepretacion();
    }
});

pesoInput.addEventListener("keyup", function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        intepretacion();
    }
});
