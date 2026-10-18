# Gestor de participantes

## Descripción

Esta práctica consiste en una aplicación web para gestionar participantes de un evento tecnológico.

La aplicación permite añadir participantes, mostrar sus datos, buscarlos, filtrarlos y consultar diferentes estadísticas. También permite importar y exportar los participantes mediante JSON y guardar algunas preferencias mediante cookies.

## Tecnologías utilizadas

- HTML
- CSS
- JavaScript
- JSON
- Cookies
- `iframe
- postMessage

## Estructura del proyecto


proyecto/
│
├── index.html
├── panel.html
├── ayuda.html
│
├── js/
│   ├── app.js
│   └── funciones.js
│
└── css/
    └── style.css


## Funciones principales

### Añadir participantes

Se pueden añadir participantes indicando:

- Nombre
- Edad
- Tipo
- Modalidad
- Experiencia

Los datos se validan antes de añadirlos.

### Buscar y filtrar

La aplicación permite:

- Buscar participantes por nombre.
- Filtrar por modalidad presencial u online.

### Borrar participantes

Cada participante tiene un botón para eliminarlo. Antes de eliminarlo aparece una confirmación.

### Estadísticas

Se muestran diferentes estadísticas sobre los participantes, como:

- Número total.
- Menores y mayores de edad.
- Edad media.
- Edad mínima y máxima.
- Tipos de participantes.
- Modalidad.
- Nivel de experiencia.
- Experiencia media presencial.

### Importar y exportar JSON

Los participantes se pueden exportar a formato JSON. También se puede pegar un JSON para importar los participantes. Si el JSON no es válido, se muestra un mensaje de error.

### Chat ia

https://chatgpt.com/share/6ad50432-ed50-83ed-8073-5cf0457864c3
