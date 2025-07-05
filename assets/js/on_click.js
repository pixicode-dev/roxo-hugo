document.querySelectorAll("#itemClickId").forEach(function(item) {
    item.addEventListener("click", function(event) {
        var target = event.target.closest(".site-project-item");
        var linkElement = target.getElementsByTagName("a")[0]; // Premier lien

        // Redirige l'utilisateur vers une page HTTPS
        window.location.href = linkElement.href;
    });
});


