// Déclare la fonction toggleModal en dehors de la fonction DOMContentLoaded
function toggleModal() {
    modalContainer.classList.toggle("active");
    displayWorksInModal();

    if (modalContainer.classList.contains("active")) {
        buttonNewImage.style.display = "block";
        textSupprimer.style.display = "block";
    } else {
        buttonNewImage.style.display = "none";
        textSupprimer.style.display = "none";
    }
}

document.addEventListener('DOMContentLoaded', function () {
  let utilisateurConnecte = localStorage.getItem("token");
  const connectButton = document.getElementById('connectButton');
  const modificationContent = document.getElementById('modificationContent');
  const sectionBody = document.querySelector("body");
  const logoModifierBlack = "./assets/icons/edit-regular-black.svg";
  const logoModifierWhite = "./assets/icons/edit-regular-white.svg";

  // Vérifie si l'utilisateur est connecté et modifie le contenu en conséquence
  if (utilisateurConnecte) {
    // Changer le bouton en logout
    connectButton.innerHTML = 'logout';

    // Fonction pour ouvrir la modale
    const boutonOpenModale = () => {
      const modificationNav = document.createElement("div");
      sectionBody.insertAdjacentElement('beforebegin', modificationNav);
      modificationNav.classList = "navbar_user";

      // Création élément NavBar
      const groupeModifier = document.createElement("div");
      groupeModifier.classList = "modal_trigger"
      const iconModifierWhite = document.createElement("img");
      const textModifier = document.createElement("p");
      const publishChangement = document.createElement("button");

      // Dossier Parent NavBar
      modificationNav.appendChild(groupeModifier);
      groupeModifier.appendChild(iconModifierWhite);
      groupeModifier.appendChild(textModifier);

      // Contenu Navbar
      iconModifierWhite.src = logoModifierWhite;
      textModifier.innerHTML = "modifier";
      modificationNav.appendChild(publishChangement)
      publishChangement.innerHTML = "publier les changements"

      // Création élément Mes Projets
      const groupeModifierProjet = document.querySelector(".open_modal")
      const iconModifierBlack = document.createElement("img")
      const textModifierBlack = document.createElement("p");

      // Dossier Parents Projets
      modificationContent.appendChild(groupeModifierProjet);
      groupeModifierProjet.appendChild(iconModifierBlack)
      groupeModifierProjet.appendChild(textModifierBlack)

      // Contenu Projets
      iconModifierBlack.src = logoModifierBlack;
      textModifierBlack.innerHTML = "modifier"

      // Event Button Modifier
      groupeModifier.addEventListener('click', toggleModal);
      groupeModifierProjet.addEventListener('click', toggleModal);
    }

    boutonOpenModale();
  } else {
    // Sinon, afficher le bouton de connexion
    connectButton.innerHTML = 'login';
  }

  // Event Button Login/Logout
  connectButton.addEventListener('click', function () {
    if (utilisateurConnecte) {
      // Supprime les données du localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      window.location.href = "index.html";
    } else {
      window.location.href = "connect.html";
    }
  });
});