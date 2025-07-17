document.addEventListener("DOMContentLoaded", function () {
    const basePath = window.location.pathname.split("/")[1]; // nombre del repo
    const baseURL = window.location.origin + "/" + basePath + "/";

    document.querySelectorAll('[data-include]').forEach(function (el) {
        const file = el.getAttribute("data-include");
        fetch(baseURL + file)
            .then(response => {
                if (!response.ok) throw new Error("Error al cargar " + file);
                return response.text();
            })
            .then(html => el.innerHTML = html)
            .catch(error => el.innerHTML = "<p style='color:red'>" + error + "</p>");
    });
});

