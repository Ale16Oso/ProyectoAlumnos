let datos = []

fetch('./File.json')
    .then(response => response.json())
    .then(data => {
        datos = data
    })

function mostrarDatos() {
    showDatos(datos.alumnosHistoria)
}  

function ordenarAlfabeticamente() {
    let arrayOrdenado= datos.alumnosHistoria.sort((a, b) => {
        if (a.nombre > b.nombre) {
            return 1
        }
        if (a.nombre < b.nombre) {
            return -1
        }
        return 0
    })

    showDatos(arrayOrdenado)
}

function ordenarCalificacion() {
    let arrayOrdenado= datos.alumnosHistoria.sort((b, a) => {
        if(a.calificacion > b.calificacion) {
            return 1
        }
        if (a.calificacion < b.calificacion) {
            return -
            1
        }
        return 0
    })
    showDatos(arrayOrdenado)
}

function showDatos(array) {
    document.getElementById("results").innerHTML = "" 
    array.forEach( (alumno, index) => {
        document.getElementById("results").innerHTML += `
        <tr>
            <th scope="row">${++index}</th>
            <td>${alumno.nombre}</td>
            <td>${alumno.edad}</td>
            <td>${alumno.materia}</td>
            <td>${alumno.calificacion}</td>
            <td><button class="btn btn-danger " onclick="eliminarAlumno(${--index})">Eliminar</button></td>
        </tr>
    `
    });
}

function nuevoAlumno() {
    let nombre = document.getElementById("nombre").value
    const nombreCapitalize = nombre.charAt(0).toUpperCase() + nombre.slice(1);
    let edad = parseInt(document.getElementById("edad").value)
    let materia = document.getElementById("materia").value
    let calificacion = document.getElementById("calificacion").value

    let nuevoAlumno = {
        nombre: nombreCapitalize,
        edad: edad,
        materia: materia,
        calificacion: calificacion
    }

    datos.alumnosHistoria.push(nuevoAlumno)
    showDatos(datos.alumnosHistoria)
    ocultarFormulario()
}

function eliminarAlumno(indice) {
    datos.alumnosHistoria.splice(indice,1)
    showDatos(datos.alumnosHistoria)
}

function mostrarFormulario() {
    document.getElementById("formAlumno").style.display = "block"
}

function ocultarFormulario() {
    document.getElementById("formAlumno").style.display = "none"
}

function buscarAlumno() {
    let alumnoAbuscar = document.getElementById("searchItem").value
    const nombreCapitalize = alumnoAbuscar.charAt(0).toUpperCase() + alumnoAbuscar.slice(1);
    let datosFiltrados = datos.alumnosHistoria.filter( alumno => alumno.nombre.includes(nombreCapitalize) )
    if (datosFiltrados.length == 0) {
        document.getElementById("showError").innerHTML = `
        <div class="alert alert-danger" role="alert">
        No se encontraron coincidencias
      </div>
        `
    } else {
        document.getElementById("showError").innerHTML = ""
        showDatos(datosFiltrados)
    }
    
}


const searchInput = document.getElementById("searchItem");
searchInput.addEventListener("input",  buscarAlumno)