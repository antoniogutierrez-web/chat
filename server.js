// server.js

// Importamos las dependencias necesarias
const express = require('express');
const http = require('http'); // Necesario para crear el servidor HTTP
const { Server } = require('socket.io');

// Creamos la aplicación Express
const app = express();

// Creamos un servidor HTTP utilizando la aplicación de Express
const server = http.createServer(app);

// Inicializamos Socket.io con el servidor HTTP
const io = new Server(server);

// Configuramos una carpeta pública para servir archivos estáticos (front-end)
app.use(express.static('public'));

// Configuramos la ruta raíz para enviar el archivo HTML
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Manejo de conexiones de Socket.io
io.on('connection', (socket) => {
  console.log('Un usuario se ha conectado');

  // Escuchamos cuando se envía un mensaje desde el cliente
  socket.on('chat message', (msg) => {
    // Emitimos el mensaje a todos los clientes conectados
    io.emit('chat message', msg);
  });

  // Detectamos la desconexión del usuario
  socket.on('disconnect', () => {
    console.log('Un usuario se ha desconectado');
  });
});

// Configuramos el puerto en el que el servidor escuchará (3000 por defecto)
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
