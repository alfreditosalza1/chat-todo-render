const socket = io();

function enviarMensaje() {
  const input = document.getElementById('mensaje');
  const texto = input.value;
  if (texto.trim() !== '') {
    socket.emit('mensaje', texto);
    input.value = '';
  }
}

socket.on('mensaje', (msg) => {
  const chat = document.getElementById('chat');
  const p = document.createElement('p');
  p.textContent = msg;
  chat.appendChild(p);
  chat.scrollTop = chat.scrollHeight;
});
