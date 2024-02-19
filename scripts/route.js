const urlRutas = {
	"/": {
		idContenido: "loginDiv",
		template: "/login.html",
		title: "login | IMC",
        script: "/scripts/login.js"
	},
	calcularImc: {
		idContenido: "calcularImcDiv",
		template: "/calcularImc.html",
		title: "Calculadora | IMC",
        script: "/scripts/script.js"
	},
	historial: {
		idContenido: "historialDiv",
		template: "/historial.html",
		title: "Historial | IMC",
        script: "/scripts/historial.js"
	},
};

// devuelve la variable usuario del localStorage
const usuarioEstaRegistrado = () => {
	return localStorage.getItem('usuario')
} 

// carga un script js en la pagina
const cargarScript = (scriptSrc) => {
	// Validar que el script no esté cargado aún
	if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
        const script = document.createElement('script');
        script.src = scriptSrc;
		document.getElementById("miScripts").appendChild(script);
    }
}

// resalta el enlace al cual hace referencia la urta actual
const cambiarEstiloEnlaces = () => {
    const rutaActual = window.location.hash;
    const enlaces = document.querySelectorAll('.navbar-link');

    // Iterar sobre los enlaces y comparar la ruta actual con la ruta del enlace
    enlaces.forEach(enlace => {
        if (enlace.hash === rutaActual) {
            enlace.classList.add('activo'); // Agregar clase 'active' al enlace activo
        } else {
            enlace.classList.remove('activo'); // Remover clase 'active' de otros enlaces
        }
    });
}

// ocultado todos los elementos del content
const ocultarContenido = () => {
	const content = document.getElementById('content');

	// Obtiene todos los hijos
	const hijos = content.children;
	// Recorre todos los hijos para ocultarlos
	for (var i = 0; i < hijos.length; i++) {
		// Agrega la clase deseada a los hermanos
		hijos[i].classList.add('noMostrar');
	}
}

// Esta función maneja la ubicación de la URL y actualiza dinámicamente el contenido de la página y su título.
const locationHandler = async() => {
	var location = window.location.hash.replace("#", ""); // obtener url hash
	const usuarioRegistrado = usuarioEstaRegistrado()
	
	if (location.length == 0) {
		location = "/";
		if(usuarioRegistrado){ // si el usuario está registrado enviarlo a la pagina de calcular IMC
			window.location.hash = '#calcularImc'
			return
		}
	} else if((location == 'calcularImc' || location === 'historial') && !usuarioRegistrado) {
		window.location.hash = '/'
		return
	}

    
	// obtener datos de url desde el objeto de rutas
	const route = urlRutas[location] || urlRutas["404"];
	ocultarContenido()
	// eliminar clase que oculta el elemento
	document.getElementById(route.idContenido).classList.remove('noMostrar');

	// establece el titulo de la pagina
	document.title = route.title;

    // si la ruta tiene un script propio entonces cargarlo en la pagina
    route.script
    cambiarEstiloEnlaces()
};

// llama la funcion locationHandler cada que el hash cambia
window.addEventListener("hashchange", locationHandler);
// llamar locationHandler al cargar la pagina
locationHandler();



// events
document.addEventListener("DOMContentLoaded",async function() {
	for (let ruta in urlRutas) {
		if (urlRutas.hasOwnProperty(ruta)) {
			const html = await fetch(urlRutas[ruta].template).then((response) => response.text());
			// establece el html en el content de la pagina
			document.getElementById(urlRutas[ruta].idContenido).innerHTML = html;

			
			cargarScript(urlRutas[ruta].script);
		}
	}

});