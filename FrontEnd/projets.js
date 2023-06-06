document.addEventListener('DOMContentLoaded', function() {
  let utilisateurConnecte = localStorage.getItem("token");
  const connectButton = document.getElementById('connectButton');
  const modificationContent = document.getElementById('modificationContent');
  const sectionBody = document.querySelector("body");
  // Vérifie si l'utilisateur est connecté et modifie le contenu en conséquence
  if (utilisateurConnecte) {
    connectButton.innerHTML = 'logout'; 
    //Création Div haut de page
    const modificationNav = document.createElement("div");
    sectionBody.insertAdjacentElement('beforebegin', modificationNav);
    modificationNav.classList="navbarUser";
    //Création Bouton
    const publishChangement = document.createElement("button");
    modificationNav.appendChild(publishChangement)
    publishChangement.innerHTML = "publier les changements"
    // Groupe dans mes projets
    const modificationGroup = document.createElement("div");
    const modificationButton = document.createElement("p");
    const modificationIcon = document.createElement("img");
    modificationIcon.src="./assets/icons/pen-to-square-regular.svg";
    modificationButton.innerHTML = 'modifier';
    modificationContent.appendChild(modificationGroup)
    modificationGroup.appendChild(modificationIcon);
    modificationGroup.appendChild(modificationButton);
    modificationGroup.addEventListener('click', function(){
  })
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

