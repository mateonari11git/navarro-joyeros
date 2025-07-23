document.addEventListener("DOMContentLoaded", async () => {
  const includes = document.querySelectorAll("[data-include]");

  // Detecta si estás en localhost o GitHub Pages
  const isLocal = location.hostname === "localhost" || location.hostname === "127.0.0.1";
  const basePath = isLocal ? "" : "/" + location.pathname.split("/")[1];

  for (const el of includes) {
    const file = el.getAttribute("data-include");
    const fullPath = basePath + "/" + file;

    console.log("🔄 Intentando cargar:", fullPath);

    try {
      const response = await fetch(fullPath);
      if (!response.ok) {
        throw new Error(`❌ ${response.status} al cargar ${file}`);
      }

      const html = await response.text();
      el.innerHTML = html;
      console.log("✅ Cargado correctamente:", fullPath);

      // Inicializar Flatpickr si es contacto.html
      if (file.includes("contacto")) {
        setTimeout(() => {
          const fechaInput = document.querySelector("#fechaCita");
          if (fechaInput) {
            flatpickr(fechaInput, {
              altInput: true,
              altFormat: "F j, Y",
              dateFormat: "Y-m-d",
              defaultDate: "today"
            });
            console.log("📅 Flatpickr inicializado");
          } else {
            console.warn("⚠️ No se encontró #fechaCita");
          }
        }, 100); // Espera a que el DOM esté pintado
      }

    } catch (err) {
      console.error("⛔ Error al cargar:", fullPath, err.message);
      el.innerHTML = `<p style="color:red;">${err.message}</p>`;
    }
  }
});