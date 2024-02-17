
function calcularImc(){
    let altura = document.getElementById("alturaUsuario").value
    let peso = document.getElementById("pesoUsuario").value
    console.log(altura, peso)

    // Aqui el calculo
    let imc = peso / altura**2
    console.log(imc)
}