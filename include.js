document.addEventListener("DOMContentLoaded", () => {
  const includes = document.querySelectorAll("[data-include]");

  // Detecta si estás en localhost o en GitHub Pages
  const isLocal = location.hostname === "localhost" || location.hostname === "127.0.0.1";
  const basePath = isLocal ? "" : "/" + location.pathname.split("/")[1];

  includes.forEach(el => {
    const file = el.getAttribute("data-include");
    const fullPath = basePath + "/" + file;

    console.log("🔄 Intentando cargar:", fullPath);

    fetch(fullPath)
      .then(response => {
        if (!response.ok) {
          throw new Error(`❌ ${response.status} al cargar ${file}`);
        }
        return response.text();
      })
      .then(data => {
        console.log("✅ Cargado correctamente:", fullPath);
        el.innerHTML = data;
      })
      .catch(err => {
        console.error("⛔ Error al cargar:", fullPath, err.message);
        el.innerHTML = `<p style="color:red;">${err.message}</p>`;
      });
  });
});