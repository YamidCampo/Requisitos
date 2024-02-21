const guardarHistorial = (formData, imcCalculado) => {

    let cedula = window.cedulaH;

    // Obtener los datos almacenados en el localStorage
    const usuariosGuardados = localStorage.getItem('usuarios');

    // Convertir los datos de JSON a un objeto JavaScript
    const usuarios = JSON.parse(usuariosGuardados);

    if(usuarios) {
        const usuario = usuarios[cedula];
        if(usuario) { 
            if (!usuario.calculos) {
                usuario.calculos = [imcCalculado];
            } else {
                usuario.calculos.push(imcCalculado);
            }
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            return;
        }
    }
}

const crearHistorial= () =>{

    let cedula = window.cedulaH;

    // Obtener los datos almacenados en el localStorage
    const usuariosGuardados = localStorage.getItem('usuarios');

    // Convertir los datos de JSON a un objeto JavaScript
    const usuarios = JSON.parse(usuariosGuardados);

    const usuario = usuarios[cedula];

    if(usuario) { 
        listaCalculos = usuarios[cedula].calculos;
        console.log(listaCalculos)
        return listaCalculos;
        };
    }

const crearTabla = () => {
    let Tabla = function(lista) {
        let stringTabla = "<tr><th>IMC</th><th>Fecha Cálculo</th></tr>"
        for (let imc of lista){
            let fila = "<tr> <td>"
            fila+= imc
            fila+="</td>"
    
            fila+="<td>"
            fila+="hola"
            fila+="</td>"
    
            stringTabla+=fila
    
        }
        return stringTabla;
    }
    
    document.getElementById("tablaIMC").innerHTML = Tabla(crearHistorial());
}

