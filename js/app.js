const formulario =
    document.getElementById(
        "formularioParticipante"
    );


const listaParticipantes =
    document.getElementById(
        "listaParticipantes"
    );


const busqueda =
    document.getElementById(
        "busqueda"
    );


const filtroModalidad =
    document.getElementById(
        "filtroModalidad"
    );


const estadisticas =
    document.getElementById(
        "estadisticas"
    );


const areaJson =
    document.getElementById(
        "areaJson"
    );


const exportarJson =
    document.getElementById(
        "exportarJson"
    );


const importarJson =
    document.getElementById(
        "importarJson"
    );


const mensajeJson =
    document.getElementById(
        "mensajeJson"
    );


const iframePanel =
    document.getElementById(
        "iframePanel"
    );


const abrirAyuda =
    document.getElementById(
        "abrirAyuda"
    );


function mostrarErrores(errores) {

    document.getElementById(
        "errorNombre"
    ).textContent =
        errores.nombre || "";


    document.getElementById(
        "errorEdad"
    ).textContent =
        errores.edad || "";


    document.getElementById(
        "errorTipo"
    ).textContent =
        errores.tipo || "";


    document.getElementById(
        "errorModalidad"
    ).textContent =
        errores.modalidad || "";


    document.getElementById(
        "errorExperiencia"
    ).textContent =
        errores.experiencia || "";
}


function enviarParticipantesAlPanel() {

    if (!iframePanel.contentWindow) {
        return;
    }


    iframePanel.contentWindow.postMessage(
        {
            tipo: "actualizarParticipantes",
            participantes: participantes
        },
        window.location.origin
    );
}


function mostrarParticipantes() {

    listaParticipantes.replaceChildren();


    const textoBusqueda =
        busqueda.value
            .trim()
            .toLowerCase();


    const modalidadSeleccionada =
        filtroModalidad.value;


    for (
        const participante of participantes
    ) {

        const coincideNombre =
            participante.nombre
                .toLowerCase()
                .includes(
                    textoBusqueda
                );


        const coincideModalidad =
            modalidadSeleccionada ===
                "todas" ||
            participante.modalidad ===
                modalidadSeleccionada;


        if (
            !coincideNombre ||
            !coincideModalidad
        ) {

            continue;
        }


        const tarjeta =
            crearTarjeta(
                participante
            );


        listaParticipantes.append(
            tarjeta
        );
    }


    const tarjetas =
        listaParticipantes.children;


    if (
        tarjetas.length === 0
    ) {

        document.getElementById(
            "mensajeLista"
        ).textContent =
            "No hay participantes que coincidan con los filtros.";

    } else {

        document.getElementById(
            "mensajeLista"
        ).textContent =
            "";
    }


    const botonesBorrar =
        listaParticipantes
            .querySelectorAll(
                "button"
            );


    for (
        const boton of botonesBorrar
    ) {

        boton.addEventListener(
            "click",
            borrarParticipante
        );
    }


    mostrarEstadisticas();

    enviarParticipantesAlPanel();
}


function borrarParticipante(evento) {

    const boton =
        evento.target;


    const id =
        Number(
            boton.dataset.id
        );


    const participante =
        participantes.find(
            function (participante) {

                return participante.id === id;
            }
        );


    if (!participante) {

        return;
    }


    const confirmado =
        confirm(
            `¿Quieres borrar a ${participante.nombre}?`
        );


    if (!confirmado) {

        return;
    }


    const posicion =
        participantes.indexOf(
            participante
        );


    participantes.splice(
        posicion,
        1
    );


    mostrarParticipantes();
}


function mostrarEstadisticas() {

    const datos =
        calcularEstadisticas(
            participantes
        );


    estadisticas.replaceChildren();


    const total =
        document.createElement(
            "p"
        );


    total.textContent =
        `Total de participantes: ${datos.total}`;


    const edades =
        document.createElement(
            "p"
        );


    edades.textContent =
        `Edades: ${datos.menores} menores y ${datos.mayores} mayores`;


    const media =
        document.createElement(
            "p"
        );


    if (
        datos.edadMedia !== null
    ) {

        media.textContent =
            `Edad media: ${datos.edadMedia.toFixed(2)}`;

    } else {

        media.textContent =
            "Edad media: Sin datos";
    }


    const minima =
        document.createElement(
            "p"
        );


    if (
        datos.edadMinima !== null
    ) {

        minima.textContent =
            `Edad mínima: ${datos.edadMinima}`;

    } else {

        minima.textContent =
            "Edad mínima: Sin datos";
    }


    const maxima =
        document.createElement(
            "p"
        );


    if (
        datos.edadMaxima !== null
    ) {

        maxima.textContent =
            `Edad máxima: ${datos.edadMaxima}`;

    } else {

        maxima.textContent =
            "Edad máxima: Sin datos";
    }


    const tipos =
        document.createElement(
            "p"
        );


    tipos.textContent =
        `Tipos: ${datos.estudiantes} estudiantes, ` +
        `${datos.profesionales} profesionales, ` +
        `${datos.invitados} invitados`;


    const modalidades =
        document.createElement(
            "p"
        );


    modalidades.textContent =
        `Modalidades: ${datos.presenciales} presenciales, ` +
        `${datos.online} online`;


    const experiencia =
        document.createElement(
            "p"
        );


    experiencia.textContent =
        `Experiencia: ${datos.principiantes} iniciales, ` +
        `${datos.intermedios} intermedios, ` +
        `${datos.avanzados} avanzados`;


    const mediaPresencial =
        document.createElement(
            "p"
        );


    if (
        datos.experienciaMediaPresencial !== null
    ) {

        mediaPresencial.textContent =
            `Experiencia media presencial: ` +
            `${datos.experienciaMediaPresencial.toFixed(2)}`;

    } else {

        mediaPresencial.textContent =
            "Experiencia media presencial: Sin datos";
    }


    const primerMenor =
        document.createElement(
            "p"
        );


    if (
        datos.primerMenor !== null
    ) {

        primerMenor.textContent =
            `Primer menor de edad: ` +
            `${datos.primerMenor.nombre}`;

    } else {

        primerMenor.textContent =
            "Primer menor de edad: No hay ninguno";
    }


    estadisticas.append(
        total,
        edades,
        media,
        minima,
        maxima,
        tipos,
        modalidades,
        experiencia,
        mediaPresencial,
        primerMenor
    );
}


function exportarParticipantes() {

    const json =
        JSON.stringify(
            participantes,
            null,
            2
        );


    areaJson.value =
        json;


    mensajeJson.textContent =
        "Datos exportados correctamente.";
}


function importarParticipantes() {

    const texto =
        areaJson.value.trim();


    if (texto === "") {

        mensajeJson.textContent =
            "No hay datos para importar.";

        return;
    }


    let datos;


    try {

        datos =
            JSON.parse(texto);

    } catch (error) {

        mensajeJson.textContent =
            "El JSON no tiene un formato válido.";

        return;
    }


    if (
        !validarColeccionImportada(
            datos
        )
    ) {

        mensajeJson.textContent =
            "Los datos importados no son válidos.";

        return;
    }


    participantes.splice(
        0,
        participantes.length,
        ...datos
    );


    mostrarParticipantes();


    mensajeJson.textContent =
        "Datos importados correctamente.";
}


function abrirVentanaAyuda() {

    window.open(
        "ayuda.html",
        "ventanaAyuda",
        "width=600,height=500"
    );
}


function guardarCookie(
    nombre,
    valor,
    dias
) {

    const fecha =
        new Date();


    fecha.setTime(
        fecha.getTime() +
        dias *
        24 *
        60 *
        60 *
        1000
    );


    document.cookie =
        `${nombre}=${encodeURIComponent(valor)};expires=${fecha.toUTCString()};path=/`;
}


function leerCookie(nombre) {

    const cookies =
        document.cookie.split(";");


    for (
        const cookie of cookies
    ) {

        const partes =
            cookie.trim().split("=");


        if (
            partes[0] === nombre
        ) {

            return decodeURIComponent(
                partes
                    .slice(1)
                    .join("=")
            );
        }
    }


    return null;
}


function aplicarPreferencias() {

    const tema =
        leerCookie("tema");


    const tamanoTexto =
        leerCookie("tamanoTexto");


    if (
        tema === "oscuro"
    ) {

        document.body.classList.add(
            "tema-oscuro"
        );
    }


    if (
        tamanoTexto === "grande"
    ) {

        document.body.classList.add(
            "texto-grande"
        );
    }


    if (tema) {

        document.getElementById(
            "tema"
        ).value =
            tema;
    }


    if (tamanoTexto) {

        document.getElementById(
            "tamanoTexto"
        ).value =
            tamanoTexto;
    }
}


busqueda.addEventListener(
    "input",
    mostrarParticipantes
);


filtroModalidad.addEventListener(
    "change",
    mostrarParticipantes
);


formulario.addEventListener(
    "submit",
    function (evento) {

        evento.preventDefault();


        const datos = {

            nombre:
                document.getElementById(
                    "nombre"
                ).value,

            edad:
                document.getElementById(
                    "edad"
                ).value,

            tipo:
                document.getElementById(
                    "tipo"
                ).value,

            modalidad:
                document.getElementById(
                    "modalidad"
                ).value,

            experiencia:
                document.getElementById(
                    "experiencia"
                ).value
        };


        const errores =
            validarParticipante(
                datos
            );


        mostrarErrores(
            errores
        );


        if (
            Object.keys(errores).length > 0
        ) {

            return;
        }


        const id =
            generarId(
                participantes
            );


        if (id === null) {

            document.getElementById(
                "mensajeFormulario"
            ).textContent =
                "No se ha podido generar un identificador.";

            return;
        }


        const nuevoParticipante = {

            id: id,

            nombre:
                datos.nombre.trim(),

            edad:
                Number(
                    datos.edad
                ),

            tipo:
                datos.tipo,

            modalidad:
                datos.modalidad,

            experiencia:
                Number(
                    datos.experiencia
                ),

            fechaInscripcion:
                new Date().toISOString()
        };


        participantes.push(
            nuevoParticipante
        );


        mostrarParticipantes();


        formulario.reset();


        mostrarErrores({});
    }
);


exportarJson.addEventListener(
    "click",
    exportarParticipantes
);


importarJson.addEventListener(
    "click",
    importarParticipantes
);


abrirAyuda.addEventListener(
    "click",
    abrirVentanaAyuda
);


iframePanel.addEventListener(
    "load",
    enviarParticipantesAlPanel
);


document.getElementById(
    "tema"
).addEventListener(
    "change",
    function () {

        const valor =
            this.value;


        guardarCookie(
            "tema",
            valor,
            30
        );


        document.body.classList.remove(
            "tema-oscuro"
        );


        if (
            valor === "oscuro"
        ) {

            document.body.classList.add(
                "tema-oscuro"
            );
        }
    }
);


document.getElementById(
    "tamanoTexto"
).addEventListener(
    "change",
    function () {

        const valor =
            this.value;


        guardarCookie(
            "tamanoTexto",
            valor,
            30
        );


        document.body.classList.remove(
            "texto-grande"
        );


        if (
            valor === "grande"
        ) {

            document.body.classList.add(
                "texto-grande"
            );
        }
    }
);


mostrarParticipantes();

aplicarPreferencias();