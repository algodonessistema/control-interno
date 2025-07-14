// dashboard.js

// Función para capitalizar el nombre del módulo (opcional pero elegante)
function capitalizar(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

// Función principal para mostrar el contenido del módulo
function mostrarModulo(modulo) {
  const content = document.getElementById('modulo-content');
  
  content.innerHTML = `
    <div class="section-title">${capitalizar(modulo)}</div>
    <p>Aquí irá la funcionalidad CRUD del módulo <strong>${modulo}</strong>.</p>
  `;

  // 🔁 En el futuro: puedes importar o cargar componentes por módulo aquí
  // ejemplo: cargarFormularioInventario(), mostrarTablaProducción(), etc.
}

// 🧭 Inicializar eventos del menú (opcional si prefieres delegación desde HTML)
document.querySelectorAll('.sidebar li').forEach(item => {
  item.addEventListener('click', () => {
    const modulo = item.textContent.toLowerCase().replace(/\s/g, '');
    mostrarModulo(modulo);
  });
});