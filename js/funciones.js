let participantes = [];


function validarParticipante(datos) {

    const errores = {};


    const nombre =
        String(
            datos.nombre ?? ""
        ).trim();


    const edad =
        Number(
            datos.edad
        );


    const tipo =
        String(
            datos.tipo ?? ""
        ).trim();


    const modalidad =
        String(
            datos.modalidad ?? ""
        ).trim();


    const experiencia =
        Number(
            datos.experiencia
        );


    if (
        nombre.length < 2
    ) {

        errores.nombre =
            "El nombre debe tener al menos 2 caracteres.";
    }


    if (
        !Number.isInteger(edad) ||
        edad < 0
    ) {

        errores.edad =
            "La edad debe ser un número entero válido.";
    }


    if (
        ![
            "estudiante",
            "profesional",
            "invitado"
        ].includes(tipo)
    ) {

        errores.tipo =
            "Selecciona un tipo válido.";
    }


    if (
        ![
            "presencial",
            "online"
        ].includes(modalidad)
    ) {

        errores.modalidad =
            "Selecciona una modalidad válida.";
    }


    if (
        !Number.isFinite(experiencia) ||
        experiencia < 0
    ) {

        errores.experiencia =
            "La experiencia debe ser un número válido.";
    }


    return errores;
}


function generarId(participantes) {

    if (
        participantes.length === 0
    ) {

        return 1;
    }


    let maximo = 0;


    for (
        const participante of participantes
    ) {

        if (
            participante.id > maximo
        ) {

            maximo =
                participante.id;
        }
    }


    return maximo + 1;
}


function crearTarjeta(participante) {

    const tarjeta =
        document.createElement(
            "article"
        );


    const nombre =
        document.createElement(
            "h3"
        );


    nombre.textContent =
        participante.nombre;


    const edad =
        document.createElement(
            "p"
        );


    edad.textContent =
        `Edad: ${participante.edad}`;


    const tipo =
        document.createElement(
            "p"
        );


    tipo.textContent =
        `Tipo: ${participante.tipo}`;


    const modalidad =
        document.createElement(
            "p"
        );


    modalidad.textContent =
        `Modalidad: ${participante.modalidad}`;


    const experiencia =
        document.createElement(
            "p"
        );


    experiencia.textContent =
        `Experiencia: ${participante.experiencia} años`;


    const fecha =
        document.createElement(
            "p"
        );


    fecha.textContent =
        `Fecha de inscripción: ${participante.fechaInscripcion}`;


    const borrar =
        document.createElement(
            "button"
        );


    borrar.type =
        "button";


    borrar.textContent =
        "Borrar";


    borrar.dataset.id =
        participante.id;


    tarjeta.append(
        nombre,
        edad,
        tipo,
        modalidad,
        experiencia,
        fecha,
        borrar
    );


    return tarjeta;
}


function calcularEstadisticas(
    participantes
) {

    const resultado = {

        total:
            participantes.length,

        menores:
            0,

        mayores:
            0,

        edadMedia:
            null,

        edadMinima:
            null,

        edadMaxima:
            null,

        estudiantes:
            0,

        profesionales:
            0,

        invitados:
            0,

        presenciales:
            0,

        online:
            0,

        principiantes:
            0,

        intermedios:
            0,

        avanzados:
            0,

        experienciaMediaPresencial:
            null,

        primerMenor:
            null
    };


    if (
        participantes.length === 0
    ) {

        return resultado;
    }


    let sumaEdades = 0;

    let minima =
        participantes[0].edad;

    let maxima =
        participantes[0].edad;


    let sumaExperienciaPresencial = 0;

    let numeroPresenciales = 0;


    for (
        const participante of participantes
    ) {

        const edad =
            participante.edad;


        sumaEdades +=
            edad;


        if (
            edad < 18
        ) {

            resultado.menores++;


            if (
                resultado.primerMenor === null
            ) {

                resultado.primerMenor =
                    participante;
            }

        } else {

            resultado.mayores++;
        }


        if (
            edad < minima
        ) {

            minima =
                edad;
        }


        if (
            edad > maxima
        ) {

            maxima =
                edad;
        }


        if (
            participante.tipo ===
            "estudiante"
        ) {

            resultado.estudiantes++;

        } else if (
            participante.tipo ===
            "profesional"
        ) {

            resultado.profesionales++;

        } else if (
            participante.tipo ===
            "invitado"
        ) {

            resultado.invitados++;
        }


        if (
            participante.modalidad ===
            "presencial"
        ) {

            resultado.presenciales++;


            sumaExperienciaPresencial +=
                participante.experiencia;


            numeroPresenciales++;

        } else if (
            participante.modalidad ===
            "online"
        ) {

            resultado.online++;
        }


        if (
            participante.experiencia < 1
        ) {

            resultado.principiantes++;

        } else if (
            participante.experiencia <= 3
        ) {

            resultado.intermedios++;

        } else {

            resultado.avanzados++;
        }
    }


    resultado.edadMedia =
        sumaEdades /
        participantes.length;


    resultado.edadMinima =
        minima;


    resultado.edadMaxima =
        maxima;


    if (
        numeroPresenciales > 0
    ) {

        resultado.experienciaMediaPresencial =
            sumaExperienciaPresencial /
            numeroPresenciales;
    }


    return resultado;
}


function validarColeccionImportada(
    datos
) {

    if (
        !Array.isArray(datos)
    ) {

        return false;
    }


    for (
        const participante of datos
    ) {

        if (
            !participante ||
            typeof participante !== "object"
        ) {

            return false;
        }


        const errores =
            validarParticipante(
                participante
            );


        if (
            Object.keys(errores).length > 0
        ) {

            return false;
        }


        if (
            !Number.isInteger(
                participante.id
            )
        ) {

            return false;
        }


        if (
            typeof participante.fechaInscripcion !==
            "string"
        ) {

            return false;
        }
    }


    return true;
}