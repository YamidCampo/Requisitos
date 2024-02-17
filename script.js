
function calcularImc(){
    let altura = parseFloat(document.getElementById("alturaUsuario").value)
    let peso = parseFloat(document.getElementById("pesoUsuario").value)
    console.log(peso)


    if (isNaN(altura) || isNaN(peso)){
        alert("Debes introducir todos los parametros")
        return
    }
    if (altura <= 0){
        alert("La altura introducida es invalida")
        return
    }
    if (altura <= 0.8 || altura >= 3){
        alert("Para este rango de altura, el IMC no es interpretable")
        return
    }   
    if (peso <= 15 || peso >= 700){
        alert("El peso introducido es invalido")
        return
    }

    // Aqui el calculo
    let imc = peso / altura**2
    return imc

}

function intepretacion(){
    let imc = calcularImc()
    let resultado;

    switch (true) {
        case (imc < 18.5):
           resultado = "se encuentra dentro del rango de peso bajo"; 
           break
        case (imc >= 18.5 && imc < 25):
          resultado = "se encuentra dentro del rango de peso normal o saludable";
          break;
        case (imc >= 25.0 && imc < 30):
          resultado = "se encuentra dentro del rango de sobrepeso. ";
          break;
        case (imc >= 30 && imc < 35):
          resultado = "se encuentra dentro del rango de obesidad I";
          break;
        case (imc >= 35 && imc < 40):
          resultado = "se encuentra dentro del rango de obesidad II. ";
          break;
        default:
          resultado = "se encuentra dentro del rango de obesidad III.";
          break;
      }

      let cajonInterpretacion = document.getElementById("cajaInterpretacion")
      let cajonMostrarImc = document.getElementById("mostrarImc")
      cajonInterpretacion.textContent = resultado
      cajonMostrarImc.textContent = "Su IMC es de: " + imc
}