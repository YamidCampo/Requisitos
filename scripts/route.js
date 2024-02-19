
// carga dinamicamente un script en la pagina web
const cargarScript = (scriptSrc) => {
    
    if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
        const script = document.createElement('script');
        script.src = scriptSrc;
        document.head.appendChild(script);
    }
}

// resalta el enlace al cual hace referencia la urta actual
const cambiarEstiloEnlaces = () => {
    const rutaActual = window.location.hash;
    const enlaces = document.querySelectorAll('.navbar-link');
    console.log(rutaActual)
    // Iterar sobre los enlaces y comparar la ruta actual con la ruta del enlace
    enlaces.forEach(enlace => {
        console.log(enlace.pathname)
        if (enlace.hash === rutaActual) {
            enlace.classList.add('activo'); // Agregar clase 'active' al enlace activo
        } else {
            enlace.classList.remove('activo'); // Remover clase 'active' de otros enlaces
        }
    });
}


const urlRutas = {
	404: {
		template: "/templates/404.html",
		title: "404 | IMC",
	},
	"/": {
		template: "/calcularImc.html",
		title: "Calculadora | IMC",
        script: "/scripts/script.js"
	},
	historial: {
		template: "/historial.html",
		title: "Historial | IMC",
	},
};

// Esta función maneja la ubicación de la URL y actualiza dinámicamente el contenido de la página y su título.
const locationHandler = async() => {
	var location = window.location.hash.replace("#", ""); // obtener url hash
    console.log(location)
	if (location.length == 0) {
		location = "/";
	}
    
	// obtener datos de url desde el objeto de rutas
	const route = urlRutas[location] || urlRutas["404"];
	// obtener template html
	const html = await fetch(route.template).then((response) => response.text());
	// establece el html en el content de la pagina
	document.getElementById("content").innerHTML = html;

	// establece el titulo de la pagina
	document.title = route.title;

    // si la ruta tiene un script propio entonces cargarlo en la pagina
    route.script && cargarScript(route.script)
    cambiarEstiloEnlaces()
};



// create a function that watches the hash and calls the urlLocationHandler
window.addEventListener("hashchange", locationHandler);
// call the urlLocationHandler to load the page
locationHandler();