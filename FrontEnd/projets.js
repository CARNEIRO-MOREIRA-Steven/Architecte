document.addEventListener('DOMContentLoaded', function() {
    let utilisateurConnecte = localStorage.getItem("token");
    const connectButton = document.getElementById('connectButton');
    const modificationContent = document.getElementById('modificationContent');
  
    // Vérifie si l'utilisateur est connecté et modifie le contenu en conséquence
    if (utilisateurConnecte) {
      connectButton.innerHTML = 'logout'; 
      const modificationButton = document.createElement("p");
      modificationButton.innerHTML = 'Modifier';
      modificationContent.appendChild(modificationButton);
    } else {
      connectButton.innerHTML = 'login';
    }

// Gestionnaire d'événement de clic
connectButton.addEventListener('click', function() {
    if (utilisateurConnecte) {
      // Supprime les données du localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      window.location.href = "index.html";
    } else {
      window.location.href = "connect.html";
    }
});

})

