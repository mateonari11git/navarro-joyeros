document.addEventListener("DOMContentLoaded", async () => {
  const includes = document.querySelectorAll("[data-include]");
  const isLocal = location.hostname === "localhost" || location.hostname === "127.0.0.1";
  const basePath = isLocal ? "" : "/" + location.pathname.split("/")[1];

  const fetchPromises = [];

  for (const el of includes) {
    const file = el.getAttribute("data-include");
    const fullPath = basePath + "/" + file;

    const fetchPromise = fetch(fullPath)
      .then(response => {
        if (!response.ok) throw new Error(`❌ ${response.status} al cargar ${file}`);
        return response.text();
      })
      .then(html => {
        el.innerHTML = html;
      })
      .catch(err => {
        el.innerHTML = `<p style="color:red;">${err.message}</p>`;
      });

    fetchPromises.push(fetchPromise);
  }

  // Espera a que se carguen TODOS los includes
  await Promise.all(fetchPromises);

  // Espera un poco más para asegurar que DOM ya está procesado
  setTimeout(() => {
    document.dispatchEvent(new Event("includesLoaded"));
  }, 50);
});