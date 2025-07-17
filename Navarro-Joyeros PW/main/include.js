document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('[data-include]').forEach(async (el) => {
    const file = el.getAttribute('data-include');
    const response = await fetch(file);
    if (response.ok) {
      const content = await response.text();
      el.innerHTML = content;
    } else {
      el.innerHTML = `<p>Error al cargar ${file}</p>`;
    }
  });
});
