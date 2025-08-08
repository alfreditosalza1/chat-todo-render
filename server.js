const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: { origin: '*' }
});

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

io.on('connection', (socket) => {
  console.log('Usuario conectado');
  socket.on('mensaje', (msg) => io.emit('mensaje', msg));
  socket.on('disconnect', () => console.log('Usuario desconectado'));
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
