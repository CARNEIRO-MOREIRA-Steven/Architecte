
const modalContainer = document.querySelector(".modal_container");
const modalTriggers = document.querySelectorAll(".modal_trigger");
modalTriggers.forEach(trigger => {
    trigger.addEventListener("click", toggleModal);
});
const editModal = document.querySelector(".edit_modal");
const modal = document.querySelector(".modal");
modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal));

// Ouverture de la modale
function toggleModal() {
    modalContainer.classList.toggle("active");
    displayWorksInModal();
    // Si class active affiché
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
let imageId;
// Affichage des images dans la modale
const displayWorksInModal = () => {
    const modalGallery = document.querySelector(".modal_gallery");
    modalGallery.innerHTML = ''; // Vider la galerie avant d'afficher les résultats
    // Boucle pour récupérer les images + créer des constantes

      for (let i = 0; i < listWorks.length; i++) {
        const { id, title, imageUrl, userId } = listWorks[i];
        imageId = id; // Initialiser imageId à l'intérieur de la boucle
        const cardGallery = document.createElement("figure");
        const imageGallery = document.createElement("img");
        const titleGallery = document.createElement("figcaption");
        const checkbox = document.createElement("input"); 
        checkbox.type = "checkbox";
        checkbox.name = "select_delete" 
      
        titleModal.innerHTML = "Galerie photo";
        // Parents, enfants
        cardGallery.appendChild(checkbox); 
        cardGallery.appendChild(imageGallery);
        cardGallery.appendChild(titleGallery);
        modalGallery.appendChild(cardGallery);
        modal.appendChild(buttonNewImage);
        modal.appendChild(buttonSupprimer);
        // Contenu constant
        imageGallery.src = imageUrl;
        titleGallery.innerHTML = "editer";
        buttonNewImage.classList = "button_modal";
        buttonNewImage.innerHTML = "Ajouter une photo";
        buttonSupprimer.classList =  "button_supprimer"
        buttonSupprimer.innerHTML = "Supprimer la galerie";
        // Event ajout photo
        buttonNewImage.addEventListener('click', ajusteNewImage) 
        buttonSupprimer.addEventListener('click', supprimerGalerie);
    }
};

function supprimerGalerie() {
  // Effectue une requête DELETE à ton API
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
      // Faire quelque chose après la suppression réussie de la galerie
      const galleryItem = document.getElementById(imageId);
        if (galleryItem) {
          galleryItem.remove();
        }
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

// Formulaire ajout photo
const ajusteNewImage = () => {
    // Titre modale
    titleModal.innerHTML = "Ajout photo";
  
    formElement = document.createElement("form");
    formElement.id = "formulaire_ajust";
    formElement.action = "app.js";
    formElement.method = "post";
  
    const imageNewImageLabel = document.createElement("label");
    imageNewImageLabel.textContent = "Image";
    imageNewImageLabel.setAttribute("for", "new_image");
    formElement.appendChild(imageNewImageLabel);
  
    const imageNewImage = document.createElement("input");
    imageNewImage.type = "file";
    imageNewImage.id = "new_image";
    formElement.appendChild(imageNewImage);
  
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
          console.log('La requête a été effectuée avec succès.');
          return response.json(); // Parse the response body as JSON
        } else {
          console.log('La requête a échoué avec le code de statut: ' + response.status);
          throw new Error('Failed to upload image');
        }
      })
      .then(data => {
        // Extract the image URL from the response data
        const imageUrl = data.imageUrl;
      
        // Create an image element
        const imageElement = document.createElement('img');
        imageElement.src = imageUrl;
      
        // Get the image container
        const imageContainer = document.getElementById('imageContainer');
      
        // Clear the container before appending the new image
        imageContainer.innerHTML = '';
      
        // Append the image element to the container
        imageContainer.appendChild(imageElement);
      })
  };

