const guardarHistorial = (formData, imcCalculado) => {

    let cedula = localStorage.getItem('usuario');

    // Obtener los datos almacenados en el localStorage
    const usuariosGuardados = localStorage.getItem('usuarios');

    // Convertir los datos de JSON a un objeto JavaScript
    const usuarios = JSON.parse(usuariosGuardados);

    if(usuarios) {
        const usuario = usuarios[cedula];
        if(usuario) { 
            let fecha = new Date()
            let dia = fecha.getDate()
            let mes = fecha.getMonth() + 1
            let ano = fecha.getFullYear()
            if (!usuario.calculos) {
                usuario.calculos = [[imcCalculado, dia+"/"+mes+"/"+ano]];
            } else {
                usuario.calculos.push([imcCalculado, dia+"/"+mes+"/"+ano]);
            }
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            return;
        }
    }
}

const crearHistorial= () =>{

    let cedula = localStorage.getItem('usuario');

    // Obtener los datos almacenados en el localStorage
    const usuariosGuardados = localStorage.getItem('usuarios');

    // Convertir los datos de JSON a un objeto JavaScript
    const usuarios = JSON.parse(usuariosGuardados);

    const usuario = usuarios[cedula];
    console.log(usuario)
    if(usuario) { 
        listaCalculos = usuarios[cedula].calculos;
        console.log(listaCalculos)
        return listaCalculos;
        };
    }

const crearTabla = () => {

    let Tabla = function(lista) {
        console.log(lista)
        let stringTabla = "<tr><th>IMC</th><th>Fecha Cálculo</th></tr>"
        for (let imc of lista){
            let fila = "<tr> <td>"
            fila+= imc[0]
            fila+="</td>"
    
            fila+="<td>"
            fila+=imc[1]
            fila+="</td>"
    
            stringTabla+=fila
    
        }
        return stringTabla;
    }
    
    document.getElementById("tablaHistorial").innerHTML = Tabla(crearHistorial());
}

const reiniciarHistorial = () => {
    document.getElementById("tablaHistorial").innerHTML = "";
}

crearTabla()

