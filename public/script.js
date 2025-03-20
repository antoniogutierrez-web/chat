const socket = io();
const messagesList = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('input');

// Generar un ID único para cada usuario
const userId = Math.random().toString(36).substring(2, 10);

// 🔹 Función para agregar un mensaje al chat
function addMessage(msg, isUser) {
    const item = document.createElement('li');
    item.classList.add('message', isUser ? 'user' : 'other');
    item.textContent = msg.text; // Acceder correctamente al mensaje
    messagesList.appendChild(item);
    messagesList.scrollTop = messagesList.scrollHeight; // Desplazar hacia abajo automáticamente
}

// 🔹 Escuchar historial de mensajes al conectarse
socket.on('messageHistory', (history) => {
    messagesList.innerHTML = ''; // Limpiar chat antes de mostrar historial
    history.forEach((msg) => addMessage(msg, msg.userId === userId));
});

// 🔹 Escuchar nuevos mensajes
socket.on('chat message', (msg) => {
    addMessage(msg, msg.userId === userId);
});

// 🔹 Enviar mensaje cuando se envíe el formulario
form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (input.value.trim()) {
        const messageData = { text: input.value.trim(), userId };
        socket.emit('chat message', messageData);
        input.value = ''; // Limpiar el campo de entrada
    }
});
