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