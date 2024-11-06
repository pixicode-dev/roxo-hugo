document.getElementById("itemClickId").addEventListener("click", function(event) {
    var target = event.target.closest(".site-project-item");
    console.log(target)
    var linkElement = target.getElementsByTagName("a")[0]; // Premier lien

    console.log(linkElement.href)
    // Redirige l'utilisateur vers une page HTTPS
window.location.href = linkElement.href;

});

