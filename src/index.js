document.querySelector("form").addEventListener("submit", function(e) {
  e.preventDefault();
  const usuario = document.querySelector("input[type='text']").value;
  const contraseña = document.querySelector("input[type='password']").value;

  if (usuario && contraseña) {
    // Por ahora, redirige al dashboard localmente
    window.location.href = "dashboard.html";
  } else {
    alert("Por favor completa todos los campos.");
  }
});

import { supabase } from './supabaseClient.js';

document.querySelector("form").addEventListener("submit", async function(e) {
  e.preventDefault();

  const email = document.querySelector("input[type='text']").value;
  const password = document.querySelector("input[type='password']").value;

  if (!email || !password) {
    alert("Completa ambos campos.");
    return;
  }

  // 🔐 Login con Supabase Auth
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert("Credenciales incorrectas o usuario no registrado.");
    console.error(error);
    return;
  }

  // ✅ Verificar si el usuario está activo y tiene rol válido
  const { user } = data;
  const { data: perfil, error: perfilError } = await supabase
    .from('usuarios')
    .select('rol, activo')
    .eq('id', user.id)
    .single();

  if (perfilError || !perfil) {
    alert("No se encontró perfil en la tabla usuarios.");
    return;
  }

  if (!perfil.activo) {
    alert("Usuario desactivado. Contacta al administrador.");
    return;
  }

  // 🎯 Redirigir según rol si deseas
  if (perfil.rol === 'administrador') {
    window.location.href = "dashboard.html";
  } else {
    alert("Acceso restringido. Solo administradores pueden ingresar.");
  }
});