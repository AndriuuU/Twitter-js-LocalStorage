// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Cargar los tweets desde localStorage
    tweets = JSON.parse(localStorage.getItem('tweets')) || [];
    crearHTML();
});

formulario.addEventListener('submit', agregarTweet);

// Funciones

function agregarTweet(e) {
    e.preventDefault();

    // Textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    // Validación
    if (tweet === '') {
        mostrarError('Un tweet no puede ir vacío');
        return;
    }

    // Crear objeto de tweet
    const tweetObj = {
        id: Date.now(),
        texto: tweet
    };

    // Añadir al arreglo de tweets
    tweets = [...tweets, tweetObj];

    // Una vez agregado, creamos el HTML
    crearHTML();

    // Reiniciar el formulario
    formulario.reset();
}

// Muestra un mensaje de error
function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('error');

    // Insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    // Eliminar la alerta después de 3 segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

// Muestra un listado de los tweets
function crearHTML() {
    // Limpiar el HTML previo
    limpiarHTML();

    if (tweets.length > 0) {
        tweets.forEach(tweet => {
            // Crear botón de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            // Añadir la función de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            };

            // Crear el HTML
            const li = document.createElement('li');
            li.innerText = tweet.texto;

            // Asignar el botón de borrar
            li.appendChild(btnEliminar);

            // Insertarlo en el HTML
            listaTweets.appendChild(li);
        });
    }

    // Sincronizar con localStorage
    sincronizarStorage();
}

// Agregar los tweets actuales a localStorage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Eliminar un tweet
function borrarTweet(id) {
    // Filtrar los tweets con el ID distinto al que queremos borrar
    tweets = tweets.filter(tweet => tweet.id !== id);

    // Actualizamos el HTML
    crearHTML();
}

// Limpiar el HTML
function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}
