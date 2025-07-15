// dashboard.js
//import { supabase } from './supabaseClient.js';

document.addEventListener('DOMContentLoaded', () => {
  // 🚀 Inicializa saludo al cargar la vista
  cargarSaludo();

  // 🔐 Botón de logout (cierre de sesión)
  const logoutBtn = document.getElementById('logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      const { error } = await supabase.auth.signOut();
      if (!error) {
        alert("✅ Sesión cerrada correctamente");
        window.location.href = "index.html"; // Vuelve al login
      } else {
        alert("❌ No se pudo cerrar sesión.");
        console.error(error);
      }
    });
  }

  // 🧭 Inicia eventos del menú lateral
  document.querySelectorAll('.sidebar li').forEach(item => {
    item.addEventListener('click', () => {
      const modulo = item.textContent.toLowerCase().replace(/\s/g, '');
      mostrarModulo(modulo);
    });
  });
});

// 👋 Saludo dinámico al cargar el dashboard
async function cargarSaludo() {
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    window.location.href = "index.html"; // Redirige si no hay sesión activa
    return;
  }

  const { data: perfil, error: perfilError } = await supabase
    .from('usuarios')
    .select('nombre, rol')
    .eq('id', user.id)
    .single();

  if (perfilError || !perfil) {
    document.getElementById('bienvenida').textContent = "Bienvenido al sistema";
    console.error(perfilError);
    return;
  }

  document.getElementById('bienvenida').textContent =
    `👋 Bienvenido, ${perfil.nombre} (${perfil.rol})`;
}

// 🔡 Capitaliza el nombre del módulo
function capitalizar(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

// 📦 Muestra el contenido del módulo seleccionado
function mostrarModulo(modulo) {
  const content = document.getElementById('modulo-content');

  content.innerHTML = `
    <div class="section-title">${capitalizar(modulo)}</div>
    <p>Aquí irá la funcionalidad CRUD del módulo <strong>${modulo}</strong>.</p>
  `;

  // 🔁 Futuro: cargar componentes específicos por módulo aquí
}

window.mostrarModulo = mostrarModulo;