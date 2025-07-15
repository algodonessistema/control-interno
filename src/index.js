//index.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const button = form.querySelector("button");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const email = emailInput.value;
    const password = passwordInput.value;

    // 🔍 Validación visual
    emailInput.style.borderColor = email ? "#a0c4e5" : "#c0392b";
    passwordInput.style.borderColor = password ? "#a0c4e5" : "#c0392b";

    if (!email || !password) {
      alert("Completa ambos campos.");
      return;
    }

    // 🔄 Feedback en botón
    button.textContent = "Ingresando...";
    button.disabled = true;

    try {
      // 🔐 Login con Supabase Auth
      const { data, error } = await window.supabase.auth.signInWithPassword({ email, password });

      if (error) {
        alert("Credenciales incorrectas o usuario no registrado.");
        console.error(error);
        return;
      }

      // ✅ Verifica perfil
      const { user } = data;
      const { data: perfil, error: perfilError } = await window.supabase
        .from("usuarios")
        .select("rol, activo")
        .eq("id", user.id)
        .single();

      if (perfilError || !perfil) {
        alert("No se encontró perfil en la tabla usuarios.");
        return;
      }

      if (!perfil.activo) {
        alert("Usuario desactivado. Contacta al administrador.");
        return;
      }

      // 🎯 Redirige según rol
      if (perfil.rol === "administrador") {
        window.location.href = "dashboard.html";
      } else {
        alert("Acceso restringido. Solo administradores pueden ingresar.");
      }
    } catch (err) {
      console.error("Error inesperado:", err);
      alert("Ocurrió un error al intentar ingresar.");
    } finally {
      // 🔁 Restaurar botón
      button.textContent = "Ingresar";
      button.disabled = false;
    }
  });
});