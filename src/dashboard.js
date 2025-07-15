// dashboard.js

document.addEventListener('DOMContentLoaded', () => {
  cargarSaludo();
  actualizarUltimoIngreso();

  // 🔐 Botón de logout
  const logoutBtn = document.getElementById('logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      const { error } = await window.supabase.auth.signOut();
      if (!error) {
        alert("✅ Sesión cerrada correctamente");
        window.location.href = "index.html";
      } else {
        alert("❌ No se pudo cerrar sesión.");
        console.error(error);
      }
    });
  }

  // 🎯 Menú lateral
  document.querySelectorAll('.sidebar li').forEach(item => {
    item.addEventListener('click', () => {
      const modulo = item.textContent.toLowerCase().replace(/\s/g, '');
      mostrarModulo(modulo);
    });
  });
});

// 👋 Saludo dinámico con verificación de perfil
async function cargarSaludo() {
  const { data: { user }, error } = await window.supabase.auth.getUser();
  if (error || !user) {
    window.location.href = "index.html";
    return;
  }

  const { data: perfil, error: perfilError } = await window.supabase
    .from('usuarios')
    .select('nombre, rol, ultimo_ingreso')
    .eq('id', user.id)
    .single();

  if (perfilError || !perfil) {
    console.warn("⚠️ No se encontró perfil institucional");

    const formularioRegistro = document.getElementById("formulario-registro");
    if (formularioRegistro) formularioRegistro.style.display = "block";

    const registroForm = document.getElementById("registroPerfil");
    if (registroForm) {
      registroForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nuevoPerfil = {
          id: user.id,
          nombre: document.getElementById("inputNombre").value,
          telefono: document.getElementById("inputTelefono").value,
          rol: document.getElementById("inputRol").value,
          activo: true,
          ultimo_ingreso: new Date().toISOString()
        };

        const { error: upsertError } = await window.supabase
          .from("usuarios")
          .upsert(nuevoPerfil);

        if (upsertError) {
          alert("❌ No se pudo registrar el perfil");
          console.error(upsertError);
        } else {
          alert("✅ Perfil institucional creado correctamente");
          window.location.reload();
        }
      });
    }

    return;
  }

  // ⏱️ Formatear fecha
  const fecha = perfil.ultimo_ingreso ? new Date(perfil.ultimo_ingreso) : null;
  let fechaTexto = "";
  if (fecha) {
    const opciones = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    fechaTexto = fecha.toLocaleString('es-VE', opciones);
  }

  document.getElementById('bienvenida').textContent =
    `👋 Bienvenido, ${perfil.nombre} (${perfil.rol})${fechaTexto ? ' • Último ingreso: ' + fechaTexto : ''}`;
}

// 🕒 Actualiza último ingreso
async function actualizarUltimoIngreso() {
  const { data: { user }, error } = await window.supabase.auth.getUser();
  if (error || !user) return;

  const { error: updateError } = await window.supabase
    .from("usuarios")
    .update({ ultimo_ingreso: new Date().toISOString() })
    .eq("id", user.id);

  if (updateError) console.error("⛔ Error al actualizar 'ultimo_ingreso':", updateError);
}

// 🔡 Capitaliza módulo
function capitalizar(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

// 📦 Carga módulo en vista
function mostrarModulo(modulo) {
  const content = document.getElementById('modulo-content');
  content.style.opacity = 0;
  setTimeout(() => {
    content.innerHTML = `
      <div class="section-title">${capitalizar(modulo)}</div>
      <p>Aquí irá la funcionalidad CRUD del módulo <strong>${modulo}</strong>.</p>
    `;
    content.style.opacity = 1;
  }, 200);
}

window.mostrarModulo = mostrarModulo;