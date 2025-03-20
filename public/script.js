// public/script.js

// Conectar con el servidor Socket.io
const socket = io();

// Seleccionar elementos del DOM
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

// Escuchar el evento de envío del formulario
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    // Enviar el mensaje al servidor
    socket.emit('chat message', input.value);
    input.value = '';
  }
});

// Escuchar los mensajes emitidos por el servidor
socket.on('chat message', (msg) => {
  const item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
  // Auto-scroll para ver el último mensaje
  window.scrollTo(0, document.body.scrollHeight);
});
