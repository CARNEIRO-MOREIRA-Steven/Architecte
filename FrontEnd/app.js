const modalContainer = document.querySelector(".modal_container");
const modalTriggers = document.querySelectorAll(".modal_trigger");
modalTriggers.forEach(trigger => {
  trigger.addEventListener("click", toggleModal);
});
const editModal = document.querySelector(".edit_modal");
const modal = document.querySelector(".modal");
const elementGalery = document.createElement("section");
modal.appendChild(elementGalery);
const modalGallery = document.querySelector(".modal_gallery");



// Ouverture de la modale
function toggleModal() {
  modalContainer.classList.toggle("active");
  displayWorksInModal();
  // Si class active affichée
  if (modalContainer.classList.contains("active")) {
    buttonNewImage.style.display = "block";
    buttonSupprimer.style.display = "block";
  } else { // Sinon enlever
    buttonNewImage.style.display = "none";
    buttonSupprimer.style.display = "none";
  }
}

const userId = localStorage.getItem("userId");
const token = localStorage.getItem("token");
const titleModal = document.querySelector("h1");
const buttonNewImage = document.createElement("button");
const buttonSupprimer = document.createElement("button");
elementGalery.appendChild(titleModal);

let imageId;

// Affichage des images dans la modale
const displayWorksInModal = () => {
  if (modalContainer.classList.contains("active")) { // Vérifier si la modale est active
    modalGallery.innerHTML = ''; // Vider la galerie avant d'afficher les résultats
    // Boucle pour récupérer les images + créer des constantes
    for (let i = 0; i < listWorks.length; i++) {
      const { id, title, imageUrl, userId } = listWorks[i];
      if (isImageDeleted(id)) {
        continue;
      }
      const cardGallery = document.createElement("figure");
      cardGallery.setAttribute("data-image-id", id);
      const imageId = id;
      const checkbox = document.createElement("input");
      cardGallery.id = imageId;
      const imageGallery = document.createElement("img");
      const titleGallery = document.createElement("figcaption");
      checkbox.type = "checkbox";
      checkbox.name = "select_delete";
      checkbox.classList = "select_delete";
      titleModal.innerHTML = "Galerie photo";

      cardGallery.appendChild(checkbox);
      cardGallery.appendChild(imageGallery);
      cardGallery.appendChild(titleGallery);

      imageGallery.src = imageUrl;
      titleGallery.innerHTML = "editer";

      modalGallery.appendChild(cardGallery);
    }
  }

  elementGalery.appendChild(modalGallery);

  // Ajouter les boutons à la modale
  buttonNewImage.classList = "button_modal";
  buttonNewImage.innerHTML = "Ajouter une photo";
  buttonSupprimer.classList = "button_supprimer";
  buttonSupprimer.innerHTML = "Supprimer la galerie";
  elementGalery.appendChild(buttonNewImage);
  elementGalery.appendChild(buttonSupprimer);

  // Ajouter les écouteurs d'événements aux boutons
  buttonNewImage.addEventListener('click', ajusteNewImage);
  buttonSupprimer.addEventListener('click', supprimerGalerie);
};

// Tableau pour stocker les ID des images supprimées
const deletedImageIds = [];

// Fonction pour vérifier si une image a été supprimée
function isImageDeleted(imageId) {
  return deletedImageIds.includes(imageId);
}

function supprimerGalerie() {
  const checkboxs = document.querySelectorAll('.select_delete:checked');

  checkboxs.forEach(checkbox => {
    const imageId = checkbox.parentElement.getAttribute("data-image-id"); // Récupérer l'ID de l'image à partir de l'attribut data-image-id

    // Effectue une requête DELETE à votre API
    fetch(`http://localhost:5678/api/works/${imageId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
    .then(response => {
      if (response.ok) {
        console.log('La galerie a été supprimée avec succès.');

        deletedImageIds.push(imageId)
        // Supprimer l'image de la galerie sur la page d'accueil
        const galleryItem = document.querySelector(`[data-image-id="${imageId}"]`);
        if (galleryItem) {
          galleryItem.remove();
        }

        // Mettre à jour la galerie dans la modale sans recharger la page
        const imageToDelete = modalGallery.querySelector(`[data-image-id="${imageId}"]`);
        if (imageToDelete) {
          imageToDelete.remove();
        }

        // Mettre à jour la galerie sur la page d'accueil
        updateHomepageGallery(imageId);

      } else {
        console.log('La suppression de la galerie a échoué avec le code de statut: ' + response.status);
        // Faire quelque chose en cas d'échec de la suppression de la galerie
      }
    })
    .catch(error => {
      console.error('Une erreur s\'est produite lors de la suppression de la galerie:', error);
      // Faire quelque chose en cas d'erreur lors de la suppression de la galerie
    });
  });
}

function updateHomepageGallery(imageId) {
  // Supprimer l'image de la galerie sur la page d'accueil
  const galleryItem = document.querySelector(`[data-image-id="${imageId}"]`);
  if (galleryItem) {
    galleryItem.remove();
  }
}


  
// Formulaire ajout photo
const ajusteNewImage = () => {
  // Titre modale
  titleModal.innerHTML = "Ajout photo";

  formElement = document.createElement("form");
  formElement.id = "formulaire_ajust";
  formElement.action = "app.js";
  formElement.method = "post";

  const elementAddImage = document.createElement("div");
  elementAddImage.classList = "element_add_image";
  formElement.appendChild(elementAddImage);

  const logoImage = "./assets/icons/logo-image.svg"
  const elementAddImageIcon = document.createElement ("img");
  elementAddImageIcon.src = logoImage;
  elementAddImageIcon.id = "logo_formulaire_image"
  elementAddImage.appendChild(elementAddImageIcon)


  const imageNewImageLabel = document.createElement("label");
  imageNewImageLabel.classList = "ajust_image"
  imageNewImageLabel.setAttribute("for", "new_image");
  imageNewImageLabel.innerHTML = "+ Ajouter photo"
  elementAddImage.appendChild(imageNewImageLabel);

  const imageNewImage = document.createElement("input");
  imageNewImage.type = "file";
  imageNewImage.id = "new_image";
  elementAddImage.appendChild(imageNewImage);

  const detailsAddImage = document.createElement("p");
  detailsAddImage.innerHTML = "jpg, png : 4mo max";
  elementAddImage.appendChild(detailsAddImage);

  const titleNewImageLabel = document.createElement("label");
  titleNewImageLabel.textContent = "Titre";
  titleNewImageLabel.setAttribute("for", "title_new_image");
  formElement.appendChild(titleNewImageLabel);

  const titleNewImage = document.createElement("input");
  titleNewImage.type = "text";
  titleNewImage.id = "title_new_image";
  formElement.appendChild(titleNewImage);

  const categoryNewImageLabel = document.createElement("label");
  categoryNewImageLabel.textContent = "Catégorie";
  categoryNewImageLabel.setAttribute("for", "select_category");
  formElement.appendChild(categoryNewImageLabel);

  const categoryNewImage = document.createElement("select");
  categoryNewImage.id = "select_category";
  formElement.appendChild(categoryNewImage);

  for (let i = 0; i < listCategories.length; i++) {
    const { id, name } = listCategories[i];
    const option = document.createElement("option");
    option.text = name;
    option.value = id; // Set the value to the category ID
    categoryNewImage.appendChild(option);
  }

  const buttonSend = document.createElement("input");
  buttonSend.type = "submit";
  buttonSend.id = "button_send";
  buttonSend.classList = "button_modal";
  buttonSend.innerHTML = "Valider";
  formElement.appendChild(buttonSend);

  editModal.innerHTML = "";
  buttonSupprimer.innerHTML = "";
  buttonNewImage.classList = "button_none";
  buttonNewImage.innerHTML = "Valider";
  editModal.appendChild(formElement);

  buttonSend.addEventListener('click', envoyerFormulaire);
};

const envoyerFormulaire = (event) => {
  event.preventDefault();
  const formElement = document.getElementById("formulaire_ajust");
  const imageFile = formElement.elements.new_image?.files?.[0];
  const titre = formElement.elements.title_new_image?.value;
  const category = parseInt(formElement.elements.select_category?.value); // Convert to an integer

  const formData = new FormData();
  formData.append('image', imageFile);
  formData.append('title', titre);
  formData.append('category', category);

  for (const value of formData.entries()) {
    console.log(value[0], value[1]);
  }

  fetch('http://localhost:5678/api/works', {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
    .then(response => {
      if (response.ok) {
        alert('Nouvelle photo ajoutée avec succès.');
        return response.json();
      } else {
        console.log('La requête a échoué avec le code de statut: ' + response.status);
        throw new Error('Failed to upload image');
      }
    })
    .then(data => {
      // Appeler la fonction pour ajouter la nouvelle photo à la galerie sans recharger la page
      ajouterNouvellePhoto(data);
    })
    .catch(error => {
      console.error('Une erreur s\'est produite lors de l\'ajout de la photo:', error);
      // Faire quelque chose en cas d'erreur lors de l'ajout de la photo
    });
};

const ajouterNouvellePhoto = (photoData) => {
  const { id, title, imageUrl, userId } = photoData;
  // Créer les éléments HTML de la nouvelle photo
  const cardGallery = document.createElement("figure");
  cardGallery.setAttribute("data-image-id", id);
  const imageId = id;
  const checkbox = document.createElement("input");
  cardGallery.id = imageId;
  const imageGallery = document.createElement("img");
  const titleGallery = document.createElement("figcaption");
  checkbox.type = "checkbox";
  checkbox.name = "select_delete";
  checkbox.classList = "select_delete";

  // Remplir les éléments avec les données de la nouvelle photo
  imageGallery.src = imageUrl;
  titleGallery.innerHTML = "editer";

const modalGallery = document.querySelector(".modal_gallery");
  cardGallery.appendChild(checkbox);
  cardGallery.appendChild(imageGallery);
  cardGallery.appendChild(titleGallery);
  modalGallery.appendChild(cardGallery);

  // Ajouter les éléments à la galerie sur la page d'accueil
  const gallery = document.querySelector(".gallery");
  const cardHomepage = document.createElement("figure");
  cardHomepage.setAttribute("data-image-id", id);
  cardHomepage.id = imageId;
  const imageHomepage = document.createElement("img");
  const titleHomepage = document.createElement("figcaption");
  imageHomepage.src = imageUrl;
  titleHomepage.innerHTML = title;
  cardHomepage.appendChild(imageHomepage);
  cardHomepage.appendChild(titleHomepage);
  gallery.appendChild(cardHomepage);
};
