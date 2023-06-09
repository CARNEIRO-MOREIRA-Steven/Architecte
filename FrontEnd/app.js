const modalContainer = document.querySelector(".modal_container");
const modalTriggers = document.querySelectorAll(".modal_trigger");
modalTriggers.forEach(trigger => {
    trigger.addEventListener("click", toggleModal);
});
const editModal = document.querySelector(".edit_modal");
const modal = document.querySelector(".modal");
modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal));

let utilisateurConnecte = localStorage.getItem("token");

const displayWorksInModal = () => {
    const modalGallery = document.querySelector(".modal_gallery");
    modalGallery.innerHTML = '';

    for (let i = 0; i < listWorks.length; i++) {
        const { id, title, imageUrl, userId } = listWorks[i];
        const cardGallery = document.createElement("figure");
        const imageGallery = document.createElement("img");
        const titleGallery = document.createElement("figcaption");

        cardGallery.appendChild(imageGallery);
        cardGallery.appendChild(titleGallery);

        imageGallery.src = imageUrl;
        titleGallery.innerHTML = "editer";

        modalGallery.appendChild(cardGallery);
    }
};

const buttonNewImage = document.createElement("button");
buttonNewImage.classList = "button_modal";
modal.appendChild(buttonNewImage);
buttonNewImage.innerHTML = "Ajouter une photo";

const textSupprimer = document.createElement("p");
modal.appendChild(textSupprimer);
textSupprimer.innerHTML = "Supprimer la galerie";

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






//          S0phie