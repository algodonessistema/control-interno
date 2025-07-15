//app.js

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 🧵 Servir archivos estáticos de 'public' (HTML, imágenes)
app.use(express.static(path.join(__dirname, 'public')));

// 🧵 Servir scripts JS desde 'src'
app.use('/src', express.static(path.join(__dirname, 'src')));

// 🧵 Ruta catch-all para SPA (Single Page App)
app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 🧵 Iniciar el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🧶 Servidor corriendo en puerto ${port}`);
});