const userId = localStorage.getItem("userId");
const token = localStorage.getItem("token");
let imageId;
// Récupération élements modale
const modalTriggers = document.querySelectorAll(".modal_trigger");
modalTriggers.forEach(trigger => {
  trigger.addEventListener("click", toggleModal);
});
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

// Récupération éléments modale 
const modalContainer = document.querySelector(".modal_container");
const modal = document.querySelector(".modal");
const elementGalery = document.createElement("section");
const titleModal = document.querySelector("h1");
const modalGallery = document.querySelector(".modal_gallery");
const lineDecoration = document.createElement("div");
const buttonNewImage = document.createElement("button");
const buttonSupprimer = document.createElement("button");
const returnModal = document.createElement("img");

// Parents enfants
modal.appendChild(elementGalery);
modal.appendChild(returnModal);
elementGalery.appendChild(titleModal);
returnModal.src = "./assets/icons/Arrow_Back.svg"

// Affichage des images dans la modale
const displayWorksInModal = () => {
    const worksExist = listWorks.filter(work => {// Filtrer les images qui existent toujours
    const galleryItem = document.querySelector(`[data-image-id="${work.id}"]`);
    return galleryItem !== null; // Retourne true si l'élément existe
  });

  titleModal.innerHTML = "Galerie photo";
  modalGallery.innerHTML = '';

  if (modalContainer.classList.contains("active")) {// Vérifier si la modale est active
 worksExist.forEach(work => {// Boucle pour récupérer chaque élément du tableau
       const { id, title, imageUrl, userId } = work;
       const cardGallery = document.createElement("figure");
       const imageGallery = document.createElement("img");
       const titleGallery = document.createElement("figcaption");
       const trashButton = document.createElement("button");
       const trashIcon = document.createElement("img");
       const imageId = id;
        // updateGallery(imageId);
      //Ajout attribue, classe ...
      cardGallery.setAttribute("data-image-id", id);
      cardGallery.id = imageId;
      imageGallery.src = imageUrl;
      titleGallery.innerHTML = "éditer";
      trashButton.classList = "delete_button";
      trashIcon.src = "./assets/icons/Vector.svg"
      trashIcon.id = "delete_icon";
      
      //Parents enfants
      // cardGallery.appendChild(checkbox);
     
      cardGallery.appendChild(trashButton);
      trashButton.appendChild(trashIcon);
      cardGallery.appendChild(imageGallery);
      cardGallery.appendChild(titleGallery);
      modalGallery.appendChild(cardGallery); 
      elementGalery.appendChild(modalGallery);
      elementGalery.appendChild(lineDecoration);
      elementGalery.appendChild(buttonNewImage);
      elementGalery.appendChild(buttonSupprimer);

      //Cacher l'icone de retour
      returnModal.classList = "return_icon_none"
      lineDecoration.classList = "line_decoration";
      buttonNewImage.classList = "button_modal";
      buttonNewImage.innerHTML = "Ajouter une photo";
      buttonSupprimer.classList = "button_supprimer";
      buttonSupprimer.innerHTML = "Supprimer la galerie";
      buttonNewImage.style.display= "block"
      buttonSupprimer.style.display = "block"

      trashButton.addEventListener('click', () => {
        supprimerGalerie(imageId); // Appeler la fonction seulement lorsque le bouton de suppression est cliqué
      });


  function supprimerGalerie() {
  const imageToDelete = document.querySelector(`[data-image-id="${imageId}"]`);
  fetch(`http://localhost:5678/api/works/${imageId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  })
    .then(response => {
      console.log(response)
      if (response.ok) {
        // Mettre à jour la galerie
          imageToDelete.remove(cardGallery);
          updateGallery(imageId);
          alert ('La galerie a été supprimée avec succès.')
      } else {
        console.log('La suppression de la galerie a échoué avec le code de statut: ' + response.status);
        // Faire quelque chose en cas d'échec de la suppression de la galerie
      }
    })
    .catch(error => {
      console.error('Une erreur s\'est produite lors de la suppression de la galerie:', error);
      // Faire quelque chose en cas d'erreur lors de la suppression de la galerie
    });
}
    })
  }
  // Ajouter les écouteurs d'événements aux boutons
  buttonNewImage.addEventListener('click', ajusteNewImage);
};


function updateGallery(imageId) {
  // Supprimer l'image de la galerie sur la page d'accueil
  const galleryItem = document.querySelector(`[data-image-id="${imageId}"]`);
  if (galleryItem) {
    galleryItem.remove();
  }
}

// Formulaire ajout photo
const ajusteNewImage = () => {
  // Titre modale
  returnModal.addEventListener('click', displayWorksInModal)
  titleModal.innerHTML = "Ajout photo";
  returnModal.classList = "return_icon";

  formElement = document.createElement("form");
  formElement.id = "formulaire_ajust";
  formElement.action = "app.js";
  formElement.method = "post";

  const elementAddImage = document.createElement("div");
  elementAddImage.classList = "element_add_image";
  formElement.appendChild(elementAddImage);

  const logoImage = "./assets/icons/logo-image.svg"
  const elementAddImageIcon = document.createElement("img");
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

  for (let i = 1; i < listCategories.length; i++) {
    const { id, name } = listCategories[i];
    const option = document.createElement("option");
    option.text = name;
    option.value = id; // Set the value to the category ID
    categoryNewImage.appendChild(option);
  }

  buttonNewImage.style.display= "none"
  buttonSupprimer.style.display = "none"
  buttonSend.type = "submit";
  buttonSend.id = "button_send";
  buttonSend.classList = "button_modal";
  buttonSend.innerHTML = "Valider";
  modalGallery.innerHTML = "";

  formElement.appendChild(lineDecoration);
  formElement.appendChild(buttonSend);
  modalGallery.appendChild(formElement);
  buttonSend.addEventListener('click', envoyerFormulaire);
};

const buttonSend = document.createElement("button");

const envoyerFormulaire = (event) => {
  event.preventDefault();
  const formElement = document.getElementById("formulaire_ajust");
  const imageFile = formElement.elements.new_image?.files?.[0];
  const titre = formElement.elements.title_new_image?.value;
  const category = parseInt(formElement.elements.select_category?.value);
  buttonSend.id = ""
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
  const imageId = id;
  const checkbox = document.createElement("input");
  cardGallery.id = imageId;
  cardGallery.setAttribute("data-image-id", id);
  const imageGallery = document.createElement("img");
  const titleGallery = document.createElement("figcaption");
  checkbox.type = "checkbox";
  checkbox.name = "select_delete";
  checkbox.classList = "select_delete";

  // Remplir les éléments avec les données de la nouvelle photo
  imageGallery.src = imageUrl;
  titleGallery.innerHTML = "éditer";

  const elementAddImage = document.getElementById("logo_formulaire_image");
  const boutonAjustNone = document.querySelector(".ajust_image");

  boutonAjustNone.classList = "bouton_ajust_none";
  elementAddImage.id = "display_image_form";
  elementAddImage.src = imageUrl;

  listWorks.push(photoData);

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
