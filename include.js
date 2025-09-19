// include.js (versión robusta para GitHub Pages + dominio propio)
document.addEventListener("DOMContentLoaded", async () => {
  const includes = document.querySelectorAll("[data-include]");
  const fetches = [];

  for (const el of includes) {
    const src = el.getAttribute("data-include");

    // Resuelve la URL relativa respecto a la página actual (mismo origen)
    const url = new URL(src, document.baseURI).href;

    const p = fetch(url, { cache: "no-cache" })
      .then(res => {
        if (!res.ok) throw new Error(`${res.status} ${res.statusText} al cargar ${src}`);
        return res.text();
      })
      .then(html => {
        el.innerHTML = html;              // o el.outerHTML = html; si quieres reemplazar el <div>
      })
      .catch(err => {
        console.error("Include failed:", url, err);
        el.innerHTML = `<!-- include failed: ${url} -->`;
      });

    fetches.push(p);
  }

  await Promise.all(fetches);
  document.dispatchEvent(new Event("includesLoaded"));
});